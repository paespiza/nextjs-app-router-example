"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

const locales = [
  { label: "🇺🇸 English (US)", value: "en-US" },
  { label: "🇬🇧 English (UK)", value: "en-GB" },
  { label: "🇨🇦 English (CA)", value: "en-CA" },
  { label: "🇦🇺 English (AU)", value: "en-AU" },
  { label: "🇪🇸 Español (ES)", value: "es-ES" },
];

export default function LocalePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;

    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}-[A-Z]{2}/, ""); // strip locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div>
      <label htmlFor="locale-select">🌍 Language:</label>
      <select id="locale-select" onChange={handleChange} disabled={isPending}>
        {locales.map((locale) => (
          <option key={locale.value} value={locale.value}>
            {locale.label}
          </option>
        ))}
      </select>
    </div>
  );
}
