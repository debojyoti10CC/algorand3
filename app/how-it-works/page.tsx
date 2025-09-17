import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, FileText, ArrowRight, AlertCircle, Lock, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HowItWorks() {
  const problems = [
    {
      title: "The Payment Problem",
      description: "Freelancers often face non-payment after delivering work, while clients risk paying for undelivered or subpar work.",
      icon: <Shield className="h-6 w-6 text-destructive" />
    },
    {
      title: "The Trust Gap",
      description: "Without proper safeguards, both parties are vulnerable to scams and dishonest behavior.",
      icon: <AlertCircle className="h-6 w-6 text-destructive" />
    }
  ]

  const solutions = [
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "1. Secure Escrow",
      description: "Client funds are locked in a smart contract before work begins, ensuring money is available but not released until work is approved."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "2. Clear Milestones",
      description: "Break projects into phases with specific deliverables and payments for each completed milestone."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "3. Protected Payments",
      description: "Freelancers get paid automatically when work is approved. Clients get refunds if work isn't delivered as agreed."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "4. Dispute Resolution",
      description: "Neutral mediators help resolve conflicts if work doesn't meet agreed standards."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Secure Freelancing with TimeLockBox</h1>
        <p className="text-xl text-muted-foreground">
          Eliminate payment risks for both clients and freelancers with blockchain-secured escrow
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-8">The Problems We Solve</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {problems.map((problem, index) => (
            <Card key={index} className="border-destructive/20">
              <CardHeader className="flex-row items-center gap-4">
                <div className="p-2 rounded-full bg-destructive/10">
                  {problem.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                  <p className="text-muted-foreground">{problem.description}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <h2 className="text-2xl font-semibold text-center mb-8">Our Solution</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {solution.icon}
                </div>
                <CardTitle className="text-xl">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{solution.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Ready to get started?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/projects">
            <Button size="lg" className="gap-2">
              Find Work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard?tab=create">
            <Button variant="outline" size="lg" className="gap-2">
              Post a Project
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
