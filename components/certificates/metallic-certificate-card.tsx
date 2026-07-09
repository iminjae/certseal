import Link from "next/link"

import { cn } from "@/lib/utils"
import type { CertificateStatus, MockCertificate } from "@/lib/mock-certificates"
import styles from "./metallic-certificate-card.module.css"

type MetallicCertificateCardProps = {
  certificate: MockCertificate
  enableElectricBorder?: boolean
  href?: string
  className?: string
}

const statusClassName: Record<CertificateStatus, string> = {
  Active: styles.badgeActive,
  Expired: styles.badgeExpired,
  Revoked: styles.badgeRevoked,
  Superseded: styles.badgeSuperseded,
}

export function MetallicCertificateCard({
  certificate,
  enableElectricBorder = false,
  href,
  className,
}: MetallicCertificateCardProps) {
  const card = (
    <article className={cn(styles.cardContainer, enableElectricBorder && styles.active, className)}>
      {enableElectricBorder ? (
        <svg
          className={styles.electricBorderSvg}
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter id="certseal-electric-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.8" result="softGlow" />
              <feGaussianBlur stdDeviation="4" result="wideGlow" />
              <feMerge>
                <feMergeNode in="wideGlow" />
                <feMergeNode in="softGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect className={styles.electricBasePath} x="3" y="3" width="94" height="134" rx="8" pathLength="100" />
          <rect className={styles.electricPulsePath} x="3" y="3" width="94" height="134" rx="8" pathLength="100" />
          <rect className={styles.electricSparkPath} x="3" y="3" width="94" height="134" rx="8" pathLength="100" />
        </svg>
      ) : null}

      <div className={styles.innerContainer}>
        <div className={styles.borderOuter}>
          <div className={styles.cardBody} />
          <div className={styles.mainCard} />
        </div>
        <div className={styles.glowLayerOne} />
        <div className={styles.glowLayerTwo} />
      </div>

      <div className={styles.overlayOne} />
      <div className={styles.overlayTwo} />
      <div className={styles.backgroundGlow} />

      <div className={styles.contentContainer}>
        <div className={styles.contentTop}>
          <div className={cn(styles.statusBadge, statusClassName[certificate.status])}>{certificate.status}</div>
          <p className={styles.title}>{certificate.certificateCode}</p>
        </div>

        <hr className={styles.divider} />

        <div className={styles.contentBottom}>
          <p className={styles.description}>{certificate.title}</p>
          <p className={styles.subtitle}>{certificate.description}</p>
        </div>
      </div>
    </article>
  )

  if (!href) {
    return card
  }

  return (
    <Link href={href} className={styles.cardLink}>
      {card}
    </Link>
  )
}
