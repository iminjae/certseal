"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthInfoBox } from "@/components/auth/auth-info-box"
import type { Dictionary } from "@/lib/i18n"
import { signIn } from "@/lib/mock-auth"

type LoginFormProps = {
  content: Dictionary["auth"]
}

export function LoginForm({ content }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    signIn(email || "company@company.com")
    router.push("/dashboard")
  }

  const handleGoogle = () => {
    signIn(email || "google-user@company.com")
    router.push("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-white font-open-sans-custom">{content.login.title}</h1>
        <p className="text-sm leading-6 text-white/70 font-open-sans-custom">{content.login.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/90">
            {content.login.email}
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 rounded-xl border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/45 focus-visible:border-white/40 focus-visible:ring-white/20"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white/90">
            {content.login.password}
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 rounded-xl border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/45 focus-visible:border-white/40 focus-visible:ring-white/20"
              required
            />
          </div>
        </div>

        <div className="text-right">
          <Link href="/forgot-password" className="text-sm text-white/70 transition-colors hover:text-white">
            {content.login.forgot}
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          {content.login.submit}
        </Button>

        <Button
          type="button"
          onClick={handleGoogle}
          variant="outline"
          className="h-11 w-full rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
        >
          {content.login.google}
        </Button>
      </form>

      <div className="space-y-4 text-center">
        <p className="text-sm text-white/70">
          {content.login.createPrefix}{" "}
          <Link href="/register" className="font-medium text-white transition-colors hover:text-white/80">
            {content.login.createAccount}
          </Link>
        </p>
        <p className="text-xs leading-5 text-white/55 font-open-sans-custom">{content.login.description}</p>
      </div>

      <AuthInfoBox content={content.common} />
    </div>
  )
}
