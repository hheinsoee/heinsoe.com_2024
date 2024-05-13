import { me } from "./constant";

const myLink = {
  signin: () => "/signin",
  admin: () => "/admin",
  blog: (slug = null) => `/blog${slug ? `/${slug}` : ""}`,
  project: (slug = null) => `/project${slug ? `/${slug}` : ""}`,
  repo: (slug = null) => `/github${slug ? `/${slug}` : ""}`,
  github: me.githubUrl,
  linkedin: me.linkedinUrl,
  whatsapp: me.whatsappUrl,
  npm: me.npmUrl,
};
export default myLink;
