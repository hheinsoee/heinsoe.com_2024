export const adminLink = {
  home: (any?: string) => `/admin/${any || ""}`,
  experience: (id?: string | number) =>
    `/admin/experience${id ? `/${id}` : ""}`,
  project: (id?: string | number) => `/admin/project${id ? `/${id}` : ""}`,
  note: () => "/admin/note",
  tag: () => "/admin/tag",
  tech: () => "/admin/tech",
  api: {
    upload: () => `/api/upload`,
  },
  signin: () => `/signin`,
  user: (slug?: string) => `/admin/user/${slug}`,
};
