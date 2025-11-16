'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Moroccan Internship Platform
            </h3>
            <p className="text-sm opacity-90">
              Empowering Moroccan students to find the right internships,
              effortlessly.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="opacity-90 hover:opacity-100 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="opacity-90 hover:opacity-100 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="opacity-90 hover:opacity-100 transition"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="opacity-90 hover:opacity-100 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="opacity-90 hover:opacity-100 transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm opacity-90 mb-3">
              Subscribe for new internship alerts.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md px-3 py-2 text-primary bg-white/90 border border-transparent focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button variant="secondary" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-75">
          © {new Date().getFullYear()} Moroccan Internship Platform. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
