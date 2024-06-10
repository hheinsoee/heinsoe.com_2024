"use client";
import React, { useEffect, useState } from "react";

interface Heading {
  level: string;
  content: string;
  id: string;
}

const ContentMenus: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [headers, setHeaders] = useState<Heading[]>([]);

  const sanitizeId = (text: string) => {
    return text
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const findH = () => {
    const headings = document.querySelectorAll(
      "#theContent h1, #theContent h2, #theContent h3"
    );
    const contentArray: Heading[] = Array.from(headings).map(
      (heading, index) => {
        const id = sanitizeId(heading.textContent || "");
        heading.id = id; // Assign a generated ID to each heading
        return {
          level: heading.tagName.toLowerCase(),
          content: heading.textContent || "",
          id: id,
        };
      }
    );

    setHeaders(contentArray);
  };

  useEffect(() => {
    findH();
  }, [children]);

  const scrollToHeading = (id: string) => {
    findH();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Set your desired offset
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex mx-auto">
      <div id="theContent" className="flex-1">
        <div className="mx-auto md:max-w-3xl">{children}</div>
      </div>
      <div className="hidden md:block p-4">
        <div className="sticky top-0 w-60 noBase max-h-screen hideScroll overflow-y-auto ">
          <ul>
            {headers.map((h) => (
              <li
                key={h.id}
                onClick={() => scrollToHeading(h.id)}
                className="cursor-pointer hover:text-blue-700"
                style={{
                  marginLeft: `${parseInt(h.level.charAt(1)) - 1}0px`,
                }}
              >
                {h.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContentMenus;
