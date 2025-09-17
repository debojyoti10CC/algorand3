import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Briefcase, Search } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Work</h1>
          <p className="text-lg text-muted-foreground">Browse available projects and find your next freelance opportunity</p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No projects available yet</h2>
          <p className="text-muted-foreground mb-6">Check back later for new project listings or create your own project to get started.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard?tab=create">
              <Button className="gap-2">
                <Briefcase className="h-4 w-4" />
                Post a Project
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
