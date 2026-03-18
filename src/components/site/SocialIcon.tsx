type SocialPlatform = "facebook" | "instagram" | "youtube" | "tiktok";

type SocialIconProps = {
  platform: SocialPlatform;
  className?: string;
};

export function SocialIcon({ platform, className }: SocialIconProps) {
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.438H7.078v-3.489h3.047V9.412c0-3.017 1.792-4.687 4.533-4.687 1.312 0 2.686.236 2.686.236v2.964h-1.514c-1.49 0-1.954.931-1.954 1.887v2.261h3.328l-.532 3.489h-2.796V24C19.612 23.094 24 18.099 24 12.073z" />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5z" />
        <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
        <circle cx="17.5" cy="6.5" r="1.25" />
      </svg>
    );
  }

  if (platform === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
        <path d="M23.498 6.186a3.02 3.02 0 0 0-2.125-2.135C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.373.551A3.02 3.02 0 0 0 .502 6.186 31.804 31.804 0 0 0 0 12a31.804 31.804 0 0 0 .502 5.814 3.02 3.02 0 0 0 2.125 2.135C4.495 20.5 12 20.5 12 20.5s7.505 0 9.373-.551a3.02 3.02 0 0 0 2.125-2.135A31.804 31.804 0 0 0 24 12a31.804 31.804 0 0 0-.502-5.814zM9.75 15.5v-7L16 12l-6.25 3.5z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.54 3.75A4.8 4.8 0 0 0 20.25 5.6v3.14a8.03 8.03 0 0 1-3.72-.95v6.16c0 3.86-3.14 7-7 7s-7-3.14-7-7 3.14-7 7-7c.42 0 .83.04 1.23.11v3.36a3.65 3.65 0 0 0-1.23-.21 3.74 3.74 0 1 0 3.74 3.74V2h3.27z" />
    </svg>
  );
}
