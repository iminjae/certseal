"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { AccountMenu } from "@/components/account-menu"
import { BrandLogo } from "@/components/brand-logo"
import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { defaultLocale, dictionaries, isLocale, localeStorageKey } from "@/lib/i18n"
import { getMockSession, type MockSession } from "@/lib/mock-auth"

export default function MyPage() {
  const router = useRouter()
  const [session, setSession] = useState<MockSession | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [locale, setLocale] = useState(defaultLocale)
  const t = dictionaries[locale].mypage
  const accountLabels = dictionaries[locale].account

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeStorageKey)
    if (isLocale(storedLocale)) {
      setLocale(storedLocale)
    }

    const currentSession = getMockSession()
    if (!currentSession) {
      router.replace("/login")
      return
    }

    setSession(currentSession)
    setIsReady(true)
  }, [router])

  if (!isReady || !session) {
    return null
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/55" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6">
        <header className="flex items-center justify-between gap-4">
          <button type="button" onClick={() => router.push("/dashboard")} className="cursor-pointer">
            <BrandLogo />
          </button>
          <AccountMenu session={session} labels={accountLabels} />
        </header>

        <section className="flex flex-1 items-center py-10 md:py-14">
          <div className="w-full max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom md:text-lg">
              {t.subtitle}
            </p>

            <article className="mt-9 rounded-[2rem] border border-white/16 bg-white/[0.07] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-white font-open-sans-custom">{t.comingSoon}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62">{t.description}</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}
