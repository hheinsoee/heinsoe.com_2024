export const adminLink = {
  home: () => "/admin/",
  experience: (id?: string | number) =>
    `/admin/experience${id ? `/${id}` : ""}`,
  project: (id?: string | number) => `/admin/project${id ? `/${id}` : ""}`,
  blog: () => "/admin/blog",
  api: {
    upload: () => `/api/upload`,
  },
  signin: () => `/signin`,
  user: (slug?: string) => `/admin/user/${slug}`,
};
