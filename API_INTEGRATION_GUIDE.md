# API Integration Guide - Xhamia Mati 1

## Current Setup

Your project has full backend API support with:
- **Database**: PostgreSQL (Neon) via Prisma
- **API Routes**: Next.js Route Handlers in `/src/app/api`
- **Frontend**: React components calling APIs with `fetch()`

---

## 1. Current API Endpoints

### Admin Login
```
POST /api/admin/login
Body: { username: string, password: string }
Response: { ok: boolean, error?: string }
```

### Contact Form
```
POST /api/contact
Body: {
  name: string,
  email: string,
  phone?: string,
  message: string,
  context?: string (default: "kontakt")
}
Response: { ok: boolean, error?: string, message?: string }
```

### Prayer Times
```
GET /api/prayer-times
Response: prayer times data with caching headers
```

---

## 2. How to Create New API Endpoints

### Example: GET Videos API
Create file: `src/app/api/videos/route.ts`

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const categorySlug = url.searchParams.get("category");

    const videos = await prisma.video.findMany({
      where: {
        isActive: true,
        category: categorySlug
          ? { slug: categorySlug, isActive: true }
          : undefined,
      },
      include: { category: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ ok: true, data: videos });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // Admin only - check auth
  const auth = req.headers.get("Authorization");
  if (!auth) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const video = await prisma.video.create({
      data: {
        title: body.title,
        slug: body.slug,
        youtubeUrl: body.youtubeUrl,
        description: body.description,
        categoryId: body.categoryId,
        isActive: true,
      },
    });
    return NextResponse.json({ ok: true, data: video }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Failed to create video" },
      { status: 500 }
    );
  }
}
```

### Example: Dynamic API Route
Create file: `src/app/api/videos/[id]/route.ts`

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const video = await prisma.video.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!video) {
    return NextResponse.json(
      { ok: false, error: "Video not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, data: video });
}
```

---

## 3. How to Call APIs from Frontend

### Simple GET Request
```typescript
"use client";

import { useEffect, useState } from "react";

export function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/videos?category=ligjerata")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {videos.map((v) => (
        <div key={v.id}>{v.title}</div>
      ))}
    </div>
  );
}
```

### POST Request with Error Handling
```typescript
"use client";

import { useState } from "react";

export function AddVideoForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData);

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to add video");
        return;
      }

      alert("Video added successfully!");
      e.currentTarget.reset();
    } catch (err) {
      setError("Connection error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" required />
      <input name="slug" placeholder="Slug" required />
      <input name="youtubeUrl" placeholder="YouTube URL" required />
      <textarea name="description" placeholder="Description" />
      <button disabled={loading}>{loading ? "Loading..." : "Add"}</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
```

---

## 4. Create a Reusable API Client

Create file: `src/lib/api-client.ts`

```typescript
type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
};

type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

export async function apiCall<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { method = "GET", body, headers = {} } = options;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error: json.error || `HTTP ${response.status}`,
      };
    }

    return { ok: true, data: json.data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
```

Then use it anywhere:

```typescript
// GET
const result = await apiCall<Video[]>("/api/videos?category=ligjerata");
if (result.ok) {
  console.log(result.data);
}

// POST
const result = await apiCall("/api/videos", {
  method: "POST",
  body: { title: "New Video", ... },
});
```

---

## 5. Database Models Accessible via API

Your Prisma models you can query:

```
- VideoCategory
  fields: id, name, slug, order, isActive, createdAt, updatedAt
  
- Video
  fields: id, title, slug, description, youtubeUrl, publishedAt, 
          isFeatured, isActive, categoryId, createdAt, updatedAt
  
- AcademyPost
  fields: id, title, slug, excerpt, content, coverImage, isActive,
          publishedAt, createdAt, updatedAt
  
- Activity
  fields: id, title, slug, summary, content, coverImage, startsAt,
          endsAt, isActive, createdAt, updatedAt
  
- MosqueInfo
  fields: id, name, city, address, description, phone, email,
          facebookUrl, youtubeUrl, instagramUrl, createdAt, updatedAt
  
- DonationMethod
  fields: id, title, description, iban, swift, bankName, accountName,
          phone, linkUrl, order, isActive, createdAt, updatedAt
```

---

## 6. Common API Patterns

### Pagination
```typescript
// Route: /api/videos?page=1&limit=10
const page = Number(url.searchParams.get("page") ?? "1");
const limit = Number(url.searchParams.get("limit") ?? "10");
const skip = (page - 1) * limit;

const videos = await prisma.video.findMany({
  skip,
  take: limit,
  orderBy: { createdAt: "desc" },
});

const total = await prisma.video.count();
return NextResponse.json({
  ok: true,
  data: videos,
  pagination: { page, limit, total, pages: Math.ceil(total / limit) },
});
```

### Filtering
```typescript
// Route: /api/videos?category=ligjerata&featured=true
const filters: Record<string, unknown> = { isActive: true };

if (categorySlug) {
  filters.category = { slug: categorySlug, isActive: true };
}

if (url.searchParams.get("featured") === "true") {
  filters.isFeatured = true;
}

const videos = await prisma.video.findMany({ where: filters });
```

### Error Handling
```typescript
try {
  // ... your code
} catch (error) {
  console.error("API Error:", error);
  return NextResponse.json(
    {
      ok: false,
      error:
        process.env.NODE_ENV === "development"
          ? String(error)
          : "Server error",
    },
    { status: 500 }
  );
}
```

---

## 7. Testing APIs

Use browser DevTools or curl:

```bash
# Get videos
curl http://localhost:3000/api/videos

# Get videos by category
curl "http://localhost:3000/api/videos?category=ligjerata"

# Get prayer times
curl http://localhost:3000/api/prayer-times

# Post contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

---

## 8. Next Steps

1. **Add more API endpoints** for:
   - Academy posts (GET/POST/PUT/DELETE)
   - Activities (GET/POST/PUT/DELETE)
   - Donations info
   - Mosque info

2. **Add authentication** for admin endpoints:
   - Check session/token in middleware
   - Middleware file: `src/middleware.ts`

3. **Add validation** with Zod:
   - Validate request bodies before database operations

4. **Add caching**:
   - Use `Cache-Control` headers like in `prayer-times` route

---

## Quick Reference

| Task | File | Action |
|------|------|--------|
| Create new endpoint | `src/app/api/[feature]/route.ts` | Define GET/POST handlers |
| Dynamic routes | `src/app/api/[feature]/[id]/route.ts` | Access `params` |
| Call from frontend | Any `.tsx` component | Use `fetch()` or `apiCall()` |
| Add to database | `src/lib/prisma.ts` imported | `prisma.Model.create/update/delete` |
| Environment secrets | `.env.local` | Add `API_KEY=value` |

