/**
 * Example: Videos Component by Category
 * Shows how to use apiGet with query parameters
 */

"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";

type Video = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  youtubeUrl: string;
  isFeatured: boolean;
  category: { name: string; slug: string };
};

type Props = {
  categorySlug?: string;
  featured?: boolean;
};

export function VideosList({ categorySlug, featured }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      const params = new URLSearchParams();
      if (categorySlug) params.append("category", categorySlug);
      if (featured) params.append("featured", "true");
      params.append("limit", "20");

      const result = await apiGet<Video[]>(
        `/api/videos?${params.toString()}`
      );

      if (result.ok && result.data) {
        setVideos(result.data);
      } else {
        setError(result.error || "Failed to load videos");
      }

      setLoading(false);
    }

    fetchVideos();
  }, [categorySlug, featured]);

  if (loading) return <div className="text-center py-8">Loading videos...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (videos.length === 0)
    return <div className="text-center py-8 text-muted-foreground">No videos found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {videos.map((video) => (
        <div key={video.id} className="rounded-lg border overflow-hidden">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              ▶ Watch on YouTube
            </a>
          </div>
          <div className="p-4">
            <p className="text-xs text-muted-foreground">{video.category.name}</p>
            <h3 className="font-semibold mt-1">{video.title}</h3>
            {video.description && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {video.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
