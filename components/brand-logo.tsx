import Image from "next/image"
import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  iconClassName?: string
  textClassName?: string
}

export function BrandLogo({ className, iconClassName, textClassName }: BrandLogoProps) {
  return (
    <span className={cn("flex items-center gap-2 text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]", className)}>
      <Image
        src="/certseal-icon.svg"
        alt="CertSeal"
        width={32}
        height={32}
        priority
        className={cn("h-8 w-8 rounded-lg shadow-[0_0_18px_rgba(66,230,255,0.45)]", iconClassName)}
      />
      <span className={cn("text-lg font-open-sans-custom tracking-wide", textClassName)}>CertSeal</span>
    </span>
  )
}
