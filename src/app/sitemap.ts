import myLink from "@/link";
import { getNote, getProject } from "@/service";
import conf from "@config";
import { Note, Project } from "@interface";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data:projects } = await getProject({});
  const { data:notes } = await getNote({});
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `${conf.baseUrl}${myLink.home()}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${conf.baseUrl}${myLink.note()}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${conf.baseUrl}${myLink.project()}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${conf.baseUrl}${myLink.repo()}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // You can also add additional URLs dynamically based on the fetched data
  projects.forEach((project: Project) => {
    sitemap.push({
      url: `${conf.baseUrl}${myLink.project(project.id)}`,
      lastModified: new Date(project.updatedDt || project.createdDt || ""),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });
  notes.forEach((note: Note) => {
    sitemap.push({
      url: `${conf.baseUrl}${myLink.note(note.id)}`,
      lastModified: new Date(note.updatedDt || note.createdDt || ""),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });
  return sitemap;
}
