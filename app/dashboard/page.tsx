"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BadgeCheck, FilePlus2, LogOut } from "lucide-react"
import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { defaultLocale, dictionaries, isLocale, localeStorageKey } from "@/lib/i18n"
import { getMockSession, signOut, type MockSession } from "@/lib/mock-auth"

export default function DashboardPage() {
  const router = useRouter()
  const [session, setSession] = useState<MockSession | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [locale, setLocale] = useState(defaultLocale)
  const t = dictionaries[locale].auth.dashboard

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

  const handleSignOut = () => {
    signOut()
    router.push("/")
  }

  if (!isReady || !session) {
    return null
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/55" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6">
        <header className="flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer"
          >
            <BrandLogo />
          </button>
          <Button
            type="button"
            onClick={handleSignOut}
            variant="outline"
            className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            {t.signOut}
          </Button>
        </header>

        <section className="flex flex-1 items-center py-10">
          <div className="w-full">
            <div className="mb-10 max-w-2xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom md:text-lg">
                {t.subtitle}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DashboardCard label={t.company} value={session.companyName || t.emptyCompany} />
              <DashboardCard label={t.manager} value={session.managerName} />
              <DashboardCard label={t.smartAccount} value={session.companySmartAccount} className="md:col-span-2" />
              <DashboardCard label={t.issuedCertificates} value="0" />
            </div>

            <div className="mt-6 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-white/10 p-3">
                    <BadgeCheck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white font-open-sans-custom">{session.email}</p>
                    <p className="mt-1 text-sm text-white/60">{t.ownershipNote}</p>
                  </div>
                </div>
                <Button className="h-11 rounded-xl bg-white text-black hover:bg-gray-100">
                  <FilePlus2 className="h-4 w-4" />
                  {t.issueFirst}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function DashboardCard({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <article className={`rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl ${className ?? ""}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">{label}</p>
      <p className="mt-4 break-words text-xl font-semibold text-white font-open-sans-custom">{value}</p>
    </article>
  )
}
