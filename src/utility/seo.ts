import conf from "@config";

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
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: conf.title,
      images, //make sure its a valid image url
    },
    twitter: {
      card: "summary",
      title,
      description,
      images,
    },
    whatsApp: {
      title,
      description: description
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
