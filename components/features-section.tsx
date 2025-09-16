import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, Zap, Users, Lock, Coins } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Escrow",
    description:
      "Smart contracts on Algorand ensure your funds are protected and automatically released according to your terms.",
  },
  {
    icon: Clock,
    title: "Time-Lock Functionality",
    description:
      "Set specific dates and times for fund release. Perfect for milestone-based payments and savings goals.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Create escrow contracts in minutes with our intuitive interface. No technical knowledge required.",
  },
  {
    icon: Users,
    title: "Multi-Party Support",
    description: "Support for complex agreements between freelancers, clients, and multiple stakeholders.",
  },
  {
    icon: Lock,
    title: "Immutable Contracts",
    description: "Once created, contracts cannot be altered, ensuring complete trust and transparency.",
  },
  {
    icon: Coins,
    title: "Low Fees",
    description: "Benefit from Algorand's minimal transaction fees, making micro-payments economically viable.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need for secure time-locked payments
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Built on Algorand blockchain for maximum security, speed, and cost-effectiveness.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="rounded-lg bg-accent/10 p-3 w-fit">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
