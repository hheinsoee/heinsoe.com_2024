"use client";
import { useTheme } from "@/context/theme";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { FaGithub, FaLink, FaLock } from "react-icons/fa";
import { technology } from "@constant";
import { JSONTree } from "react-json-tree";
import { getGitProfile, getGitProjects } from "./action";
import { List, Spin, Tag, Tooltip, message } from "antd";
import { MdInstallDesktop } from "react-icons/md";
import conf from "@config";
import { useWindowSize } from "@/hook/useWindowSize";
import EndDetect from "@/components/EndDetect";
import { Loading } from "@/components/Loading";

function Page() {
  const isDark = useTheme()?.isDark;

  const [loading, setLoadig] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const hasMore = projects.length < total;
  // const profile = await getGitProfile();
  const limit = 10;
  const fetchPost = async () => {
    setLoadig(true);
    return await getGitProjects({
      skip: projects.length,
      take: limit,
    })
      .then(({ incomplete_results, items, total_count }) => {
        setProjects((old) => [...old, ...items]);
        setTotal(total_count);
      })
      .catch((error) => {
        message.info(error.message);
      })
      .finally(() => {
        setLoadig(false);
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
  const { width } = useWindowSize();
  return (
    <div className="max-w-4xl mx-auto ">
      <Link
        href={`https://github.com/${conf.githubUsername}`}
        className="flex items-baseline px-8"
      >
        <h2>
          <FaGithub /> GitHub
        </h2>
        .com/<b>{conf.githubUsername}</b>
      </Link>
      <div
        className=" overflow-x-auto box-border p-4"
        style={{ maxWidth: "100vw" }}
      >
        <GitHubCalendar
          username={conf.githubUsername}
          blockSize={12}
          colorScheme={isDark ? "dark" : "light"}
        />
      </div>
      <div className="mx-8">
        {/* <JSONTree data={{ projects }} /> */}
        {/* <InfiniteScrollable
                    onEnd={loadMore}
                    loading={loading}
                    hasMore={hasMore}
                    loadingComponent={<center><Spin /></center>}
                    noMoreComponent={<center>No more Repo</center>}
                    offset={10}
                >
                   
                </InfiniteScrollable> */}
        <List>
          {/* <JSONTree data={article}/> */}
          {projects.map((p) => (
            <List.Item key={p.id} className="mt-16">
              {/* <Link style={{ marginBottom: 16 }} href={myLink.note(article.id)}> */}

              {/* </Link> */}
              <div>
                <b className="flex items-center gap-2">
                  <FaGithub />
                  {p.full_name}
                  <Tooltip
                    placement="topLeft"
                    title={"Open With Github Desktop"}
                  >
                    <Link href={`x-github-client://openRepo/${p.html_url}`}>
                      <MdInstallDesktop />
                    </Link>
                  </Tooltip>
                </b>

                <div>
                  <Link
                    href={p.html_url}
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    {" "}
                    <FaLink /> {p.html_url}
                  </Link>
                </div>
                <div className="opacity-60">{p.description}</div>
                <div>
                  <div className="inline-flex items-center gap-2 px-1">
                    {technology?.[p.language.toLowerCase()]?.Icon({})}{" "}
                    {p.language}
                  </div>
                </div>
                <div>
                  {p.topics.map((t: string) => (
                    <Tag key={t} bordered={false}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
              {p.private && <FaLock />}
            </List.Item> // your component here
          ))}
        </List>
        {loading && <Loading />}
        {hasMore && (
          <div className="sticky bottom-0 text-center p-4">
            {total - projects.length} more
          </div>
        )}
        {hasMore ? (
          <EndDetect onEnd={() => loadMore()} />
        ) : (
          <div className="text-center p-4">no more</div>
        )}
      </div>
    </div>
  );
}

export default Page;
