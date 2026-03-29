import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

interface HeaderProps {
  variant?: 'light' | 'dark'
}

const otherNavLinks = [
  { name: "Portfolio", href: "/#portfolio", route: false },
  { name: "About", href: "/#about", route: false },
  { name: "Meet The Team", href: "/team", route: true },
  { name: "Free Grader", href: "/website-grader", route: true },
  { name: "Contact", href: "/#contact", route: false },
]

export function Header({ variant = 'light' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isDark = variant === 'dark'
  const headerBg = isDark ? 'rgba(15,23,42,0.85)' : undefined
  const textClass = isDark ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'
  const logoTextClass = isDark ? 'text-white' : 'text-foreground'
  const borderClass = isDark ? 'border-white/10' : 'border-border'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b ${borderClass} ${isDark ? '' : 'bg-background/80'}`}
      style={isDark ? { background: headerBg } : undefined}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">E&F</span>
            </div>
            <span className={`font-semibold text-lg hidden sm:block ${logoTextClass}`}>
              Echols &amp; French
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Services dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center gap-1 text-sm transition-colors ${textClass}`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-200"
                  style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 rounded-xl shadow-xl border border-border bg-background overflow-hidden z-50">
                  <a
                    href="/#services"
                    className="flex items-center px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    Website Design
                  </a>
                  <Link
                    to="/ai-agents"
                    className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    AI Agents
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ background: '#3b82f6' }}
                    >
                      NEW
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {otherNavLinks.map((link) =>
              link.route ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm transition-colors ${textClass}`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-colors ${textClass}`}
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="/#contact">
              <Button size="sm" className="rounded-lg">
                Get Free Audit
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-foreground'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${borderClass}`}>
            <nav className="flex flex-col gap-2">
              {/* Services accordion in mobile */}
              <div>
                <button
                  className={`w-full flex items-center justify-between py-2 text-left font-medium transition-colors ${isDark ? 'text-white/80 hover:text-white' : 'text-foreground hover:text-primary'}`}
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services
                  <ChevronDown
                    className="h-4 w-4 transition-transform duration-200"
                    style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 flex flex-col gap-2 mt-1">
                    <a
                      href="/#services"
                      className={`text-sm py-1.5 transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Website Design
                    </a>
                    <Link
                      to="/ai-agents"
                      className={`text-sm py-1.5 flex items-center gap-2 transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      AI Agents
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                        style={{ background: '#3b82f6' }}
                      >
                        NEW
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              {otherNavLinks.map((link) =>
                link.route ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`font-medium transition-colors ${isDark ? 'text-white/80 hover:text-white' : 'text-foreground hover:text-primary'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`font-medium transition-colors ${isDark ? 'text-white/80 hover:text-white' : 'text-foreground hover:text-primary'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}
              <a href="/#contact" className="block mt-4">
                <Button className="w-full">Get Free Audit</Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
