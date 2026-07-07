import { Shield } from "lucide-react"
import type { Dictionary } from "@/lib/i18n"

type AuthInfoBoxProps = {
  content: Dictionary["auth"]["common"]
}

export function AuthInfoBox({ content }: AuthInfoBoxProps) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-white/10 p-2">
          <Shield className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white font-open-sans-custom">{content.companyAuthTitle}</p>
          <p className="mt-1 text-xs leading-5 text-white/65 font-open-sans-custom">{content.companyAuthDescription}</p>
        </div>
      </div>
    </div>
  )
}
