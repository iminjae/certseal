"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FilePlus2 } from "lucide-react"

import { AccountMenu } from "@/components/account-menu"
import { BrandLogo } from "@/components/brand-logo"
import { CertificateSbtCard } from "@/components/certificates/certificate-sbt-card"
import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { defaultLocale, dictionaries, isLocale, localeStorageKey } from "@/lib/i18n"
import { getMockSession, type MockSession } from "@/lib/mock-auth"
import { mockCertificates, type CertificateStatus, type MockCertificate } from "@/lib/mock-certificates"

type CertificateFilter = "All" | CertificateStatus

export default function CertificatesPage() {
  const router = useRouter()
  const [session, setSession] = useState<MockSession | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [locale, setLocale] = useState(defaultLocale)
  const [filter, setFilter] = useState<CertificateFilter>("All")
  const t = dictionaries[locale].certificates
  const workspace = dictionaries[locale].workspace
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

  const certificates = useMemo(() => {
    return mockCertificates.map((certificate) => ({
      ...certificate,
      companyName: session?.companyName || certificate.companyName,
      companySmartAccount: session?.companySmartAccount || certificate.companySmartAccount,
      trust: [workspace.sbtBound, workspace.vcSigned, workspace.registryAnchored],
    })) satisfies MockCertificate[]
  }, [session?.companyName, session?.companySmartAccount, workspace.registryAnchored, workspace.sbtBound, workspace.vcSigned])

  const stats = useMemo(
    () => ({
      total: certificates.length,
      active: certificates.filter((certificate) => certificate.status === "Active").length,
      expired: certificates.filter((certificate) => certificate.status === "Expired").length,
      revoked: certificates.filter((certificate) => certificate.status === "Revoked").length,
    }),
    [certificates],
  )

  const filteredCertificates = useMemo(() => {
    if (filter === "All") return certificates
    return certificates.filter((certificate) => certificate.status === filter)
  }, [certificates, filter])

  const filters: Array<{ value: CertificateFilter; label: string }> = [
    { value: "All", label: t.all },
    { value: "Active", label: t.active },
    { value: "Expired", label: t.expired },
    { value: "Revoked", label: t.revoked },
  ]

  if (!isReady || !session) {
    return null
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/55" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6">
        <header className="flex items-center justify-between gap-4">
          <button type="button" onClick={() => router.push("/dashboard")} className="cursor-pointer">
            <BrandLogo />
          </button>
          <AccountMenu session={session} labels={accountLabels} />
        </header>

        <section className="py-10 md:py-14">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-4 text-base leading-7 text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom md:text-lg">
                {t.subtitle}
              </p>
            </div>

            <Button asChild className="h-11 w-full rounded-full bg-white px-5 text-black shadow-[0_18px_60px_rgba(255,255,255,0.16)] hover:bg-gray-100 md:w-auto">
              <Link href="/issue">
                <FilePlus2 className="h-4 w-4" />
                {t.issueNew}
              </Link>
            </Button>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <SummaryChip label={t.total} value={stats.total} />
            <SummaryChip label={t.active} value={stats.active} tone="active" />
            <SummaryChip label={t.expired} value={stats.expired} tone="expired" />
            <SummaryChip label={t.revoked} value={stats.revoked} tone="revoked" />
          </div>

          <div className="mb-7 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex min-w-max rounded-full border border-white/12 bg-white/[0.06] p-1 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
              {filters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold text-white/54 transition-colors",
                    filter === item.value && "bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.14)]",
                    filter !== item.value && "hover:bg-white/[0.08] hover:text-white",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {filteredCertificates.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCertificates.map((certificate) => (
                <div key={certificate.id} className="transition duration-300 hover:-translate-y-1 hover:drop-shadow-[0_18px_45px_rgba(125,211,252,0.13)]">
                  <CertificateSbtCard certificate={certificate} viewLabel={t.viewCertificate} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/14 bg-white/[0.06] p-10 text-center text-sm font-medium text-white/60 shadow-[0_28px_90px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
              {t.empty}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function SummaryChip({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: number
  tone?: "default" | "active" | "expired" | "revoked"
}) {
  const toneClassName = {
    default: "text-white/82",
    active: "text-emerald-100",
    expired: "text-amber-100",
    revoked: "text-rose-100",
  }[tone]

  return (
    <article className="rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">{label}</p>
      <p className={cn("mt-2 text-2xl font-extrabold tracking-tight", toneClassName)}>{value}</p>
    </article>
  )
}
