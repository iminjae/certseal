"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, Check, Lock, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthInfoBox } from "@/components/auth/auth-info-box"
import type { Dictionary } from "@/lib/i18n"
import { signUp } from "@/lib/mock-auth"

type RegisterFormProps = {
  content: Dictionary["auth"]
}

export function RegisterForm({ content }: RegisterFormProps) {
  const router = useRouter()
  const [workEmail, setWorkEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [managerName, setManagerName] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signUp({
      email: workEmail || "manager@company.com",
      companyName: companyName || "A Company",
      managerName: managerName || "Certificate Manager",
    })
    setSuccessMessage(content.common.smartAccountCreated)
    window.setTimeout(() => router.push("/dashboard"), 700)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-white font-open-sans-custom">{content.register.title}</h1>
        <p className="text-sm leading-6 text-white/70 font-open-sans-custom">{content.register.subtitle}</p>
      </div>

      {successMessage ? (
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-sm text-white">
          <Check className="mx-auto mb-2 h-5 w-5" />
          {successMessage}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          id="work-email"
          label={content.register.workEmail}
          type="email"
          value={workEmail}
          onChange={setWorkEmail}
          icon={<Mail className="h-4 w-4" />}
        />
        <AuthInput
          id="register-password"
          label={content.register.password}
          type="password"
          value={password}
          onChange={setPassword}
          icon={<Lock className="h-4 w-4" />}
        />
        <AuthInput
          id="company-name"
          label={content.register.companyName}
          value={companyName}
          onChange={setCompanyName}
          icon={<Building2 className="h-4 w-4" />}
        />
        <AuthInput
          id="manager-name"
          label={content.register.managerName}
          value={managerName}
          onChange={setManagerName}
          icon={<User className="h-4 w-4" />}
        />

        <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
          <p className="text-sm font-semibold text-white font-open-sans-custom">{content.register.smartAccountTitle}</p>
          <p className="mt-1 text-xs leading-5 text-white/65 font-open-sans-custom">
            {content.register.smartAccountDescription}
          </p>
          <p className="mt-2 text-xs leading-5 text-white/45 font-open-sans-custom">{content.register.technicalNote}</p>
        </div>

        <Button
          type="submit"
          className="h-11 w-full rounded-xl border border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          {content.register.submit}
        </Button>
      </form>

      <div className="space-y-4 text-center">
        <p className="text-sm text-white/70">
          {content.register.signInPrefix}{" "}
          <Link href="/login" className="font-medium text-white transition-colors hover:text-white/80">
            {content.register.signIn}
          </Link>
        </p>
      </div>

      <AuthInfoBox content={content.common} />
    </div>
  )
}

function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  icon,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  icon: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white/90">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">{icon}</span>
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 rounded-xl border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/45 focus-visible:border-white/40 focus-visible:ring-white/20"
          required
        />
      </div>
    </div>
  )
}
