import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">About Us</h2>
          <p className="mt-4 max-w-2xl mx-auto text-secondary">
            We simplify internship hunting for Moroccan students by bringing opportunities from companies across the kingdom into one modern, AI-powered platform.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle className="text-primary">For Students</CardTitle>
            </CardHeader>
            <CardContent className="text-secondary">
              Sign up, upload your CV, and apply to internships with a single click. Get AI-driven suggestions and track your applications in real time.
            </CardContent>
          </Card>
          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle className="text-primary">For Companies</CardTitle>
            </CardHeader>
            <CardContent className="text-secondary">
              Post internships, review applications, and manage candidates through an intuitive admin dashboard designed for speed and clarity.
            </CardContent>
          </Card>
          <Card className="border-muted/40">
            <CardHeader>
              <CardTitle className="text-primary">Powered by AI</CardTitle>
            </CardHeader>
            <CardContent className="text-secondary">
              Receive instant CV analysis, smart internship matches, and auto-filled forms to save time and increase your chances of landing the right role.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}