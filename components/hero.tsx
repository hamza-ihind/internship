import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge/Label */}
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  <Star className="w-3 h-3 mr-1.5" />
                  Morocco's #1 Internship Platform
                </Badge>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold font-sans">
                  Your Shortcut to{' '}
                  <span className="text-foreground">Internships</span> In
                  Morocco
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl text-muted-foreground dark:text-muted-foreground leading-relaxed max-w-2xl">
                  Find real, verified internships in seconds. tailored to your
                  field, your level, and your goals.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/internships">
                  <Button size="lg" variant="secondary">
                    Find Internships Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#about">
                  <Button variant="outline" size="lg">
                    Learn How It Works
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent border-2 border-background dark:border-foreground/20 flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 text-primary-foreground dark:text-primary-foreground" />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground dark:text-muted-foreground">
                  <span className="font-semibold text-secondary-foreground">
                    2,500+
                  </span>{' '}
                  students already found their dream internships
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image/Illustration */}
            <div className="relative">
              {/* Main Hero Image */}
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <img
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20Moroccan%20students%20in%20modern%20office%20environment%2C%20diverse%20group%20working%20together%2C%20laptops%20and%20documents%2C%20bright%20lighting%2C%20contemporary%20workspace%2C%20business%20attire%2C%20confident%20and%20engaged%20expressions%2C%20high%20quality%2C%20professional%20photography&image_size=landscape_16_9"
                  alt="Moroccan students in professional internship setting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/25 to-transparent dark:from-accent/35"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-gradient-to-br from-secondary to-accent opacity-90 blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-secondary opacity-90 blur-sm"></div>

              {/* Decorative Pattern */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-secondary/30 dark:border-secondary/40"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-accent/30 dark:border-accent/40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="w-full h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-muted/20 dark:fill-muted/30"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,39-23.89,62.57-31.05,22.59-6.79,46.84-7.89,69.27-5.84,21.5,2,42.66,10.68,62.48,20.42,27.42,12.9,53.11,28.7,81.5,38.21,31.86,10.59,65.42,14.8,98.66,12.25,32.65-2.48,64.3-11.18,96.25-16.71,33.29-5.89,66.77-9.57,100.45-6.7,32.12,2.72,63.63,11.22,95.5,16.24,32.94,5.15,66.18,7.8,99.42,7.8,32.65,0,65.28-2.66,97.7-7.8,32.94-5.15,66.18-7.8,99.42-7.8V0Z"
            opacity=".5"
            className="fill-muted/30 dark:fill-muted/40"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-background dark:fill-background"
          ></path>
        </svg>
      </div>
    </section>
  );
}
