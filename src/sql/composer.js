/**
 * @param {Object} _ref
 * @param {String} _ref.table
 * @param {Object} _ref.where
 * @param {Number} _ref.page
 * @param {Number} _ref.limit
 * @returns {Object}
 */
export function SELECT({ table, where = {}, offset = 0, limit = 0 }) {
  var filter_ = [];
  if (Object.keys(where).length > 0) {
    Object.keys(where).map((key) => {
      return filter_.push(`${key} = '${where[key]}'`);
    });
  }
  var filter__ = filter_.length > 0 ? `WHERE ${filter_.join(" AND ")}` : "";
  const limit_ = `LIMIT ${limit} OFFSET ${offset}`;
  var sql = `SELECT * FROM ${table} ${filter__} ${limit > 0 ? limit_ : ""}`;
  return { query: sql, data: {} };
}
/**
 * @param {Object} _ref
 * @param {String} _ref.table
 * @param {Object} _ref.data
 * @returns {Object}
 */
export function INSERT({ table, data }) {
  if (Array.isArray(data)) {
    const placeholders = Array(data[0] ? Object.keys(data[0]).length : 0)
      .fill("?")
      .join(", ");
    const columns = Array.from(new Set(data.flatMap(Object.keys)));
    const values = data.map(() => `(${placeholders})`).join(", ");
    const flatValues = data.flatMap((a) => Object.values(a));
    const q = `INSERT INTO ${table} (${columns}) VALUES ${values}`;
    return { query: q, data: flatValues };
  } else {
    var q = `INSERT INTO ${table} SET ?`;
    return { query: q, data: data };
  }
}
/**
 * @param {Object} _ref
 * @param {String} _ref.table
 * @param {Object} _ref.data
 * @returns {Object}
 */
export function UPDATE({ table, data }) {
  var dArr = [];
  var dataArr = [];
  for (let key in data) {
    if (key !== "id") {
      dArr.push(`${key} = ?`);
      dataArr.push(`${data[key]}`);
    }
  }
  dataArr.push(data.id);
  var uData = dArr.join(", ");
  var q = `UPDATE ${table} SET ${uData} WHERE id = ?`;
  return { query: q, data: dataArr };
}
/**
 * @param {Object} _ref
 * @param {String} _ref.table
 * @param {Object} _ref.where
 * @returns {Object}
 */
export function DELETE({ table, where }) {
  if (where) {
    var sqlWhere = Object.keys(where).map((k) => {
      return `${k} = ?`;
    });
    var q = `DELETE FROM ${table} WHERE ${sqlWhere.join(" AND ")}`;
    const values = Object.values(where);
    return { query: q, data: values };
  } else {
    var q = `DELETE FROM ${table}`;
    return { query: q, data: null };
  }
}
