import { ExternalLink, ShieldCheck } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { shortenAddress, type MockCertificate } from "@/lib/mock-certificates"
import { CertificateStatusBadge } from "@/components/certificates/certificate-status-badge"

type CertificateSbtCardProps = {
  certificate: MockCertificate
  isActive?: boolean
  viewLabel: string
}

export function CertificateSbtCard({ certificate, isActive = false, viewLabel }: CertificateSbtCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-2xl border border-white/18 bg-white/[0.09] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-2xl",
        "before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.03)_42%,rgba(125,211,252,0.08))] before:content-['']",
        "after:absolute after:left-[10%] after:top-0 after:h-full after:w-[18%] after:-skew-x-12 after:bg-white/[0.07] after:blur-[1px] after:content-['']",
        isActive ? "ring-1 ring-white/35" : "ring-0",
      )}
    >
      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
          Certificate SBT
        </span>
        <CertificateStatusBadge status={certificate.status} />
      </div>

      <div className="relative z-10 my-7 flex flex-1 flex-col items-center justify-center text-center">
        <div className="grid size-28 place-items-center rounded-full border border-white/20 bg-black/25 shadow-[inset_0_1px_24px_rgba(255,255,255,0.08)]">
          <div className="grid size-20 place-items-center rounded-full border border-cyan-200/30 bg-cyan-200/10">
            <ShieldCheck className="h-9 w-9 text-cyan-100" />
          </div>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">Token ID</p>
        <h3 className="mt-1 text-4xl font-extrabold tracking-normal text-white [text-shadow:_0_4px_18px_rgb(0_0_0_/_45%)]">
          #{certificate.tokenId}
        </h3>
      </div>

      <div className="relative z-10 space-y-4">
        <div>
          <h4 className="line-clamp-2 min-h-[56px] text-xl font-semibold leading-7 text-white font-open-sans-custom">
            {certificate.title}
          </h4>
          <p className="mt-2 text-sm text-white/58">{certificate.companyName}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-xs text-white/60">
          <div className="col-span-2">
            <dt className="uppercase tracking-[0.18em] text-white/35">Type</dt>
            <dd className="mt-1 font-medium text-white/80">{certificate.certificationType}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.18em] text-white/35">Issued</dt>
            <dd className="mt-1 font-medium text-white/80">{certificate.issuedAt}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.18em] text-white/35">Expires</dt>
            <dd className="mt-1 font-medium text-white/80">{certificate.expiresAt}</dd>
          </div>
          <div className="col-span-2">
            <dt className="uppercase tracking-[0.18em] text-white/35">Smart Account</dt>
            <dd className="mt-1 font-mono text-[11px] text-white/75">
              {shortenAddress(certificate.companySmartAccount)}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-1.5">
          {certificate.trust.map((trustItem) => (
            <span key={trustItem} className="rounded-full border border-white/12 bg-white/[0.06] px-2 py-1 text-[10px] text-white/60">
              {trustItem}
            </span>
          ))}
        </div>

        <Button asChild className="h-10 w-full rounded-xl bg-white text-black hover:bg-gray-100">
          <Link href={`/certificates/${certificate.id}`}>
            {viewLabel}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  )
}
