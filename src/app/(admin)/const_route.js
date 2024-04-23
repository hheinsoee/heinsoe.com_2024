const adminLink = {
  home: `admin`,
  project: (slug = null) => `admin/project${slug ? `/${slug}` : ""}`,
};
export default adminLink;
