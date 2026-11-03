import type { Locale } from "@/i18n/config";
import { en } from "./en";
import { it } from "./it";
import type { SiteContent } from "./types";

const all: Record<Locale, SiteContent> = { it, en };

export const getContent = (locale: Locale): SiteContent => all[locale];

export type { Block, Card, PageContent, PageKey, SiteContent } from "./types";
