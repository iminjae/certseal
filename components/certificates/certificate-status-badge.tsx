import { cn } from "@/lib/utils"
import type { CertificateStatus } from "@/lib/mock-certificates"

const statusClassName: Record<CertificateStatus, string> = {
  Active: "border-emerald-300/30 bg-emerald-300/15 text-emerald-100",
  Expired: "border-amber-300/30 bg-amber-300/15 text-amber-100",
  Revoked: "border-rose-300/30 bg-rose-300/15 text-rose-100",
  Superseded: "border-violet-300/25 bg-violet-300/12 text-violet-100",
}

export function CertificateStatusBadge({
  status,
  className,
}: {
  status: CertificateStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        statusClassName[status],
        className,
      )}
    >
      {status}
    </span>
  )
}
