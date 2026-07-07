"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Check, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Dictionary } from "@/lib/i18n"

type ForgotPasswordFormProps = {
  content: Dictionary["auth"]
}

export function ForgotPasswordForm({ content }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSent(true)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-white font-open-sans-custom">
          {isSent ? content.forgot.successTitle : content.forgot.title}
        </h1>
        <p className="text-sm leading-6 text-white/70 font-open-sans-custom">
          {isSent ? content.forgot.successDescription : content.forgot.subtitle}
        </p>
      </div>

      {isSent ? (
        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center text-white">
          <Check className="mx-auto mb-3 h-7 w-7" />
          <Link href="/login" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
            {content.forgot.back}
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="text-white/90">
              {content.forgot.email}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 rounded-xl border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/45 focus-visible:border-white/40 focus-visible:ring-white/20"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            {content.forgot.submit}
          </Button>
        </form>
      )}

      {!isSent ? (
        <div className="text-center">
          <Link href="/login" className="text-sm text-white/70 transition-colors hover:text-white">
            {content.forgot.back}
          </Link>
        </div>
      ) : null}
    </div>
  )
}
