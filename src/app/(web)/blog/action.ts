"use server";

export async function getBlog(params: any) {
  var page = params;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
    {
      next: { tags: ["blog", "content"] },
    }
  );
  if (!res.ok) {
    return [];
  }
  return res.json();
}
// Function to get product details by ID
export async function getBlogDetail(id: number) {
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
