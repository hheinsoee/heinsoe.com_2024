const myLink = {
  blog: (slug = null) => `/blog${slug ? `/${slug}` : ""}`,
  project: (slug = null) => `/project${slug ? `/${slug}` : ""}`,
  repo: (slug = null) => `/github${slug ? `/${slug}` : ""}`,
};
export default myLink;
