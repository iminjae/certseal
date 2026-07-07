"use client"

import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Feature } from "@/components/ui/feature-with-advantages"
import { BentoPricing } from "@/components/ui/bento-pricing"
import { ContactCard } from "@/components/ui/contact-card"
import { AboutQuote } from "@/components/ui/about-quote"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

const certificateFlow = [
  {
    step: "01",
    title: "Report PDF",
    description: "Upload the final report used as the source material.",
  },
  {
    step: "02",
    title: "Certificate Data",
    description: "Convert the report into structured digital certificate data.",
  },
  {
    step: "03",
    title: "Certificate SBT",
    description: "Issue a non-transferable certificate to the company smart account.",
  },
  {
    step: "04",
    title: "Public Verification",
    description: "Let external parties verify the certificate status, issuer, and ownership.",
  },
]

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY
      const currentScroll = scrollContainer.scrollLeft
      const containerWidth = scrollContainer.offsetWidth
      const currentSection = Math.round(currentScroll / containerWidth)

      if (currentSection === 2 && aboutSectionRef.current) {
        const aboutSection = aboutSectionRef.current
        const isAtTop = aboutSection.scrollTop === 0
        const isAtBottom = aboutSection.scrollTop + aboutSection.clientHeight >= aboutSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 1 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 3 * containerWidth,
            behavior: "smooth",
          })
          return
        }
      }

      if (currentSection === 3 && contactSectionRef.current) {
        const contactSection = contactSectionRef.current
        const isAtTop = contactSection.scrollTop === 0
        const isAtBottom = contactSection.scrollTop + contactSection.clientHeight >= contactSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 2 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          return
        }
      }

      e.preventDefault()

      if (Math.abs(delta) > 10) {
        let targetSection = currentSection
        if (delta > 0) {
          targetSection = Math.min(currentSection + 1, 3)
        } else {
          targetSection = Math.max(currentSection - 1, 0)
        }

        scrollContainer.scrollTo({
          left: targetSection * containerWidth,
          behavior: "smooth",
        })
      }
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    return () => scrollContainer.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <main className="relative h-screen overflow-hidden">
      <LiquidMetalBackground />

      <div className="fixed inset-0 z-[5] bg-black/50" />

      <FloatingNavbar />

      <div
        ref={scrollContainerRef}
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <section
          id="home"
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-28 pb-10 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="mx-auto flex min-h-full w-full max-w-7xl items-center">
            <div className="w-full text-center">
              <h1 className="mx-auto mb-8 max-w-5xl text-balance text-5xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] md:text-6xl lg:text-8xl">
                <span className="font-open-sans-custom not-italic">Certify.</span>{" "}
                <span className="font-serif italic">Bind.</span>{" "}
                <span className="font-open-sans-custom not-italic">Verify.</span>
              </h1>

              <p className="mx-auto mb-8 max-w-3xl text-pretty text-lg font-thin leading-8 tracking-wide text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom md:text-xl">
                Convert final report PDFs into verifiable digital certificates, bound to each company account as
                non-transferable SBTs.
              </p>

              <div className="flex justify-center">
                <ShinyButton className="px-8 py-3 text-base">Start Issuing</ShinyButton>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {certificateFlow.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-lg border border-white/15 bg-white/[0.08] p-5 text-left shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
                        {item.step}
                      </span>
                      <span className="h-px flex-1 bg-white/15" />
                    </div>
                    <h2 className="mb-3 text-lg font-semibold tracking-normal text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)] font-open-sans-custom">
                      {item.title}
                    </h2>
                    <p className="text-sm leading-6 text-gray-300 [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-7xl w-full">
            <Feature />
          </div>
        </section>

        <section
          id="pricing"
          aria-hidden="true"
          className="hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                Plans and Pricing
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Choose the perfect plan for your needs. From individual creators to enterprise teams, we have flexible
                pricing options to help you succeed.
              </p>
            </div>
            <BentoPricing />
          </div>
        </section>

        <section
          id="about"
          ref={aboutSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                About CertSeal
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                A new way to issue, own, and verify digital certificates.
              </p>
            </div>
            <AboutQuote />
          </div>
        </section>

        <section
          id="contact"
          ref={contactSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20"
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl mt-[5vh]">
            <ContactCard
              title="Get in touch"
              description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
              contactInfo={[
                {
                  icon: MailIcon,
                  label: "Email",
                  value: "contact@21st.dev",
                },
                {
                  icon: PhoneIcon,
                  label: "Phone",
                  value: "+92 312 1234567",
                },
                {
                  icon: MapPinIcon,
                  label: "Address",
                  value: "Faisalabad, Pakistan",
                  className: "col-span-2",
                },
              ]}
            >
              <form action="" className="w-full space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    Name
                  </Label>
                  <Input
                    type="text"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    Email
                  </Label>
                  <Input
                    type="email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    Phone
                  </Label>
                  <Input
                    type="tel"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    Message
                  </Label>
                  <Textarea className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]" />
                </div>
                <Button
                  className="w-full bg-white text-black hover:bg-gray-100 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)] font-open-sans-custom"
                  type="button"
                >
                  Submit
                </Button>
              </form>
            </ContactCard>
          </div>
        </section>
      </div>
    </main>
  )
}
