import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminHome() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <section className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Internships</CardTitle></CardHeader>
          <CardContent>Manage postings</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Users</CardTitle></CardHeader>
          <CardContent>Manage accounts</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Analytics</CardTitle></CardHeader>
          <CardContent>Basic metrics</CardContent>
        </Card>
      </section>
    </main>
  );
}