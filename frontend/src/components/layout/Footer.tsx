import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">E&F</span>
              </div>
              <span className="font-semibold text-lg">Echols & French</span>
            </div>
            <p className="text-background/70 mb-6 max-w-sm">
              Modern web design for growing businesses. We help you stand out online and convert visitors into customers.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-background/70">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Milledgeville, Georgia</span>
              </div>
              <div className="flex items-center gap-2 text-background/70">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@echolsfrench.com" className="text-sm hover:text-background transition-colors">
                  hello@echolsfrench.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-background/70">
                <Phone className="h-4 w-4" />
                <a href="tel:+1234567890" className="text-sm hover:text-background transition-colors">
                  (123) 456-7890
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#services" className="text-sm hover:text-background transition-colors">
                  Website Design
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm hover:text-background transition-colors">
                  Website Redesign
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm hover:text-background transition-colors">
                  Performance Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm hover:text-background transition-colors">
                  Conversion Optimization
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#portfolio" className="text-sm hover:text-background transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm hover:text-background transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm hover:text-background transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#audit" className="text-sm hover:text-background transition-colors">
                  Free Audit
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            &copy; {currentYear} Echols & French. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm text-background/50 hover:text-background/70 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-background/50 hover:text-background/70 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
