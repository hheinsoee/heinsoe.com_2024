// SELECT c.*, GROUP_CONCAT(cl.language_id) as language_ids FROM content as c LEFT JOIN content_language as cl ON cl.content_id = c.id GROUP BY c.id

import { makeUp, mergeArray } from "@/utility/makeup";
import { safeSql } from "../../helper/connectSQL";
import { schema } from "./schema";
import { DELETE_WHERE, INSERT } from "./master.model";

export const SELECT_CONTENT = (query, cb) => {
  var theSQL = `
  SELECT 
  c.*, 
  f.name as field_name,
  f.value as field_value,
  (SELECT GROUP_CONCAT(map_category_content.category_id) FROM map_category_content WHERE map_category_content.content_id = c.id) AS category_ids
  FROM content as c
  LEFT JOIN fields as f ON f.content_id = c.id
  `;
  var where = "WHERE 1=1 ";
  const page = query.page || 1;
  const limit = query.limit || 10;
  const offset = (page - 1) * limit;
  if (query?.type) {
    where = where + `AND c.type = '${query.type}'`;
  }
  if (query?.id) {
    where = where + `AND c.id = '${query.id}'`;
  }
  var sql = `${theSQL} ${where} ORDER BY c.id DESC LIMIT ${limit} OFFSET ${offset} `;
  console.log(sql);
  safeSql(sql, [], function (err, result) {
    if (err) {
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
      result = mergeArray(
        result,
        "fields",
        ["field_name", "field_value"],
        "id"
      );

      var r = result.map((r) => {
        return {
          ...r,
          category_ids: r.category_ids
            ? r.category_ids.includes(",")
              ? r.category_ids.split(",").map(Number)
              : [Number(r.category_ids)]
            : null,
          fields: toObject({
            theArray: r.fields,
            key: "field_name",
            value: "field_value",
          }),
        };
      });
      cb(null, query?.id ? r[0] : r);
    }
  });
};

function toObject({ theArray, key, value }) {
  const transformedObject = theArray.reduce((result, item) => {
    result[item[key]] = isNaN(item[value])
      ? item[value]
      : parseInt(item[value]);
    return result;
  }, {});
  return transformedObject;
}

export const CREATE_CONTENT = (body, cb) => {
  var content = makeUp(body, schema.content.create);
  INSERT("content", content, function (err, result) {
    if (err) {
      cb({
        code: 500,
        message: err,
      });
    } else {
      if (body.category_ids && body.category_ids.length > 0) {
        const categories = body.category_ids.map((cat_id) => {
          return {
            category_id: cat_id,
            content_id: result.insertId,
          };
        });
        INSERT("map_category_content", categories, function (err, result) {
          if (err) {
            cb({
              code: 500,
              message: err,
            });
          }
        });
      }
      if (body.fields) {
        var field_body = Object.entries(body.fields).map(([key, value]) => {
          return {
            name: key,
            value: value,
            content_id: result.insertId,
          };
        });
        INSERT("fields", field_body, function (err, result) {
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

export const DELETE_ = (id, cb) => {
  var sql = `DELETE FROM content WHERE id = ?`;
  safeSql(sql, id, function (err, result) {
    if (err) {
      cb({
        code: 500,
        message:
          err.errno == 1451
            ? `cannot delete Id ${id} of  language because joining other table`
            : err,
      });
    } else {
      cb(err, true);
    }
  });
};

export const UPDATE = (body, cb) => {
  const content = makeUp(body, schema.content.update);
  const dArr = [];
  const dataArr = [];
  for (let key in content) {
    dArr.push(`${key} = ?`);
    dataArr.push(`${content[key]}`);
  }

  dataArr.push(content.id);
  var uData = dArr.join(", ");
  var q = `UPDATE content SET ${uData} WHERE id = ?`;
  safeSql(q, dataArr, async function (err, result) {
    if (err) {
      cb({
        code: 500,
        message: err,
      });
    } else {
      try {
        await new Promise((resolve, reject) => {
          DELETE_WHERE("fields", { content_id: content.id }, (err, res) => {
            if (err) {
              console.log("not detele old field");
              reject({
                code: 500,
                message: err,
              });
            } else {
              if (body.fields) {
                var f = Object.entries(body.fields);
                if (f.length > 0) {
                  var field_body = f.map(([key, value]) => {
                    return {
                      name: key,
                      value: value,
                      content_id: body.id,
                    };
                  });
                  INSERT("fields", field_body, function (err, result) {
                    resolve();
                  });
                } else {
                  resolve();
                }
              } else {
                console.log("no field", body);
                resolve();
              }
            }
          });
        });
        await new Promise((resolve, reject) => {
          DELETE_WHERE(
            "map_category_content",
            { content_id: content.id },
            (err, res) => {
              if (err) {
                console.log("not detele old map_category_content");
                reject({
                  code: 500,
                  message: err,
                });
              } else {
                if (body.category_ids && body.category_ids.length > 0) {
                  const categories = body.category_ids.map((cat_id) => {
                    return {
                      category_id: cat_id,
                      content_id: content.id,
                    };
                  });
                  INSERT(
                    "map_category_content",
                    categories,
                    function (err, result) {
                      resolve();
                    }
                  );
                } else {
                  console.log("no field", body);
                  resolve();
                }
              }
            }
          );
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
