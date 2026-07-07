"use client"

import { AuthLayout } from "@/components/auth/auth-layout"
import { LoginForm } from "@/components/auth/login-form"
import { useStoredDictionary } from "@/components/auth/locale"

export default function LoginPage() {
  const { dictionary } = useStoredDictionary()

  return (
    <AuthLayout content={dictionary.auth.common}>
      <LoginForm content={dictionary.auth} />
    </AuthLayout>
  )
}
