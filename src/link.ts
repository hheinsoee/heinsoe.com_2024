import { me } from "./constant";

const myLink = {
  signin: () => "/signin",
  admin: () => "/admin",
  blog: (slug?:string|number) => `/blog${slug ? `/${slug}` : ""}`,
  project: (slug?:string|number) => `/project${slug ? `/${slug}` : ""}`,
  repo: (slug?:string|number) => `/github${slug ? `/${slug}` : ""}`,
  github: me.githubUrl,
  linkedin: me.linkedinUrl,
  whatsapp: me.whatsappUrl,
  npm: me.npmUrl,
};
export default myLink;
