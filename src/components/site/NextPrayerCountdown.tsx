"use client";

import { useEffect, useState } from "react";
import { MotionCard } from "./motion";

type Props = {
  label: string;
  targetIso: string | null;
};

type Remaining = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function NextPrayerCountdown({ label, targetIso }: Props) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    if (!targetIso) return;

    const target = new Date(targetIso).getTime();
    if (Number.isNaN(target)) return;

    const update = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setRemaining(null);
        return;
      }
      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setRemaining({ hours, minutes, seconds });
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [targetIso]);

  if (!targetIso) {
    return null;
  }

  return (
    <MotionCard className="mt-4 inline-flex items-center gap-3 rounded-full border border-border/70 bg-background px-4 py-2 text-xs shadow-sm">
      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      {remaining ? (
        <span>
          {label} edhe{" "}
          {remaining.hours > 0 ? `${remaining.hours}h ` : ""}
          {remaining.minutes} min {remaining.seconds} sek.
        </span>
      ) : (
        <span>Namazi i radhës është në zhvillim ose ka kaluar për sot.</span>
      )}
    </MotionCard>
  );
}

