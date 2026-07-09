"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, ChevronDown } from "lucide-react"

import { signOut, type MockSession } from "@/lib/mock-auth"
import { cn } from "@/lib/utils"

type AccountMenuProps = {
  session: MockSession
  labels: {
    myPage: string
    signOut: string
  }
}

export function AccountMenu({ session, labels }: AccountMenuProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  const handleMyPage = () => {
    setIsOpen(false)
    router.push("/mypage")
  }

  const handleSignOut = () => {
    signOut()
    setIsOpen(false)
    router.push("/")
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={cn(
          "inline-flex h-10 max-w-[180px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors",
          "hover:bg-white/[0.18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 sm:max-w-none sm:px-4",
        )}
      >
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.12]">
          <Building2 className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0 truncate">{session.companyName}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl border border-white/16 bg-black/45 p-1.5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleMyPage}
            className="flex w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/82 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            {labels.myPage}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-white/72 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            {labels.signOut}
          </button>
        </div>
      ) : null}
    </div>
  )
}
