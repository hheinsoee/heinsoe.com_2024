import packageJson from "./package.json";
const conf = {
  ...packageJson,
  title: "Hein Soe",
  jobTitle:'Full Stack Developer',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  about:
    "as a web developer and designer committed to creating visually appealing and highly functional websites. With a focus on the latest trends and technologies, I strive to deliver exceptional web solutions that help businesses succeed online.",

  moto: "Crafting Code, Building Dreams",
  description: "Full Stack Developer",
  dateFormat: "DD-MMM YYYY",
  dateTimeFormat: "DD-MMM YYYY HH:mm",
  pageSize: 10,
  logo: {
    main: "/heinsoe.png",
  },
  phone: "+959252152447",
  email: "hi@heinsoe.com",
  githubUsername: "hheinsoee",
  githubUrl: "https://github.com/hheinsoee",
  whatsappUrl: "https://wa.me/+959252152447",
  linkedinUrl: "https://www.linkedin.com/in/hheinsoee",
  npmUrl: "https://www.npmjs.com/~hheinsoee",
  gaId: "G-7J6W175XF7",
};

export default conf;
