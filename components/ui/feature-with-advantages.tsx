import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Report to Certificate Data",
    description: "Convert final report PDFs into structured digital certificate records.",
  },
  {
    title: "Company Smart Account",
    description: "Manage certificates through a company-level digital account, not individual wallets.",
  },
  {
    title: "Certificate SBT Issuance",
    description: "Issue non-transferable certificate SBTs bound to each company account.",
  },
  {
    title: "Verifiable Registry",
    description: "Anchor certificate hashes, signatures, and lifecycle status in a trusted registry.",
  },
  {
    title: "Public Verification",
    description: "Allow external parties to verify issuer, ownership, and current certificate status.",
  },
  {
    title: "PDF Output",
    description: "Generate human-readable PDF copies only when submission documents are needed.",
  },
]

function Feature() {
  return (
    <div className="w-full py-20 lg:py-0">
      <div className="container mx-auto px-4">
        <div className="flex gap-4 py-20 flex-col items-start lg:py-0">
          <div>
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">Platform</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-open-sans-custom text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
              Core Features
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-300 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
              Everything needed to issue, bind, and verify company-owned digital certificates.
            </p>
          </div>
          <div className="flex gap-10 pt-12 flex-col w-full">
            <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex w-full flex-row items-start gap-6">
                  <Check className="mt-2 h-[1.05rem] w-[1.05rem] shrink-0 text-white" strokeWidth={3} />
                  <div className="flex flex-col gap-1">
                    <p className="text-white font-open-sans-custom">{feature.title}</p>
                    <p className="text-sm text-gray-300 font-open-sans-custom">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Feature }
