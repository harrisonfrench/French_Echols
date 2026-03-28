import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Globe, Mail, Building, Loader2 } from "lucide-react"
import { api } from "@/lib/api"

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    email: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await api.submitAuditRequest({
        business_name: formData.businessName,
        website: formData.website,
        email: formData.email,
      })
      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Value prop */}
          <div>
            <p className="text-primary font-medium mb-3">Free Website Audit</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
              Let's See What's Holding Your Website Back
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get a personalized analysis of your website's performance, design, and conversion potential.
              We'll show you exactly what's working and what could be improved.
            </p>

            {/* What you'll get */}
            <div className="space-y-4">
              {[
                "Performance & speed analysis",
                "Mobile responsiveness check",
                "Design & UX evaluation",
                "Conversion optimization tips",
                "Competitor comparison insights",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <Card className="p-8 shadow-xl border-0 bg-background">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    Request Your Free Audit
                  </h3>
                  <p className="text-muted-foreground">
                    Takes 30 seconds. No commitment required.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      name="businessName"
                      placeholder="Business Name"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      name="website"
                      type="url"
                      placeholder="Your Website URL"
                      value={formData.website}
                      onChange={handleChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full h-12 text-base rounded-xl shadow-lg shadow-primary/25"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My Free Audit
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  We'll review your site and send recommendations within 48 hours.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Request Received!
                </h3>
                <p className="text-muted-foreground mb-6">
                  We'll analyze your website and send a detailed report to{" "}
                  <span className="font-medium text-foreground">{formData.email}</span>{" "}
                  within 48 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ businessName: "", website: "", email: "" })
                  }}
                >
                  Submit Another Request
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
