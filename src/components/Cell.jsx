'use client'
import dayjs from 'dayjs';
import React from 'react';
import { CalendarOutlined } from "@ant-design/icons";
import { setting, technology } from '@constant';
import { Tag } from 'antd';
import { useTheme } from '@/context/theme';
import Image from 'next/image';

export const InlineDate = ({ date }) => {
    return (
        <>
            <CalendarOutlined />{" "}{dayjs(date).format(setting.dateFormat)}
        </>
    );
}
export default function Cell({ type, value, className }) {

    const { theme } = useTheme()
    const components = {
        date: <InlineDate date={value} />,
        technology: <div className={`inline-flex gap-2 px-2 rounded-md items-baseline ${className}`} style={{ background: theme.token.colorPrimary_(50, 10), color: theme.token.colorPrimary_(50, 100) }}>
            {technology?.[String(value)?.toLowerCase()]?.Icon()} {value}
        </div>,
        featured_image: <Image src={value} width={100} height={100} />
    }
    return components[type] || value
}