'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Crown, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Simple & Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Perfect Plan
            </h1>
            <p className="text-lg text-muted-foreground">
              Start for free and upgrade when you're ready. No hidden fees, no
              surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <Card className="border-2 relative hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-8 pt-8">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">0 DH</span>
                  <span className="text-muted-foreground">/forever</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  Current Plan
                </Badge>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <Button
                  variant="outline"
                  className="w-full mb-6"
                  size="lg"
                  disabled
                >
                  Your Current Plan
                </Button>

                <div className="space-y-4">
                  <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    What's Included:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Browse all available internships
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Apply to up to <strong>3 internships per month</strong>
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Basic profile creation</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Email notifications for application status
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Standard search filters</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Priority application review
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        AI-powered CV builder
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Interview preparation tools
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Personalized internship recommendations
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        Dedicated support
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Tier */}
            <Card className="border-2 border-primary relative hover:shadow-xl transition-shadow">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-lg">
                  ⭐ Most Popular
                </Badge>
              </div>

              <CardHeader className="text-center pb-8 pt-12">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Crown className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">200 DH</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Billed monthly, cancel anytime
                </p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <Button className="w-full mb-6" size="lg">
                  Upgrade to Pro
                </Button>

                <div className="space-y-4">
                  <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Everything in Free, Plus:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Unlimited</strong> internship applications
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Priority application review</strong> - your
                        applications seen first
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>AI-powered CV builder</strong> with professional
                        templates
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Interview preparation tools</strong> - practice
                        questions & tips
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Personalized internship recommendations</strong>{' '}
                        based on your profile
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Advanced search & filters</strong> - save
                        searches and get alerts
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Application tracking dashboard</strong> with
                        analytics
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Early access</strong> to new internships (24h
                        before free users)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Profile badge</strong> showing you're a Pro
                        member
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Dedicated email support</strong> with priority
                        response
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Access to exclusive webinars and career workshops
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    Can I cancel my Pro subscription anytime?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! You can cancel your Pro subscription at any time. Your
                    Pro features will remain active until the end of your
                    billing period, and you'll automatically revert to the Free
                    plan.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, debit cards, and mobile
                    payment methods common in Morocco. All payments are
                    processed securely.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    Is there a student discount?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Currently, our Pro plan is already priced affordably for
                    students. However, we occasionally run special promotions.
                    Follow us on social media or subscribe to our newsletter to
                    stay updated!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    What happens to my applications if I downgrade?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    All your existing applications and data remain safe. If you
                    downgrade to Free, you'll keep access to everything you've
                    done, but you'll be limited to 3 new applications per month
                    going forward.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">
                    Do companies see my membership level?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Companies don't see whether you're on Free or Pro. However,
                    Pro members do get priority in the application queue,
                    meaning companies see your application earlier, which can
                    increase your chances of being noticed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary bg-primary/5 max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <Crown className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to boost your internship search?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of students who have already upgraded to Pro and
                landed their dream internships faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  Upgrade to Pro Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  asChild
                >
                  <Link href="/internships">Browse Internships</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
