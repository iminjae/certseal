import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { notFound } from "next/navigation"

import { BrandLogo } from "@/components/brand-logo"
import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { CertificateStatusBadge } from "@/components/certificates/certificate-status-badge"
import { Button } from "@/components/ui/button"
import { getMockCertificateById, shortenAddress } from "@/lib/mock-certificates"

export default async function CertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const certificate = getMockCertificateById(id)

  if (!certificate) {
    notFound()
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <LiquidMetalBackground />
      <div className="fixed inset-0 z-[5] bg-black/55" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6">
        <header className="flex items-center justify-between">
          <Link href="/">
            <BrandLogo />
          </Link>
          <Button asChild variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </header>

        <section className="flex flex-1 items-center py-10">
          <article className="w-full rounded-3xl border border-white/18 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Certificate SBT</p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white font-open-sans-custom md:text-5xl">
                  #{certificate.tokenId}
                </h1>
                <p className="mt-4 max-w-2xl text-xl font-semibold leading-8 text-white/88">{certificate.title}</p>
              </div>
              <CertificateStatusBadge status={certificate.status} />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-[240px_1fr]">
              <div className="grid min-h-[240px] place-items-center rounded-2xl border border-white/15 bg-black/20">
                <div className="grid size-32 place-items-center rounded-full border border-cyan-200/30 bg-cyan-200/10">
                  <ShieldCheck className="h-14 w-14 text-cyan-100" />
                </div>
              </div>

              <dl className="grid gap-4 sm:grid-cols-2">
                <DetailItem label="Holder" value={certificate.companyName} />
                <DetailItem label="Certification Type" value={certificate.certificationType} />
                <DetailItem label="Issued" value={certificate.issuedAt} />
                <DetailItem label="Expires" value={certificate.expiresAt} />
                <DetailItem label="Company Smart Account" value={shortenAddress(certificate.companySmartAccount)} className="sm:col-span-2" />
                <DetailItem label="Trust Layer" value={certificate.trust.join(" · ")} className="sm:col-span-2" />
              </dl>
            </div>
          </article>
        </section>
      </div>
    </main>
  )
}

function DetailItem({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/14 bg-white/[0.06] p-4 ${className ?? ""}`}>
      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">{label}</dt>
      <dd className="mt-2 break-words text-base font-semibold text-white/86">{value}</dd>
    </div>
  )
}
