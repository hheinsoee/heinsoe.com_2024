"use server";
import { safeSql } from "@/sql/connect";
import { SELECT } from "@/sql/composer";
import { notFound } from "next/navigation";
export async function getBlog(params) {
  const { page } = params;
  // const { query, data } = SELECT({
  //   table: "website",
  //   offset: 10 * (page - 1),
  //   limit: 10,
  // });
  // const response = await safeSql(query, data);
  // if (response.length > 1) {
  //   return response;
  // } else {
  //   notFound()
  // }
 

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
    // `https://www.shwekhitonlinetv.com/?rest_route=/wp/v2/posts&page=${page}&_fields=id,title,date,_links,excerpt,categories&_embed=wp:featuredmedia&categories=55`,
    {
      next: { tags: ["blog", "content"] },
    }
  );
  if (response.status == 200) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
}
// Function to get product details by ID
export async function getBlogDetail(id) {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
      tags: ["blog", "content"],
    },
  });
  if (response.status < 300) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
}
