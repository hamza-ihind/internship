import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Student Dashboard</h1>
      <section className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Browse Internships</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-4">Use filters to find relevant internships.</p>
            <Button>Open Finder</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Applications</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-4">Track your application statuses.</p>
            <Button>View Applications</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Upgrade to PRO</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-4">Unlock AI suggestions and unlimited applications.</p>
            <Button>Upgrade</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}