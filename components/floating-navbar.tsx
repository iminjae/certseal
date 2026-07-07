"use client"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"
import { defaultLocale, dictionaries, type Dictionary, type Locale } from "@/lib/i18n"

type FloatingNavbarProps = {
  content?: Dictionary["nav"]
  locale?: Locale
  onLocaleChange?: (locale: Locale) => void
}

export function FloatingNavbar({ content = dictionaries[defaultLocale].nav }: FloatingNavbarProps) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
    }
  }

  const goToLogin = () => {
    window.location.href = "/login"
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto max-w-7xl rounded-2xl border-2 border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollToSection("home")} className="cursor-pointer">
            <BrandLogo />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              {content.features}
            </button>
            <button
              onClick={() => scrollToSection("trust")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              {content.trust}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              {content.about}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-open-sans-custom text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              {content.contact}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-white text-black hover:bg-gray-100 [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)] font-open-sans-custom"
              onClick={goToLogin}
            >
              {content.startIssuing}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
