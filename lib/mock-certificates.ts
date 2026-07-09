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
  issuerDid: string
  certificateDataHash: string
  vcHash: string
  registryTxHash: string
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
    issuerDid: "did:certseal:stanco:issuer:001",
    certificateDataHash: "0x8a1f2c9d4b6e73a10c54f8d2e91b0a46c7285f3d9b14e2a6c5f81709d3e2a114",
    vcHash: "0x4d2b7a81c6f90e23b45a1c9f6d83e10a72f5b4d9c0e3a681f27b5c9d408e6a12",
    registryTxHash: "0x7c34e2b89a6f10d45b3c8e9271a0f6d5c2b8490e31a76f4b8d9c102e6a53f1b7",
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
    issuerDid: "did:certseal:stanco:issuer:001",
    certificateDataHash: "0x2e94a63f1b8c705d9a4f326e81c0b57d3f69a2184c7e50b6d92f13a8c405e7b1",
    vcHash: "0x9b1c7e45a3f08d62c5b4a917e6d30f28c1a59b7e04d6c83f2a1b905e7c4d6a32",
    registryTxHash: "0x1a83d5f72c6e490b8f4a37d92e0c51b6a9f28e43c7d10b65a2f94c8e3d706b1a",
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
    issuerDid: "did:certseal:stanco:issuer:001",
    certificateDataHash: "0x5f1a8c30d7e24b69a3c0f82e91b4d65c7a029f3e6b8d14c50a7e92f6c3b481d2",
    vcHash: "0xc6e71a4b930f2d85a8c1e47b6d029f3a5b8e10c74d6f2a93c0b581e7d4a26f90",
    registryTxHash: "0x3d8b0a57e1f94c26b7a5e30d9f2c681b4e7a90c3d6f12b85a0e49c7d2f631b5e",
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
    issuerDid: "did:certseal:stanco:issuer:001",
    certificateDataHash: "0xa4c7e20b59d83f16e2a9b40c75f1d6e38b0a927c4e6f51d8a3b70c2f9e14d65b",
    vcHash: "0x6f20b9a4c83e157d2a0c6b91f4e38d75a2c9e01b6f5d847a3e2c109b6d4f85a7",
    registryTxHash: "0xe2a91c57b4f80d36a7c5e09b2f614d83c0a7e25f9b3d681c4e0f72a5b9d6c138",
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
    issuerDid: "did:certseal:stanco:issuer:001",
    certificateDataHash: "0xb7e51a0c63d94f28a5b1e70d9c3f6428e0a6d15c7b9f23e4a8c01d6b5f729e43",
    vcHash: "0x0d5e8a3c71f24b69e2a7c40f95b1d638c9e02a4f7b6d18c35e90f2a6b7c4d158",
    registryTxHash: "0xf4a70c2e9d1b8563e0a5c8f27b6d149c3e91a60f5b2d84c7e3a10b69d5f28c61",
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
