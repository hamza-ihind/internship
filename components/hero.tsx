import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-muted/20">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Find Your Next Internship in Morocco
          </h1>
          <p className="mt-6 text-lg md:text-xl text-secondary">
            One platform to discover, filter, and apply for internships across the kingdom. Built for Moroccan students, powered by AI.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg">Browse Internships</Button>
            </Link>
            <Link href="#about">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}