'use client'
import { Button, Space } from 'antd';
import React from 'react';
import {
    ArrowRightOutlined,
    CalendarOutlined,
    ShareAltOutlined,
} from "@ant-design/icons";

function ActionBar(props) {
    return (
        <Space>
            <Button type="text" icon={<ShareAltOutlined />}></Button>
        </Space>
    );
}

export default ActionBar;