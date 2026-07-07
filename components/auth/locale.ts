"use client"

import { useEffect, useState } from "react"
import { defaultLocale, dictionaries, isLocale, localeStorageKey, type Locale } from "@/lib/i18n"

export function useStoredDictionary() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeStorageKey)
    if (isLocale(storedLocale)) {
      setLocale(storedLocale)
    }
  }, [])

  return { locale, dictionary: dictionaries[locale] }
}
