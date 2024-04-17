"use client";
import React, { useEffect, useState } from "react";
import { BlogGrid } from "./blog";
import { APP } from "@/constant";
import { Button } from "antd";

export default function ScrollBlogs() {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
 
 
  return (
    <div>
      Blog archive
    </div>
  );
}
