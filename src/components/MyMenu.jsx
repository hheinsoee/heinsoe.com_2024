import myLink from '@/link';
import { Anchor, List, Switch } from 'antd';
import Link from 'next/link';
import React from 'react';
import { FaGithub, FaLinkedin, FaNpm, FaWhatsapp } from 'react-icons/fa';
import info from "./../../siteInfo.json"
import { ImGithub, ImLinkedin, ImLinkedin2, ImNpm, ImWhatsapp } from 'react-icons/im';
import { SiNpm } from 'react-icons/si';
import { useLayout } from '@/context/layout';
import { usePathname, useRouter } from 'next/navigation';

function MyMenu() {
    const router = useRouter()
    const handleClick = (e, link) => {
        e.preventDefault();
        router.push(link.href);
    };
    const pathname = usePathname();
    const isHome = pathname === "/";
    return (
        <nav className={'h-screen p-8 py-24 box-border flex flex-col  max-w-xl mx-auto'}>
            <div>
                <Link href="/" className='title'>{info.name}</Link>
                <div className='opacity-50'>{info.title}</div>
            </div>
            <div className='flex-1 my-16'>
                <Anchor
                    affix={false}
                    onClick={handleClick}
                    items={[
                        {
                            key: 'Experience',
                            href: '/#experience',
                            title: 'Experience',
                        },
                        {
                            key: 'Projects',
                            href: isHome ? '/#projects' : myLink.project(),
                            title: 'Projects',
                        },
                        {
                            key: 'Skills',
                            href: '/#skills',
                            title: 'Skills',
                        },
                        {
                            key: 'blog',
                            href: myLink.blog(),
                            title: 'Blog',
                        },
                    ]}
                />
            </div>
            <div className='text-2xl flex gap-4 flex-wrap'>
                <Link href={''} className='opacity-50 hover:opacity-100'><FaGithub /></Link>
                {/* <Link href={''} className='opacity-50 hover:opacity-100'><SiNpm /></Link> */}
                <Link href={''} className='opacity-50 hover:opacity-100'><FaLinkedin /></Link>
                <Link href={''} className='opacity-50 hover:opacity-100'><FaWhatsapp /></Link>
            </div>
        </nav>
    );
}

export default MyMenu;