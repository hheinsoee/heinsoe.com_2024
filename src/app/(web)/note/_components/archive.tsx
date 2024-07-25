"use client";
import React, { useEffect, useState } from "react";
import { NoteThumbnail } from "./note";

import EndDetect from "@/components/EndDetect";
import { getNote } from "@/service";
import { Note } from "@interface";
import { Divider, Flex, List, Skeleton, Space } from "antd";
import Header from "@/components/Header";
import ActionBar from "@/components/ActionBar";
import myLink from "@/link";

export default function ScrollNotes() {
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<Note[]>([]);
  const [total, setTotal] = useState<number>(0);
  const limit = 10;
  const hasMore = article.length < total;
  const fetchPost = async () => {
    setLoading(true);
    await getNote({
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
    <>
      <div className="max-w-2xl mx-auto px-8" id="note">
        {/* <JSONTree data={article} /> */}
        <List>
          {/* <JSONTree data={article}/> */}
          {article.map((article) => (
            <List.Item key={article.id} className="my-16">
              {/* <Link style={{ marginBottom: 16 }} href={myLink.note(article.id)}> */}
              <NoteThumbnail note={article} />
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
          !loading && <div className="text-center p-4 opacity-50">no more</div>
        )}
      </div>
    </>
  );
}
