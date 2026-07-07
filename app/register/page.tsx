"use client"

import { AuthLayout } from "@/components/auth/auth-layout"
import { RegisterForm } from "@/components/auth/register-form"
import { useStoredDictionary } from "@/components/auth/locale"

export default function RegisterPage() {
  const { dictionary } = useStoredDictionary()

  return (
    <AuthLayout content={dictionary.auth.common}>
      <RegisterForm content={dictionary.auth} />
    </AuthLayout>
  )
}
