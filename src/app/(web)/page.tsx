import { notFound } from "next/navigation";
import { getBlog } from "@service/blog.service";
import ExperienceTimeLine from "@components/ExperienceTimeLine";
import { BlogList } from "./blog/_components/blog";
import ProjectThumbnail from "./project/_components/ProjectThumbnail";
import Link from "next/link";
import myLink from "@/link";
import { Button, Divider, List } from "antd";
import { technology } from "@constant";
import { MarkDownView } from "../(admin)/_components/Inputs";
import { CgArrowRight } from "react-icons/cg";
import { getProject } from "@/service/project.service";
import { getExperience } from "@/service/experience.service";
import conf from "@config";

export default async function Page() {
  const projects = await getProject({ take: 4 });
  const experience = await getExperience({ take: 4 });
  const blog = await getBlog({ take: 4 });

  return (
    <div className="px-8 max-w-xl mx-auto box-border">
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
          <Link href={myLink.project()} title="Projects">Projects <CgArrowRight /></Link>
        </h2>
        {projects.data?.map((p) => {
          return <ProjectThumbnail project={p} key={p.id} />;
        })}
        <div className="text-right">
          <Link href={myLink.project()}>
            More Projects
            <CgArrowRight />{" "}
          </Link>
        </div>
      </section>

      <Divider />
      <section id="skills" className="p-8 -ml-8 -mr-8 py-16 dotBg">
        <h2>Skills</h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(technology)?.map(([key, { label, Icon }]) => (
            <div key={key} className="flex items-center gap-2 px-2 rounded-md ">
              <Icon className="text-2xl" />
              {label}
            </div>
          ))}
        </div>
      </section>

      <Divider />
      <section id="blog" className="py-16">
        <h2 className="sticky md:relative top-0 z-10 backdrop-blur-md md:backdrop-blur-0 p-2 px-8 -mx-8">
          <Link href={myLink.blog()} title="Blog">Blog <CgArrowRight /></Link>
        </h2>
        <BlogList blogs={blog.data} />
        <div className="text-right">
          <Link href={myLink.blog()}>
            More Articles
            <CgArrowRight />{" "}
          </Link>
        </div>
      </section>
      <Divider />
      <div className="dotBg h-16" />
      <div className="text-sm opacity-50 font-light">
        <p>
          Crafted with passion using{" "}
          <Link href="https://nextjs.org" target="_blank">
            Next.js
          </Link>
          ,{" "}
          <Link href="https://tailwindcss.com/" target="_blank">
            Tailwind CSS
          </Link>
          , and{" "}
          <Link href="https://ant.design" target="_blank">
            Ant Design
          </Link>
          . This site showcases my journey and projects. Taking cues from{" "}
          <Link href="https://brittanychiang.com/" target="_blank">
            Brittany Chiang&apos;s portfolio
          </Link>{" "}
          website layout, I utilized similar concepts as a reference for this
          design.
        </p>
        &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}
