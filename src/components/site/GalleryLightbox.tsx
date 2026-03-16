"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MotionCard } from "@/components/site/motion";

export function GalleryLightbox({
  images,
}: {
  images: Array<{ src: string; alt: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const current = useMemo(() => images[idx], [images, idx]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => {
              setIdx(i);
              setOpen(true);
            }}
            className="group relative h-56 overflow-hidden rounded-3xl border border-border/70 bg-muted text-left shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-foreground/20"
            aria-label={`Hap fotografinë: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-75" />
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 text-xs font-medium text-white/90">
              {img.alt}
            </div>
          </button>
        ))}
      </div>

      {open && current ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <MotionCard className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/30 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(min-width: 1024px) 900px, 95vw"
                  className="object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-white/10 p-3 text-xs text-white/80">
                <div className="truncate">{current.alt}</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-3 py-1 transition hover:bg-white/10"
                    onClick={() =>
                      setIdx((v) => (v - 1 + images.length) % images.length)
                    }
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-3 py-1 transition hover:bg-white/10"
                    onClick={() => setIdx((v) => (v + 1) % images.length)}
                  >
                    →
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-3 py-1 transition hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    Mbyll
                  </button>
                </div>
              </div>
            </MotionCard>
          </div>
        </div>
      ) : null}
    </>
  );
}

