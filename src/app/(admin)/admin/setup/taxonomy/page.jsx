'use client'
import React, { useEffect, useState } from 'react';
import { Col, List, Row, message } from 'antd';
import { JSONTree } from 'react-json-tree';
import TaxonomyArchive from './_component/Archive';
import TaxonomyForm from './_component/Form';

function Page(props) {
    const [selected, setSelected] = useState(null);
    const [freshData, setFreshData] = useState(null);
    return (
        <Row gutter={[16, 16]}>
            <Col span={8} >
                <div className="max-w-3xl p-8 box-border mx-auto max-h-screen overflow-y-auto">
                    <h2>Taxonomy Manager</h2>
                    <p className='opacity-60'>this is Taxomomy manager</p>
                    <TaxonomyArchive freshData={freshData} selected={selected} setSelected={setSelected} />
                </div>
            </Col>
            <Col span={16}>
                <div className="p-8 box-border mx-auto max-h-screen overflow-y-auto">
                    {/* <JSONTree data={selected} /> */}
                    <TaxonomyForm
                        selected={selected}
                        setSelected={setSelected}
                        setFreshData={setFreshData}
                    />
                </div>
            </Col>
        </Row>
    );
}

export default Page;