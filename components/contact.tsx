'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Contact Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-secondary">
            Have questions or need support? Reach out to us and we’ll get back
            to you quickly.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-muted/40">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-secondary">
                  support@moroccaninternship.ma
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-secondary">+212 5 22 22 22 22</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-secondary">Casablanca, Morocco</span>
              </div>
            </CardContent>
          </Card>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-md border border-muted/60 p-3 text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-md border border-muted/60 p-3 text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full rounded-md border border-muted/60 p-3 text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
