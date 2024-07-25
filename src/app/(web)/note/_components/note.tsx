"use client";
import myLink from "@/link";
import { CalendarOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button, Divider, Image, List, Space, Typography } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import ActionBar from "@/components/ActionBar";
import { noMarkdown } from "@hheinsoee/utility";

import { MarkDownView } from "../../../(admin)/_components/Inputs";
import { Note } from "@interface";

export const NoteThumbnail = ({ note }: { note: Note }) => {
  return (
    <Link className="flex-1 imgHover block" href={myLink.note(note.id)} title={note.title}>
      
        {note.image && (
          <div className=" float-end">
            <Image
              src={myLink.image(note.image.fileName, "m")}
              style={{ objectFit: "cover" }}
              width={60}
              height={60}
              alt={note.title}
              title={note.title}
              preview={false} //{ src: myLink.image(note.image.fileName, "xl") }}
              className="img"
            />
          </div>
        )}
        <div className="opacity-70 dark:opacity-50 text-xs">
          <CalendarOutlined /> {dayjs(note.createdDt).format("DD MMM YYYY")}
        </div>
        <h3 className="mb-0">{note.title}</h3>
        <MarkDownView
          text={`${note.description.substring(0, 200)} ${
            note.description.length > 200 ? " ..." : ""
          }`}
        />
        <ActionBar
          title={note.title}
          text={noMarkdown(note.description)}
          url={myLink.note(note.id)}
        />
    </Link>
  );
};

export const NoteList = ({ notes }: { notes: Note[] }) => {
  return (
    <List>
      {notes.map((b) => (
        <List.Item key={b.id}>
          <NoteThumbnail note={b} />
        </List.Item>
      ))}
    </List>
  );
};
