import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Freelance Developer",
    content:
      "TimeLockBox has revolutionized how I handle client payments. No more chasing invoices - everything is automated and secure.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Digital Agency Owner",
    content:
      "The time-lock feature is perfect for milestone-based projects. Our clients love the transparency and security.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Savings Enthusiast",
    content:
      "I use TimeLockBox for my savings goals. It prevents me from spending impulsively and helps me reach my targets.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Trusted by thousands of users
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            See what our community says about TimeLockBox.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4">"{testimonial.content}"</blockquote>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
