"use client";
import React, { useEffect, useState } from "react";

const ContentMenus = ({ children }) => {
  const [headers, setHeaders] = useState([]);

  const findH = () => {
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
  };
  useEffect(() => {
    findH();
  }, [children]);

  const scrollToHeading = (id) => {
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
                className=" cursor-pointer hover:text-blue-700"
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
