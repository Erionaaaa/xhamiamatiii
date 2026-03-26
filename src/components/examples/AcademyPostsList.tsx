/**
 * Example: Academy Posts Component
 * Shows how to use the new API client to fetch and display data
 */

"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";

type AcademyPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  isActive: boolean;
  publishedAt?: string;
  createdAt: string;
};

type ApiPaginatedResponse = {
  ok: boolean;
  data?: AcademyPost[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  error?: string;
};

export function AcademyPostsList() {
  const [posts, setPosts] = useState<AcademyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const result = await apiGet<AcademyPost[]>("/api/academy?page=1&limit=10");

      if (result.ok && result.data) {
        setPosts(result.data);
      } else {
        setError(result.error || "Failed to load posts");
      }

      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No posts found</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg border p-4">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-32 object-cover rounded mb-3"
            />
          )}
          <h3 className="font-semibold text-lg">{post.title}</h3>
          {post.excerpt && (
            <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>
          )}
          {post.publishedAt && (
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(post.publishedAt).toLocaleDateString("sq-XK")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
