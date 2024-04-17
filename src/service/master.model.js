import { safeSql } from "../../helper/connectSQL";

export function SELECT(table, filter, cb) {
    var filter_ = []
    if (Object.keys(filter).length > 0) {
        Object.keys(filter).map(key => {
            return filter_.push(`${key} = '${filter[key]}'`)
        })
    }
    var filter__ = filter_.length > 0 ? `WHERE ${filter_.join(' AND ')}` : ''
    var sql = `SELECT * FROM ${table} ${filter__} ORDER BY id DESC `
    console.log({ sql })
    safeSql(sql,
        [], function (err, result) {
            if (err) {
                cb({
                    code: 500,
                    message: err,
                });
            } else if (result.length == 0) {
                cb({
                    code: 404,
                    message: "no content",
                });
            } else {
                cb(null, result);
            }
        }
    );
}

export function SELECT_BY_ID(table, id, cb) {
    safeSql(
        `
    SELECT *
    FROM ${table}
    WHERE id = ?
    `, [id],
        function (err, result) {
            if (err) {
                cb({
                    code: 500,
                    message: "server err",
                });
            } else if (result.length == 0) {
                cb({
                    code: 404,
                    message: "no found",
                });
            } else {
                cb(null, result[0]);
            }
        }
    );
}

export function INSERT(table, data, cb) {
    if (Array.isArray(data)) {
        const placeholders = Array(data[0] ? Object.keys(data[0]).length : 0)
            .fill("?")
            .join(", ");
        const columns = Array.from(new Set(data.flatMap(Object.keys)));
        const values = data.map(() => `(${placeholders})`).join(", ");
        const flatValues = data.flatMap((a) => Object.values(a));
        const q = `INSERT INTO ${table} (${columns}) VALUES ${values}`;
        console.log({ data })
        console.log({ q });
        console.log({ placeholders });
        console.log({ values });
        console.log({ flatValues });
        safeSql(q, flatValues, function (err, result) {
            cb(err, result);
        });
    } else {
        var q = `INSERT INTO ${table} SET ?`;
        safeSql(q, data, function (err, result) {
            if (err) {
                cb(err);
                console.log(q);
                console.log(err);
            } else {
                cb(err, result);
            }
        });
    }
    // console.log(query.sql);
}
export function UPDATE(table, data, cb) {
    var dArr = [];
    var dataArr = [];
    for (let key in data) {
        if (key !== "id") {
            dArr.push(`${key} = ?`);
            dataArr.push(`${data[key]}`);
        }
    }
    dataArr.push(data.id)
    var uData = dArr.join(", ");
    var q = `UPDATE ${table} SET ${uData} WHERE id = ?`;
    safeSql(q, dataArr, function (err, result) {
        if (err) {
            cb({
                code: 500,
                message: err,
            });
        } else {
            SELECT_BY_ID(table, data.id, (err, result) => {
                cb(err, result);
            });
        }
    });
}

export function DELETE_(table, id, cb) {
    var q = `DELETE FROM ${table} WHERE id = ?`;
    // console.log(q)
    safeSql(q, id, function (err, result) {

        if (err) {
            cb({
                code: 500,
                message: err.errno == 1451 ? `cannot change ${id} of  ${table}` : err,
            });
        } else {
            cb(err, true);
        }
    });
}
export function DELETE_WHERE(table, where, cb) {
    if (where) {
      var sqlWhere = Object.keys(where).map((k) => {
        return `${k} = ?`;
      });
      var q = `DELETE FROM ${table} WHERE ${sqlWhere.join(" AND ")}`;
      const values = Object.values(where);
      safeSql(q, values, function (err, result) {
        if (err) {
          console.log({err})
          cb({
            code: 500,
            message:
              err.errno == 1451
                ? `cannot change ${values.join(", ")} of ${table}`
                : err,
          });
        } else {
          cb(err, true);
        }
      });
    } else {
      cb({ code: 400, message: "bad request" });
    }
  }