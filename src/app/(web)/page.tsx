import { notFound } from "next/navigation";
import { getNote } from "@service/note.service";
import ExperienceTimeLine from "@components/ExperienceTimeLine";
import { NoteList } from "./note/_components/note";
import ProjectThumbnail from "./project/_components/ProjectThumbnail";
import Link from "next/link";
import myLink from "@/link";
import { Button, Divider, List } from "antd";
import { technology } from "@constant";
import { MarkDownView } from "../(admin)/_components/Inputs";
import { getProject } from "@/service/project.service";
import { getExperience } from "@/service/experience.service";
import conf from "@config";
import Footer from "@/components/Footer";
import { RightOutlined } from "@ant-design/icons";
import Stacks from "@/components/Stacks";
import { Experience } from "@interface";
import { getTech } from "@/service";

export default async function Page() {
  const projects = await getProject({ take: 4 });
  const experience = await getExperience();
  const techs = await getTech();
  const note = await getNote({ take: 3 });
  const e: Experience = experience.data[0];
  const structuredData = {
    "@context": "http://schema.org",

    "@type": "Person",
    name: conf.title,
    url: conf.baseUrl,
    sameAs: [conf.linkedinUrl, conf.githubUrl],
    alternateName: "ဟိန်းစိုး",
    jobTitle: "Application Developer",
    worksFor: {
      "@type": "Organization",
      name: "Brainwave Data Co., Ltd",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Dagon University",
    },
    image: `${conf.baseUrl}/heinsoe.jpg`,
    description: conf.about,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": conf.baseUrl,
    },
    knowsAbout: techs.data.map((t) => t.name),
    hasOccupation: {
      "@type": "Occupation",
      name: e.position,
      skills: e.techs?.map((e) => e.Tech?.name),
      description: e.description,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": conf.baseUrl,
        lastReviewed: new Date(),
      },
      estimatedSalary: [
        {
          "@type": "MonetaryAmountDistribution",
          name: "base",
          currency: "USD",
          duration: "P1Y",
          percentile10: "6667.03",
          percentile25: "7670.5",
          median: "8000",
          percentile75: "8667.1",
          percentile90: "10000.5",
        },
      ],
      occupationLocation: [
        {
          "@type": "State",
          name: "Yangon",
        },
      ],
    },
    worksOn: projects.data.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: myLink.project(p.id),
    })),
    email: conf.email,
    telephone: conf.phone,
    industry: "Technology",
  };
  return (
    <div className="px-8 max-w-xl mx-auto box-border py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <MarkDownView text={conf.about} />
      <Divider />
      <section id="experience" className="py-16">
        <h2 className="sticky md:relative top-0 z-10 backdrop-blur-md md:backdrop-blur-0 p-2 px-8 -mx-8">
          Experience
        </h2>
        <ExperienceTimeLine experience={experience.data} />
        {/* <Button type='primary' ghost>My Resume</Button> */}
      </section>

      <Divider />
      <section id="projects" className="py-16">
        <h2 className="sticky md:relative top-0 z-10 backdrop-blur-md md:backdrop-blur-0 p-2 px-8 -mx-8">
          <Link href={myLink.project()} title="Projects">
            Projects <RightOutlined />
          </Link>
        </h2>
        {projects.data?.map((p) => {
          return <ProjectThumbnail project={p} key={p.id} />;
        })}
        <div className="text-right">
          <Link href={myLink.project()}>
            More Projects
            <RightOutlined />{" "}
          </Link>
        </div>
      </section>

      <Divider />
      <section id="stacks" className="p-8 -ml-8 -mr-8 py-16 dotBg">
        <h2>Stacks</h2>
        <Stacks />
        {/* <div className="flex flex-wrap gap-4">
          {Object.entries(technology)?.map(([key, { label, Icon }]) => (
            <div key={key} className="flex items-center gap-2 px-2 rounded-md ">
              <Icon className="text-2xl" />
              {label}
            </div>
          ))}
        </div> */}
      </section>

      <Divider />
      <section id="note" className="py-16">
        <h2 className="sticky md:relative top-0 z-10 backdrop-blur-md md:backdrop-blur-0 p-2 px-8 -mx-8">
          <Link href={myLink.note()} title="Note">
            Note <RightOutlined />
          </Link>
        </h2>
        <NoteList notes={note.data} />
        <div className="text-right">
          <Link href={myLink.note()}>
            More Notes
            <RightOutlined />{" "}
          </Link>
        </div>
      </section>
      <Divider />
      <Footer />
    </div>
  );
}
