export type CertificateStatus = "Active" | "Expired" | "Revoked"

export type MockCertificate = {
  id: string
  tokenId: string
  title: string
  companyName: string
  status: CertificateStatus
  certificationType: string
  issuedAt: string
  expiresAt: string
  companySmartAccount: string
  trust: string[]
}

export const mockCertificates: MockCertificate[] = [
  {
    id: "cert-001",
    tokenId: "1001",
    title: "Software Functional Test Certificate",
    companyName: "A Company",
    status: "Active",
    certificationType: "Software Test",
    issuedAt: "2026-07-07",
    expiresAt: "2027-07-07",
    companySmartAccount: "0xA1B2C3D4E5F60718293A4B5C6D7E8F9012345678",
    trust: ["SBT Bound", "VC Signed", "Registry Anchored"],
  },
  {
    id: "cert-002",
    tokenId: "1002",
    title: "KC Certification Support Result",
    companyName: "A Company",
    status: "Active",
    certificationType: "KC Support",
    issuedAt: "2026-07-01",
    expiresAt: "2027-07-01",
    companySmartAccount: "0xA1B2C3D4E5F60718293A4B5C6D7E8F9012345678",
    trust: ["SBT Bound", "VC Signed", "Registry Anchored"],
  },
  {
    id: "cert-003",
    tokenId: "1003",
    title: "Security Review Certificate",
    companyName: "A Company",
    status: "Expired",
    certificationType: "Security Review",
    issuedAt: "2025-06-12",
    expiresAt: "2026-06-12",
    companySmartAccount: "0xA1B2C3D4E5F60718293A4B5C6D7E8F9012345678",
    trust: ["SBT Bound", "VC Signed", "Registry Anchored"],
  },
  {
    id: "cert-004",
    tokenId: "1004",
    title: "Quality Inspection Certificate",
    companyName: "A Company",
    status: "Revoked",
    certificationType: "Quality Inspection",
    issuedAt: "2026-05-10",
    expiresAt: "2027-05-10",
    companySmartAccount: "0xA1B2C3D4E5F60718293A4B5C6D7E8F9012345678",
    trust: ["SBT Bound", "VC Signed", "Registry Anchored"],
  },
  {
    id: "cert-005",
    tokenId: "1005",
    title: "Digital Report Verification",
    companyName: "A Company",
    status: "Active",
    certificationType: "Report Verification",
    issuedAt: "2026-07-08",
    expiresAt: "2027-07-08",
    companySmartAccount: "0xA1B2C3D4E5F60718293A4B5C6D7E8F9012345678",
    trust: ["SBT Bound", "VC Signed", "Registry Anchored"],
  },
]

export function shortenAddress(address: string) {
  if (address.length <= 14) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function getMockCertificateById(id: string) {
  return mockCertificates.find((certificate) => certificate.id === id)
}
