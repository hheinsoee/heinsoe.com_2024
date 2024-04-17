"use client";
import React, { useEffect, useState } from "react";

const ContentMenus = ({ children }) => {
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const headings = document.querySelectorAll(
      "#theContent h1, #theContent h2, #theContent h3"
    );

    const contentArray = Array.from(headings).map((heading, index) => {
      const id = `section-${index + 1}`;
      heading.id = id; // Assign a generated ID to each heading
      return {
        level: heading.tagName.toLowerCase(),
        content: heading.textContent,
        id: id,
      };
    });

    setHeaders(contentArray);
  }, []);

  const scrollToHeading = (id) => {
    // const element = document.getElementById(id);
    // if (element) {
    //   element.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start", // Align to the top of the scroll container
    //     inline: "start", // Align to the left of the scroll container
    //     offset: { top: 200 },
    //   });
    // }
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
    <div className="flex">
      {/* <JSONTree data={headers} /> */}
      <div id="theContent" className="flex-1">
        {children}
      </div>
      <div className="hidden md:block p-4">
        <div className="sticky top-20 w-40 noBase">
          <ul>
            {headers.map((h) => (
              <li
                key={h.id}
                onClick={() => scrollToHeading(h.id)}
                className=" cursor-pointer hover:text-orange-700"
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
