const myLink = {
  blog: (slug = null) => `/blog${slug ? `/${slug}` : ""}`,
  project: (slug = null) => `/project${slug ? `/${slug}` : ""}`,
};
export default myLink;
