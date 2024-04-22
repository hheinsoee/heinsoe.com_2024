"use client";
import React, { useEffect, useState } from "react";
import { BlogCard, BlogGrid, BlogThumbnail } from "./_components/blog";
import { Button, List, Spin } from "antd";

import InfiniteScrollable from "react-infinite-scrollable";
import { getBlog } from "./action";
import { JSONTree } from "react-json-tree";
import Link from "next/link";
import myLink from "@/link";


export default function ScrollBlogs() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoadig] = useState(false);
  const [article, setArticle] = useState([]);

  const fetchPost = () => {
    setLoadig(true);
    getBlog({ page })
      .then((data) => {
        setArticle((old) => [...old, ...data]);
      })
      .catch((error) => {
        setHasMore(false);
        console.log({ error });
      })
      .finally(() => {
        setLoadig(false);
      });
  };

  useEffect(() => {
    if (!loading) { fetchPost(); }
  }, [page]);

  const loadMore = () => {
    setPage((pre) => pre + 1);
  };

  return <div className="px-8 max-w-2xl mx-auto" id="blog">
    {/* <JSONTree data={article} /> */}
    <InfiniteScrollable
      onEnd={loadMore}
      loading={loading}
      hasMore={hasMore}
      loadingComponent={<center><Spin /></center>}
      noMoreComponent={<center>No more Post</center>}
      offset={10}
    >
      <List>
        {/* <JSONTree data={article}/> */}
        {article.map((article) => (
          <List.Item key={article.id} className="mt-16">
            {/* <Link style={{ marginBottom: 16 }} href={myLink.blog(article.id)}> */}
            <BlogThumbnail {...article} description={article.body} />
            {/* </Link> */}
          </List.Item> // your component here
        ))}
      </List>
    </InfiniteScrollable>
  </div>;
}
