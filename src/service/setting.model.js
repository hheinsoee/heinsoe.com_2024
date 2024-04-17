import { safeSql } from "../../helper/connectSQL";

export function UPDATE_SETTING(table, data, cb) {
  var q = `UPDATE setting SET ${uData} WHERE id = ?`;
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
