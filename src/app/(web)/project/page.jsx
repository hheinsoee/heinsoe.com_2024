
import React from "react";
import { List } from "antd";
import { getBlog } from "./action";


export default async function ScrollBlogs() {
    return await getBlog({ page: 1 }).then((project) => {
        return (
            <main className="px-8 max-w-5xl mx-auto " id="project">
                <ul>
                    {project.map((d) => (
                        <li key={d.id} className="mt-16">
                            {d.body}
                        </li>
                    ))}
                </ul>
            </main>
        );
    }).catch((error) => {
        console.log(error)
    })
}


