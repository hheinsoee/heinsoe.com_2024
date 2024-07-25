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

export default async function Page() {
  const projects = await getProject({ take: 4 });
  const experience = await getExperience();
  const note = await getNote({ take: 3 });

  return (
    <div className="px-8 max-w-xl mx-auto box-border py-24">
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
