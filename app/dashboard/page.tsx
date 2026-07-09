"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FilePlus2 } from "lucide-react"

import { AccountMenu } from "@/components/account-menu"
import { BrandLogo } from "@/components/brand-logo"
import { CertificateCarousel } from "@/components/certificates/certificate-carousel"
import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { Button } from "@/components/ui/button"
import { defaultLocale, dictionaries, isLocale, localeStorageKey } from "@/lib/i18n"
import { getMockSession, type MockSession } from "@/lib/mock-auth"
import { mockCertificates, type MockCertificate } from "@/lib/mock-certificates"

export default function DashboardPage() {
  const router = useRouter()
  const [session, setSession] = useState<MockSession | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [locale, setLocale] = useState(defaultLocale)
  const [activeCertificateIndex, setActiveCertificateIndex] = useState(0)
  const t = dictionaries[locale].workspace
  const accountLabels = dictionaries[locale].account
  const certificates = mockCertificates.map((certificate) => ({
    ...certificate,
    companyName: session?.companyName || certificate.companyName,
    companySmartAccount: session?.companySmartAccount || certificate.companySmartAccount,
    trust: [t.sbtBound, t.vcSigned, t.registryAnchored],
  })) satisfies MockCertificate[]

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
          <button type="button" onClick={() => router.push("/")} className="cursor-pointer">
            <BrandLogo />
          </button>
          <AccountMenu session={session} labels={accountLabels} />
        </header>

        <section className="flex flex-1 items-center py-10 md:py-14">
          <div className="w-full">
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom md:text-6xl">
                  {t.title}
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom md:text-lg">
                  {t.subtitle}
                </p>
              </div>

              <Button className="h-11 w-full rounded-full bg-white px-5 text-black shadow-[0_18px_60px_rgba(255,255,255,0.16)] hover:bg-gray-100 md:w-auto">
                <FilePlus2 className="h-4 w-4" />
                {t.issueNew}
              </Button>
            </div>

            <section className="px-0 py-6 sm:px-2 lg:px-4">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-white [text-shadow:_0_4px_18px_rgb(0_0_0_/_45%)] font-open-sans-custom md:text-3xl">
                    {t.galleryTitle}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">{t.gallerySubtitle}</p>
                  <p className="mt-1 text-xs font-medium text-white/35">{t.boundNote}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="inline-flex w-fit rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/55 backdrop-blur-xl">
                    {activeCertificateIndex + 1} / {certificates.length}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="h-8 rounded-full border-white/14 bg-white/[0.06] px-3 text-xs font-semibold text-white/72 backdrop-blur-xl hover:bg-white/[0.12] hover:text-white"
                  >
                    <Link href="/certificates">{t.viewAll}</Link>
                  </Button>
                </div>
              </div>

              <CertificateCarousel
                certificates={certificates}
                onActiveIndexChange={setActiveCertificateIndex}
                labels={{
                  previous: t.previous,
                  next: t.next,
                }}
              />
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
