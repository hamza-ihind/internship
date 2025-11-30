'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Bot,
  LayoutDashboard,
  FileText,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Internships', href: '/internships' },
    { label: 'How It Works', href: '#about' },
    { label: 'About Us', href: '#about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex space-x-1">
            <span className="w-1 h-6 bg-secondary-foreground rounded"></span>
            <span className="w-1 h-5 bg-accent-foreground rounded"></span>
            <span className="w-1 h-4 bg-muted-foreground rounded"></span>
          </span>
          <span className="text-xl font-bold text-primary">InternLink</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/ai-tools"
            className="flex gap-1 text-sm text-foreground/80 hover:text-primary transition-colors font-medium"
          >
            <Bot className="h-4 w-4" /> AI Tools
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          {!session ? (
            <>
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="default">Sign Up</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-accent"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user?.image || ''}
                      alt={session.user?.name || ''}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {session.user?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/applications"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" /> Applications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2"
                  >
                    <SettingsIcon className="h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/logout"
                    className="flex items-center gap-2 text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="flex items-center gap-3">
                  <span className="flex space-x-1">
                    <span className="w-1 h-6 bg-secondary-foreground rounded"></span>
                    <span className="w-1 h-5 bg-accent-foreground rounded"></span>
                    <span className="w-1 h-4 bg-muted-foreground rounded"></span>
                  </span>
                  <span className="text-xl font-bold text-primary">
                    InternLink
                  </span>
                </Link>
              </div>
              <div className="grid gap-3">
                {links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/ai-tools"
                  className="flex gap-2 text-foreground/80 hover:text-primary transition-colors font-medium"
                  onClick={() => setOpen(false)}
                >
                  <Bot className="h-4 w-4" /> AI Tools
                </Link>
                <ModeToggle />
                {!session ? (
                  <div className="flex flex-col gap-2 w-full mt-4">
                    <Link
                      href="/auth/login"
                      onClick={() => setOpen(false)}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setOpen(false)}
                      className="w-full"
                    >
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-2 pt-2">
                    <div className="flex items-center gap-3 p-3 border-b mb-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={session.user?.image || ''}
                          alt={session.user?.name || ''}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {session.user?.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {session.user?.email}
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="text-base text-secondary hover:text-primary flex items-center gap-2"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link
                      href="/dashboard/applications"
                      onClick={() => setOpen(false)}
                      className="text-base text-secondary hover:text-primary flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" /> Applications
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setOpen(false)}
                      className="text-base text-secondary hover:text-primary flex items-center gap-2"
                    >
                      <SettingsIcon className="h-4 w-4" /> Settings
                    </Link>
                    <Link
                      href="/logout"
                      onClick={() => setOpen(false)}
                      className="text-base text-destructive hover:bg-destructive/10 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
