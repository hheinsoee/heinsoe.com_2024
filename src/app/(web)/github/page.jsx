'use client'
import { useTheme } from '@/context/theme';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { FaGithub, FaLink, FaLock } from 'react-icons/fa';
import { me, technology } from '@constant'
import { JSONTree } from 'react-json-tree';
import { getGitProfile, getGitProjects } from './action';
import InfiniteScrollable from "react-infinite-scrollable";
import { List, Spin, Tag, Tooltip, message } from 'antd';
import { MdInstallDesktop } from 'react-icons/md';

function Page(props) {
    const isDark = useTheme()?.isDark

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoadig] = useState(false);
    const [projects, setProjects] = useState([]);

    // const profile = await getGitProfile();

    const fetchPost = async () => {
        setLoadig(true);
        return await getGitProjects({
            page
        })
            .then(({ incomplete_results, items, total_count }) => {
                setProjects((old) => [...old, ...items]);
                if (total_count <= projects.length) {
                    setHasMore(false);
                }
                if (items.length == 0) {
                    setHasMore(false);
                    throw new Error("no more")
                }
            })
            .catch((error) => {
                setHasMore(false);
                message.info(error.message)
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

    return (
        <div className='max-w-4xl mx-auto px-8'>
            <Link href={`https://github.com/${me.githubUsername}`} className='flex items-baseline'><h2><FaGithub /> GitHub</h2>.com/<b>{me.githubUsername}</b></Link>
            <GitHubCalendar
                username={me.githubUsername}
                blockSize={12}
                colorScheme={isDark ? 'dark' : 'light'}
            />
            {/* <JSONTree data={{ projects }} /> */}
            <InfiniteScrollable
                onEnd={loadMore}
                loading={loading}
                hasMore={hasMore}
                loadingComponent={<center><Spin /></center>}
                noMoreComponent={<center>No more Repo</center>}
                offset={10}
            >
                <List>
                    {/* <JSONTree data={article}/> */}
                    {projects.map((p) => (
                        <List.Item key={p.id} className="mt-16">
                            {/* <Link style={{ marginBottom: 16 }} href={myLink.blog(article.id)}> */}

                            {/* </Link> */}
                            <div>
                                <b className='flex items-center gap-2'>
                                    <FaGithub />
                                    {p.full_name}
                                    <Tooltip placement="topLeft" title={'Open With Github Desktop'}>
                                        <Link href={`x-github-client://openRepo/${p.html_url}`} ><MdInstallDesktop /></Link>
                                    </Tooltip>
                                </b>

                                <div>
                                    <Link href={p.html_url} target='_blank' className='flex items-center gap-2'> <FaLink /> {p.html_url}</Link>

                                </div>
                                <div className='opacity-60'>
                                    {p.description}
                                </div>
                                <div>
                                    <div className='inline-flex items-center gap-2 px-1'>
                                        {technology?.[p.language.toLowerCase()]?.Icon()} {p.language}
                                    </div>
                                </div>
                                <div>
                                    {p.topics.map(t => <Tag key={t} bordered={false}>{t}</Tag>)}
                                </div>
                            </div>
                            {p.private && <FaLock />}
                        </List.Item> // your component here
                    ))}
                </List>
            </InfiniteScrollable>
        </div>
    );
}

export default Page;