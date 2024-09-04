import ContentMenus from "@/components/contentMenu";
import { Flex, Image } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import { getNote } from "@service/note.service";
import { MarkDownView } from "@/app/(admin)/_components/Inputs";
import ActionBar from "@/components/ActionBar";
import { noHtml, noMarkdown } from "@hheinsoee/utility";
import myLink from "@/link";
import { Note } from "@interface";
import conf from "@config";
import Header from "@/components/Header";

export default async function NoteDetails({ params }: { params: { id: any } }) {
  if (isNaN(params.id)) {
    return notFound();
  }
  return await getNote({
    where: {
      id: parseInt(params.id),
    },
  })
    .then(({ data }) => {
      return <NoteDetailsView note={data[0]} />;
    })
    .catch((error) => {
      // console.log(error);
      notFound();
    });
}

function NoteDetailsView({ note }: { note: Note }) {
  return (
    <>
      <h2 className="hidden">Notes</h2>

      <ContentMenus>
        <Header
          title={<h3 className="font-bold m-0">{note?.title}</h3>}
          extra={
            <ActionBar
              title={note.title}
              text={noMarkdown(note.description)}
              url={myLink.note(note.id)}
            />
          }
        />

        <div className="p-4">
          {note.image && (
            <Image
              src={myLink.image(note.image.fileName, "m")}
              alt={note.title}
              title={note.title}
              preview={{ src: myLink.image(note.image.fileName, "xl") }}
            />
          )}
          {/* <Flex justify="space-between">
            <h3 className="text-lg">{note.title}</h3>
            <ActionBar
              title={note.title}
              text={noMarkdown(note.description)}
              url={myLink.note(note.id)}
            />
          </Flex> */}
          <div className="text-sm flex gap-2 opacity-70 mb-4">
            <CalendarOutlined />{" "}
            {dayjs(note.createdDt).format(conf.dateTimeFormat)}
          </div>
          <MarkDownView text={note.body} />
        </div>
      </ContentMenus>
    </>
  );
}
