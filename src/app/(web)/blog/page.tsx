"use client";
import React, { useEffect, useState } from "react";
import { BlogThumbnail } from "./_components/blog";

import EndDetect from "@/components/EndDetect";
import { getBlog } from "@/service";
import { Blog } from "@interface";
import { Divider, Flex, List, Skeleton, Space } from "antd";

export default function ScrollBlogs() {
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<Blog[]>([]);
  const [total, setTotal] = useState<number>(0);
  const limit = 3;
  const hasMore = article.length < total;
  const fetchPost = async () => {
    setLoading(true);
    await getBlog({
      skip: article.length,
      take: limit,
    })
      .then(({ data, pagination }) => {
        setTotal(pagination.total);
        setArticle((old) => [...old, ...data]);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!loading) {
      fetchPost();
    }
  }, []);

  const loadMore = () => {
    if (!loading) {
      fetchPost();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-8" id="blog">
      {/* <JSONTree data={article} /> */}
      <h2>Blogs</h2>
      <List>
        {/* <JSONTree data={article}/> */}
        {article.map((article) => (
          <List.Item key={article.id} className="my-16">
            {/* <Link style={{ marginBottom: 16 }} href={myLink.blog(article.id)}> */}
            <BlogThumbnail blog={article} />
            {/* </Link> */}
          </List.Item> // your component here
        ))}
        {loading && (
          <Flex gap={16}>
            <Skeleton className="flex-1" />
            <Skeleton.Image />
          </Flex>
        )}
      </List>
      {hasMore && (
        <div className="sticky bottom-0 text-center p-4">
          {total - article.length} more
        </div>
      )}
      {hasMore ? (
        <EndDetect onEnd={() => loadMore()} />
      ) : (
        <div className="text-center p-4">no more</div>
      )}
    </div>
  );
}
