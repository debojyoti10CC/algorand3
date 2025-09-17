"use client"

import { useState } from 'react'
import { useWallet } from "@/contexts/WalletContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Wallet, Briefcase, Plus, Search, Clock, CheckCircle } from "lucide-react"

type Job = {
  id: string
  title: string
  description: string
  budget: number
  status: 'open' | 'in-progress' | 'completed'
  client: string
  freelancer?: string
}

export default function DashboardPage() {
  const { isConnected, walletAddress, disconnectWallet } = useWallet()
  const [activeTab, setActiveTab] = useState<'client' | 'freelancer'>('client')
  const [jobs, setJobs] = useState<Job[]>([])
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    budget: ''
  })

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
        <p className="text-muted-foreground mb-6">Please connect your wallet to view your dashboard</p>
        <a href="/">
          <Button>Go to Homepage</Button>
        </a>
      </div>
    )
  }

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault()
    if (!walletAddress) return
    
    const job: Job = {
      id: Date.now().toString(),
      title: newJob.title,
      description: newJob.description,
      budget: parseFloat(newJob.budget),
      status: 'open',
      client: walletAddress
    }
    
    setJobs([...jobs, job])
    setNewJob({ title: '', description: '', budget: '' })
    // TODO: Call smart contract to create job and lock funds
  }

  const handleAcceptJob = (jobId: string) => {
    if (!walletAddress) return
    
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: 'in-progress', freelancer: walletAddress }
        : job
    ))
    // TODO: Call smart contract to accept job
  }

  const handleCompleteJob = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: 'completed' }
        : job
    ))
    // TODO: Call smart contract to release funds
  }

  const availableJobs = jobs.filter(job => job.status === 'open')
  const myJobs = jobs.filter(job => 
    job.client === walletAddress || job.freelancer === walletAddress
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Freelance Platform</h1>
          <p className="text-muted-foreground">
            {activeTab === 'client' ? 'Post jobs and manage your projects' : 'Find work and get paid'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <div className="flex items-center px-3 py-1.5 text-sm rounded-full bg-muted">
            <Wallet className="h-4 w-4 mr-2" />
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
          </div>
          <Button variant="outline" size="sm" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="client" 
        className="space-y-4"
        onValueChange={(value) => setActiveTab(value as 'client' | 'freelancer')}
      >
        <TabsList>
          <TabsTrigger value="client">I'm a Client</TabsTrigger>
          <TabsTrigger value="freelancer">I'm a Freelancer</TabsTrigger>
        </TabsList>

        <TabsContent value="client" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post a New Job</CardTitle>
              <CardDescription>
                Create a new job posting. Funds will be held in escrow until the job is completed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateJob} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Job Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g. Web Developer Needed"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Job Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe the job in detail..."
                    rows={4}
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="budget" className="block text-sm font-medium mb-1">
                    Budget (ALGO)
                  </label>
                  <Input
                    id="budget"
                    type="number"
                    step="0.1"
                    min="1"
                    placeholder="10.0"
                    value={newJob.budget}
                    onChange={(e) => setNewJob({...newJob, budget: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Post Job
                </Button>
              </form>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-medium mb-4">My Jobs</h3>
            {myJobs.length === 0 ? (
              <div className="text-center py-8 border rounded-lg">
                <p className="text-muted-foreground">You haven't posted any jobs yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myJobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {job.status === 'open' && 'Looking for freelancer'}
                            {job.status === 'in-progress' && 'In progress'}
                            {job.status === 'completed' && 'Completed'}
                          </p>
                        </div>
                        <span className="font-medium">{job.budget} ALGO</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                      {job.status === 'in-progress' && job.client === walletAddress && (
                        <Button 
                          size="sm" 
                          onClick={() => handleCompleteJob(job.id)}
                        >
                          Mark as Completed
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="freelancer" className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-9"
              // Add search functionality here
            />
          </div>

          <h3 className="text-lg font-medium">Available Jobs</h3>
          {availableJobs.length === 0 ? (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">No jobs available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableJobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Posted by: {job.client.slice(0, 8)}...{job.client.slice(-4)}
                        </p>
                      </div>
                      <span className="font-medium">{job.budget} ALGO</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                    <Button 
                      size="sm" 
                      onClick={() => handleAcceptJob(job.id)}
                    >
                      Accept Job
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">My Jobs</h3>
            {myJobs.filter(job => job.freelancer === walletAddress).length === 0 ? (
              <div className="text-center py-8 border rounded-lg">
                <p className="text-muted-foreground">You don't have any active jobs.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myJobs
                  .filter(job => job.freelancer === walletAddress)
                  .map((job) => (
                    <Card key={job.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Status: {job.status === 'in-progress' ? 'In Progress' : 'Completed'}
                            </p>
                          </div>
                          <span className="font-medium">{job.budget} ALGO</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{job.description}</p>
                        {job.status === 'in-progress' && (
                          <div className="mt-4 flex justify-end">
                            <Button 
                              size="sm" 
                              onClick={() => handleCompleteJob(job.id)}
                            >
                              Mark as Completed
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
