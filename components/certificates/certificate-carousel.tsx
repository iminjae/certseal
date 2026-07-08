"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CertificateSbtCard } from "@/components/certificates/certificate-sbt-card"
import { cn } from "@/lib/utils"
import type { MockCertificate } from "@/lib/mock-certificates"
import "./certificate-keyboard-controller.css"

type CertificateCarouselProps = {
  certificates: MockCertificate[]
  labels: {
    previous: string
    next: string
    viewCertificate: string
  }
}

const visibleDepth = 2

export function CertificateCarousel({ certificates, labels }: CertificateCarouselProps) {
  const initialIndex = Math.floor(certificates.length / 2)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [activeKey, setActiveKey] = useState<"a" | "d" | null>(null)
  const lastActionTimeRef = useRef(0)

  const lastIndex = certificates.length - 1
  const throttleDelay = 100

  const previous = useCallback(() => {
    setActiveIndex((currentIndex) => Math.max(0, currentIndex - 1))
  }, [])

  const next = useCallback(() => {
    setActiveIndex((currentIndex) => Math.min(lastIndex, currentIndex + 1))
  }, [lastIndex])

  useEffect(() => {
    setActiveIndex(Math.floor(certificates.length / 2))
  }, [certificates.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now()
      if (now - lastActionTimeRef.current < throttleDelay) return

      const target = event.target as HTMLElement | null
      const isEditableTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        Boolean(target?.isContentEditable)

      if (isEditableTarget || event.metaKey || event.ctrlKey || event.altKey) return

      const key = event.key.toLowerCase()
      const code = event.code

      if (key === "a" || code === "KeyA") {
        event.preventDefault()
        lastActionTimeRef.current = now
        setActiveKey("a")
        previous()
      }

      if (key === "d" || code === "KeyD") {
        event.preventDefault()
        lastActionTimeRef.current = now
        setActiveKey("d")
        next()
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      const code = event.code
      if (key === "a" || key === "d" || code === "KeyA" || code === "KeyD") {
        setActiveKey(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [next, previous])

  const carouselItems = useMemo(() => {
    return certificates.map((certificate, index) => {
      const offset = index - activeIndex
      const absOffset = Math.abs(offset)
      const isVisible = absOffset <= visibleDepth
      const translateX = offset * 190
      const rotateY = offset === 0 ? 0 : offset < 0 ? 34 : -34
      const scale = offset === 0 ? 1 : absOffset === 1 ? 0.82 : 0.66
      const translateZ = offset === 0 ? 130 : absOffset === 1 ? 18 : -120
      const opacity = isVisible ? (offset === 0 ? 1 : absOffset === 1 ? 0.72 : 0.38) : 0

      return {
        certificate,
        index,
        isVisible,
        isActive: offset === 0,
        style: {
          transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
          opacity,
          zIndex: 50 - absOffset,
          pointerEvents: isVisible ? ("auto" as const) : ("none" as const),
        },
      }
    })
  }, [activeIndex, certificates])

  if (!certificates.length) return null

  return (
    <div className="relative">
      <div className="relative mx-auto h-[440px] w-full overflow-hidden [perspective:1500px] sm:h-[500px]">
        <div className="absolute left-1/2 top-8 h-[380px] w-[280px] -translate-x-1/2 [transform-style:preserve-3d] sm:h-[430px] sm:w-[320px]">
          {carouselItems.map(({ certificate, index, isActive, isVisible, style }) => (
            <div
              key={certificate.id}
              role="button"
              tabIndex={0}
              aria-label={`Select Certificate SBT #${certificate.tokenId}`}
              aria-current={isActive}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setActiveIndex(index)
                }
              }}
              className={cn(
                "absolute inset-0 cursor-pointer text-left transition-[transform,opacity,filter] duration-500 ease-out [transform-style:preserve-3d]",
                isActive ? "blur-0" : "hover:opacity-90",
                !isVisible && "invisible",
              )}
              style={style}
            >
              <CertificateSbtCard certificate={certificate} isActive={isActive} viewLabel={labels.viewCertificate} />
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={previous}
          disabled={activeIndex === 0}
          aria-label={labels.previous}
          className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 hover:text-white disabled:opacity-30 sm:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={next}
          disabled={activeIndex === lastIndex}
          aria-label={labels.next}
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 hover:text-white disabled:opacity-30 sm:inline-flex"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="certificate-keyboard-wrapper">
        <div className="certificate-keyboard">
          <button
            className="certificate-keyboard__key certificate-keyboard__key--meta certificate-keyboard__key--disabled certificate-keyboard__key--hidden"
            type="button"
            data-key="cmd"
            disabled
          >
            <span className="certificate-keyboard__key-lines">
              <svg
                className="certificate-keyboard__cmd certificate-keyboard__key-line--tr"
                viewBox="0 0 16 16"
                width="16px"
                height="16px"
                aria-hidden="true"
              >
                <path
                  fill="none"
                  stroke="currentcolor"
                  strokeWidth="2"
                  d="M5.7,10.3v2.3c0,1.3-1,2.3-2.3,2.3S1,14,1,12.7s1-2.3,2.3-2.3H5.7z M5.7,10.3h4.7 M5.7,10.3V5.7M10.3,10.3v2.3c0,1.3,1,2.3,2.3,2.3s2.3-1,2.3-2.3s-1-2.3-2.3-2.3H10.3z M10.3,10.3V5.7 M10.3,5.7H5.7 M10.3,5.7V3.3c0-1.3,1-2.3,2.3-2.3S15,2,15,3.3s-1,2.3-2.3,2.3H10.3z M5.7,5.7V3.3C5.7,2,4.6,1,3.3,1S1,2,1,3.3s1,2.3,2.3,2.3H5.7z"
                />
              </svg>
              <small className="certificate-keyboard__key-line certificate-keyboard__key-line--small certificate-keyboard__key-line--br">
                command
              </small>
            </span>
          </button>

          <button
            className={cn("certificate-keyboard__key certificate-keyboard__key--wide", activeKey === "a" && "active")}
            type="button"
            data-key="a"
            onClick={previous}
            title={`${labels.previous} (A)`}
            aria-label={`${labels.previous} (A)`}
          >
            <span className="certificate-keyboard__key-lines">
              <span className="certificate-keyboard__key-line">A</span>
              <small className="certificate-keyboard__key-hint">prev</small>
            </span>
          </button>

          <button
            className={cn("certificate-keyboard__key certificate-keyboard__key--wide", activeKey === "d" && "active")}
            type="button"
            data-key="d"
            onClick={next}
            title={`${labels.next} (D)`}
            aria-label={`${labels.next} (D)`}
          >
            <span className="certificate-keyboard__key-lines">
              <span className="certificate-keyboard__key-line">D</span>
              <small className="certificate-keyboard__key-hint">next</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
