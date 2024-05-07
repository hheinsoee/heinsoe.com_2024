export const adminLink = {
  home: `/admin`,
  content: (type_id) => `/admin/content${type_id ? `/${type_id}` : ""}`,
  setup: (what) => `/admin/setup/${what ? `/${what}` : ""}`,
};
