import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-muted/30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-primary">
          Moroccan Internship Platform
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#about" className="text-sm text-secondary hover:text-primary transition">About</Link>
          <Link href="#contact" className="text-sm text-secondary hover:text-primary transition">Contact</Link>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </nav>
        <div className="md:hidden">
          <Button variant="outline" size="sm">Menu</Button>
        </div>
      </div>
    </header>
  );
}