"use client";
import conf from "@config";

export async function getGitProjects(params) {
  const { skip, take } = params;
  const response = await fetch(
    `https://api.github.com/search/repositories?q=user:${
      conf.githubUsername
    }+fork:false&sort=stars&per_page=${take}&type=Repositories&page=${Math.floor(
      skip / take
    )}`
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
