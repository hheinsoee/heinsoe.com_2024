import conf from "@config";
import { noMarkdown } from "@hheinsoee/utility";

interface Seo {
  title: string;
  description: string;
  url: string;
  images?: Image[];
}
interface Image {
  url: string;
  width?: number | 600;
  height?: number | 600;
}
// :{ url: data?.url, width: 1200, height: 630 }
export const seo = ({ title, description, url, images }: Seo) => {
  const description_ = noMarkdown(description);
  return {
    title,
    description:description_,
    openGraph: {
      title,
      description:description_,
      url,
      siteName: conf.title,
      images, //make sure its a valid image url
    },
    twitter: {
      card: "summary",
      title,
      description:description_,
      images,
    },
    whatsApp: {
      title,
      description:description_
        ?.replace(/<[^>]*>/g, "")
        ?.replace(/&nbsp;/gi, " "),
      ...(images?.[0]
        ? {
            thumbnailUrl: images[0].url,
            thumbnailWidth: 800,
            thumbnailHeight: 800,
          }
        : {}),
    },
  };
};
