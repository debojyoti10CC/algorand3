import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Connect Your Wallet",
    description: "Connect your Lute wallet to access the Algorand blockchain securely.",
  },
  {
    step: "02",
    title: "Create Contract",
    description: "Set up your escrow terms: amount, recipients, and time-lock conditions.",
  },
  {
    step: "03",
    title: "Fund & Deploy",
    description: "Fund your contract and deploy it to the Algorand blockchain.",
  },
  {
    step: "04",
    title: "Automatic Release",
    description: "Funds are automatically released when time conditions are met.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            How TimeLockBox Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Simple, secure, and automated. Get started in four easy steps.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-border/50">
                <CardHeader>
                  <div className="text-4xl font-bold text-accent mb-2">{step.step}</div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{step.description}</CardDescription>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-accent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
