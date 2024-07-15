"use client";
import conf from "@config";

export async function getGitProjects(params) {
  const { page } = params;
  const response = await fetch(
    `https://api.github.com/search/repositories?q=user:${conf.githubUsername}+fork:false&sort=stars&per_page=10&type=Repositories&page=${page}`
    // `https://www.shwekhitonlinetv.com/?rest_route=/wp/v2/posts&page=${page}&_fields=id,title,date,_links,excerpt,categories&_embed=wp:featuredmedia&categories=55`,
    // {
    //   next: { tags: ["blog", "content"] },
    // }
  );
  if (response.status == 200) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
}
// Function to get product details by ID
export async function getGitProfile() {
  const url = `https://api.github.com/users/${conf.githubUsername}`;

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
