/**
 * Example: Activities Component
 * Shows how to use apiGet with pagination and error handling
 */

"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";

type Activity = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  content?: string;
  coverImage?: string;
  startsAt?: string;
  endsAt?: string;
  isActive: boolean;
};

export function ActivitiesList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      const result = await apiGet<{
        activities: Activity[];
        pagination: { pages: number };
      }>(`/api/activities?page=${page}&limit=6`);

      if (result.ok && result.data) {
        setActivities(result.data.activities || []);
        setTotalPages(result.data.pagination?.pages || 1);
      }

      setLoading(false);
    }

    fetchActivities();
  }, [page]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="rounded-lg border p-4 hover:bg-muted"
          >
            <h3 className="font-semibold">{activity.title}</h3>
            {activity.summary && (
              <p className="text-sm text-muted-foreground mt-2">
                {activity.summary}
              </p>
            )}
            {activity.startsAt && (
              <p className="text-xs text-muted-foreground mt-2">
                starts: {new Date(activity.startsAt).toLocaleDateString("sq-XK")}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1 || loading}
          className="px-4 py-2 rounded border disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages || loading}
          className="px-4 py-2 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
