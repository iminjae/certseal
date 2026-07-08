export type MockSession = {
  email: string
  companyName: string
  companySmartAccount: string
  isAuthenticated: true
}

export const mockSessionStorageKey = "certseal-mock-session"

export function createMockCompanySmartAccount() {
  const start = Math.random().toString(16).slice(2, 6).toUpperCase()
  const end = Math.random().toString(16).slice(2, 6).toUpperCase()
  return `0xA1B2${start}...${end}C9D0`
}

export function signIn(email: string) {
  const session: MockSession = {
    email,
    companyName: "A Company",
    companySmartAccount: createMockCompanySmartAccount(),
    isAuthenticated: true,
  }

  window.localStorage.setItem(mockSessionStorageKey, JSON.stringify(session))
  return session
}

export function signUp({
  email,
  companyName,
}: {
  email: string
  companyName: string
}) {
  const session: MockSession = {
    email,
    companyName,
    companySmartAccount: createMockCompanySmartAccount(),
    isAuthenticated: true,
  }

  window.localStorage.setItem(mockSessionStorageKey, JSON.stringify(session))
  return session
}

export function signOut() {
  window.localStorage.removeItem(mockSessionStorageKey)
}

export function getMockSession() {
  const rawSession = window.localStorage.getItem(mockSessionStorageKey)
  if (!rawSession) return null

  try {
    const session = JSON.parse(rawSession) as MockSession
    return session.isAuthenticated ? session : null
  } catch {
    return null
  }
}
