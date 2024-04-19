"use client";
import React, { useEffect, useState } from "react";
import { BlogGrid } from "./_components/blog";
import { Button, Spin } from "antd";

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

  return <div className="py-16">
    {/* <JSONTree data={{ loading, hasMore }} /> */}
    <InfiniteScrollable
      onEnd={loadMore}
      loading={loading}
      hasMore={hasMore}
      loadingComponent={<center><Spin /></center>}
      noMoreComponent={<center>No more Post</center>}
      offset={10}
    >
      {/* <JSONTree data={article}/> */}
      {article.map((article) => (
        <Link key={article.id} style={{ marginBottom: 16 }} href={myLink.blog(article.id)}>
          <h2>{article.id} - {article.name}</h2>
          <p>{article.description}</p>
        </Link> // your component here
      ))}
    </InfiniteScrollable>
  </div>;
}
