"use client"

import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Feature } from "@/components/ui/feature-with-advantages"
import { ContactCard } from "@/components/ui/contact-card"
import { AboutQuote } from "@/components/ui/about-quote"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { defaultLocale, dictionaries, isLocale, localeStorageKey, type Locale } from "@/lib/i18n"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const trustSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)
  const t = dictionaries[locale]

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeStorageKey)
    if (isLocale(storedLocale)) {
      setLocale(storedLocale)
    }
  }, [])

  const handleLocaleChange = (nextLocale: Locale) => {
    setLocale(nextLocale)
    window.localStorage.setItem(localeStorageKey, nextLocale)
  }

  const goToLogin = () => {
    window.location.href = "/login"
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY
      const currentScroll = scrollContainer.scrollLeft
      const containerWidth = scrollContainer.offsetWidth
      const currentSection = Math.round(currentScroll / containerWidth)

      const handleScrollableSection = (
        section: HTMLDivElement | null,
        sectionIndex: number,
        previousIndex: number,
        nextIndex: number,
      ) => {
        if (currentSection !== sectionIndex || !section) return false

        const isAtTop = section.scrollTop === 0
        const isAtBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return true
        }

        if (delta < 0 && !isAtTop) {
          return true
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: previousIndex * containerWidth,
            behavior: "smooth",
          })
          return true
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: nextIndex * containerWidth,
            behavior: "smooth",
          })
          return true
        }

        return false
      }

      if (handleScrollableSection(trustSectionRef.current, 2, 1, 3)) {
        return
      }

      if (handleScrollableSection(aboutSectionRef.current, 3, 2, 4)) {
        return
      }

      if (handleScrollableSection(contactSectionRef.current, 4, 3, 4)) {
        return
      }

      e.preventDefault()

      if (Math.abs(delta) > 10) {
        let targetSection = currentSection
        if (delta > 0) {
          targetSection = Math.min(currentSection + 1, 4)
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

      <FloatingNavbar content={t.nav} locale={locale} onLocaleChange={handleLocaleChange} />

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
                {locale === "en" ? (
                  <>
                    <span className="font-open-sans-custom not-italic">Certify.</span>{" "}
                    <span className="font-serif italic">Bind.</span>{" "}
                    <span className="font-open-sans-custom not-italic">Verify.</span>
                  </>
                ) : (
                  <span className="font-open-sans-custom not-italic">{t.hero.title}</span>
                )}
              </h1>

              <p className="mx-auto mb-8 max-w-3xl text-pretty text-lg font-thin leading-8 tracking-wide text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom md:text-xl">
                {t.hero.subtitle}
              </p>

              <div className="flex justify-center">
                <ShinyButton className="px-8 py-3 text-base" onClick={goToLogin}>
                  {t.hero.cta}
                </ShinyButton>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {t.heroFlow.map((item) => (
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
            <Feature content={t.features} />
          </div>
        </section>

        <section
          id="trust"
          ref={trustSectionRef}
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

          <div className="relative z-10 mx-auto flex min-h-full w-full max-w-7xl items-center">
            <div className="w-full">
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                  {t.trust.layerTitle}
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom md:text-lg">
                  {t.trust.layerDescription}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {t.trust.cards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-lg border border-white/15 bg-white/[0.08] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl"
                  >
                    <h2 className="mb-3 text-base font-semibold text-white [text-shadow:_0_2px_10px_rgb(0_0_0_/_45%)] font-open-sans-custom">
                      {card.title}
                    </h2>
                    <p className="text-sm leading-6 text-gray-300 [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]">
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
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
                {t.trust.topTitle}
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                {t.trust.topSubtitle}
              </p>
            </div>
            <AboutQuote content={t.trust} />
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
              title={t.contact.title}
              description={t.contact.description}
              contactInfo={[
                {
                  icon: MailIcon,
                  label: t.contact.info.email,
                  value: t.contact.info.emailValue,
                },
                {
                  icon: PhoneIcon,
                  label: t.contact.info.phone,
                  value: t.contact.info.phoneValue,
                },
                {
                  icon: MapPinIcon,
                  label: t.contact.info.address,
                  value: t.contact.info.addressValue,
                  className: "col-span-2",
                },
              ]}
            >
              <form action="" className="w-full space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    {t.contact.name}
                  </Label>
                  <Input
                    type="text"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    {t.contact.email}
                  </Label>
                  <Input
                    type="email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    {t.contact.phone}
                  </Label>
                  <Input
                    type="tel"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    {t.contact.message}
                  </Label>
                  <Textarea className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]" />
                </div>
                <Button
                  className="w-full bg-white text-black hover:bg-gray-100 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)] font-open-sans-custom"
                  type="button"
                >
                  {t.contact.submit}
                </Button>
              </form>
            </ContactCard>
          </div>
        </section>
      </div>
    </main>
  )
}
