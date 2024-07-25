"use client";
import { useRepo } from "@/context/repo";
import { useTheme } from "@/context/theme";
import myLink from "@/link";
import { Tech } from "@interface";
import { Avatar } from "antd";
import React from "react";

function Stacks() {
  const { repo } = useRepo();
  const theme: any = useTheme();
  const techs: Tech[] = repo?.techs?.data;
  return (
    <div className="flex flex-wrap gap-4">
      {techs.map((t: Tech) => (
        <div key={t.id} className="flex items-center gap-2 px-2 rounded-md ">
          {t.image && (
            <img src={myLink.image(t.image?.fileName,'s')} alt={t.name} className="h-6"/>
          )}
          {t.name}
        </div>
      ))}
    </div>
  );
}

export default Stacks;
