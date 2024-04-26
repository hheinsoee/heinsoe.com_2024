export const adminLink = {
  home: `/admin`,
  type: (type_id) => `/admin${type_id ? `/${type_id}` : ""}`,
};
