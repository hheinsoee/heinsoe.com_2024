const myLink = {
  blog: (slug = null) => `/blog${slug ? `/${slug}` : ""}`,
};
export default myLink;
