const { SCHEMA } = require("../constants/schema");
const { safeSql } = require("../helper/connectSQL");
const { logger } = require("../log/logger");
const { makeUp } = require("../utils/makeup");
const { INSERT, SELECT, UPDATE, DELETE_WHERE } = require("./master.model");

const SELECT_CONTENT = (query, cb) => {
  var page = query.page || 1;
  var limit = 7;
  var offset = limit * (page - 1);
  var theSQL = `
  SELECT
  c.*,
  f.name as field_name,
  f.value as field_value,
  t.name as type,
  tp.id as topic_id,
  tp.name as topic_name,
  mv.vote_count
  ${
    query.user_id
      ? `,CASE WHEN v.user_id IS NOT NULL THEN true ELSE false END AS amIVote`
      : ""
  }
FROM ls_content as c
LEFT JOIN ls_type as t ON t.id = c.type_id
LEFT JOIN map_field as f ON f.content_id = c.id
LEFT JOIN map_topic as mtp ON mtp.content_id = c.id
LEFT JOIN ls_topic as tp ON tp.id = mtp.topic_id
LEFT JOIN (
  SELECT content_id, COUNT(user_id) as vote_count
  FROM map_vote
  GROUP BY content_id
) as mv ON c.id = mv.content_id
${
  query.user_id
    ? `LEFT JOIN map_vote as v ON c.id = v.content_id AND v.user_id = ${query.user_id}`
    : ""
}
  `;
  var where = "WHERE 1=1 AND (isDraft = 0 OR isDraft IS NULL)";
  if (query?.type) {
    where = where + ` AND t.name = '${query.type}'`;
  }
  if (query?.id) {
    where = where + ` AND c.id = '${query.id} '`;
  }
  var sql = `${theSQL} ${where} ORDER BY c.id DESC LIMIT ${limit} OFFSET ${offset}`;

  console.log(sql, { query });
  safeSql(sql, [], function (err, result) {
    if (err) {
      console.log(sql, { query });
      cb({
        code: 500,
        message: err,
      });
    } else if (result.length == 0) {
      cb({
        code: 404,
        message: "Not Found",
      });
    } else {
      var r = toObject(result);
      cb(null, query?.id ? r[0] : r);
    }
  });
};

function toObject(inputArray) {
  const resultArray = inputArray.reduce((acc, obj) => {
    const existingItem = acc.find((item) => item.id === obj.id);
    if (existingItem) {
      existingItem.fields[obj.field_name] = obj.field_value;
      if (
        obj.topic_id &&
        !existingItem.topics.some((topic) => topic.id === obj.topic_id)
      ) {
        existingItem.topics.push({ id: obj.topic_id, name: obj.topic_name });
      }
    } else {
      acc.push({
        ...obj,
        field_name: undefined,
        field_value: undefined,
        topic_id: undefined,
        fields: {
          [obj.field_name]: obj.field_value,
        },
        topics: obj.topic_id
          ? [{ id: obj.topic_id, name: obj.topic_name }]
          : [], // Initialize topic_id array
      });
    }

    return acc;
  }, []);

  return resultArray;
}
const INSERT_CONTENT = (body, cb) => {
  var content = makeUp(body, SCHEMA.CREATE.CONTENT);
  INSERT("ls_content", content, function (err, result) {
    if (err) {
      cb({
        code: 500,
        message: err,
      });
    } else {
      if (body.fields) {
        SELECT("ls_field", { type_id: body.type_id }, (err, res) => {
          if (!err) {
            const field_ls = res.map((r) => r.name);
            var theFields = makeUp(body.fields, field_ls);
            var field_body = Object.entries(theFields).map(([key, value]) => {
              return {
                name: key,
                value: value,
                content_id: result.insertId,
              };
            });
            INSERT("map_field", field_body, function (err, result) {
              if (err) {
                cb({
                  code: 500,
                  message: err,
                });
              }
            });
          }
        });
      }
      if (body?.topic_ids?.length > 0) {
        console.log();
        var topic_ids = body.topic_ids.map((t) => {
          return {
            topic_id: t,
            content_id: result.insertId,
          };
        });
        INSERT("map_topic", topic_ids, function (err, result) {
          if (err) {
            cb({
              code: 500,
              message: err,
            });
          }
        });
      }
      SELECT_CONTENT({ id: result.insertId }, (err, result) => {
        cb(err, result);
      });
    }
  });
};
const UPDATE_CONTENT = (body, cb) => {
  var content = makeUp(body, SCHEMA.UPDATE.CONTENT);
  console.log(content);
  UPDATE("ls_content", content, async function (err, result) {
    if (err) {
      cb({
        code: 500,
        message: err,
      });
    } else {
      try {
        await new Promise((resolve, reject) => {
          if (body.fields && Object.keys(body.fields).length > 0) {
            ///DELETE old field
            DELETE_WHERE(
              "map_field",
              { content_id: body.id },
              (deletingErr, deletigSuccess) => {
                if (deletigSuccess) {
                  SELECT("ls_field", { type_id: body.type_id }, (err, res) => {
                    if (!err && res.length > 0) {
                      const field_ls = res.map((r) => r.name);
                      var theFields = makeUp(body.fields, field_ls);
                      if (Object.keys(theFields).length > 0) {
                        var field_body = Object.entries(theFields).map(
                          ([key, value]) => {
                            return {
                              name: key,
                              value: value,
                              content_id: body.id,
                            };
                          }
                        );
                        INSERT("map_field", field_body, function (err, result) {
                          if (err) {
                            reject(err);
                          } else {
                            resolve(result);
                          }
                        });
                      }
                    } else {
                      resolve();
                    }
                  });
                } else {
                  resolve();
                }
              }
            );
          } else {
            resolve();
          }
        });

        await new Promise((resolve, reject) => {
          if (body?.topic_ids?.length > 0) {
            DELETE_WHERE(
              "map_topic",
              { content_id: body.id },
              (deletingErr, deletigSuccess) => {
                if (deletigSuccess) {
                  var topic_ids = body.topic_ids.map((t) => {
                    return {
                      topic_id: t,
                      content_id: body.id,
                    };
                  });
                  INSERT("map_topic", topic_ids, function (err, result) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  });
                } else {
                  resolve();
                }
              }
            );
          } else {
            resolve();
          }
        });
        SELECT_CONTENT({ id: body.id }, (err, result) => {
          cb(err, result);
        });
      } catch (err) {
        cb(err);
      }
    }
  });
};
module.exports = {
  SELECT_CONTENT,
  UPDATE_CONTENT,
  INSERT_CONTENT,
};
