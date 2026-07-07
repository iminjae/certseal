"use client"

import { AuthLayout } from "@/components/auth/auth-layout"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { useStoredDictionary } from "@/components/auth/locale"

export default function ForgotPasswordPage() {
  const { dictionary } = useStoredDictionary()

  return (
    <AuthLayout content={dictionary.auth.common}>
      <ForgotPasswordForm content={dictionary.auth} />
    </AuthLayout>
  )
}
