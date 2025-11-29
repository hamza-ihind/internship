'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Users,
  Building2,
  CheckSquare,
  BarChart3,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Layers,
  Hotel,
  UtensilsCrossed,
  Image,
  FileText,
  Award,
  ShoppingCart,
  Camera,
  Store,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const adminNavItems = [
  {
    name: 'Tableau de bord',
    href: '/admin',
    icon: LayoutDashboard,
    group: 'dashboard',
  },
  {
    name: 'Cellules',
    href: '/admin/cellules',
    icon: Building2,
    group: 'project',
  },
  { name: 'Segments', href: '/admin/segments', icon: Layers, group: 'project' },
  {
    name: 'Tâches',
    href: '/admin/taches',
    icon: CheckSquare,
    group: 'project',
  },
  { name: 'KPIs', href: '/admin/kpis', icon: BarChart3, group: 'project' },
  {
    name: 'Utilisateurs',
    href: '/admin/utilisateurs',
    icon: Users,
    group: 'management',
  },
  {
    name: 'Participants',
    href: '/admin/invites',
    icon: Users,
    group: 'management',
  },
  {
    name: 'Hébergement',
    href: '/admin/hebergement',
    icon: Hotel,
    group: 'accommodations',
  },
  {
    name: 'Restaurants',
    href: '/admin/restaurants',
    icon: UtensilsCrossed,
    group: 'accommodations',
  },
  {
    name: 'Accommodation',
    href: '/admin/accommodation',
    icon: ShoppingCart,
    group: 'accommodations',
  },
  {
    name: 'Divertissement',
    href: '/admin/divertissement',
    icon: Camera,
    group: 'accommodations',
  },
  {
    name: 'Notre École en Photos',
    href: '/admin/gallerie',
    icon: Image,
    group: 'accommodations',
  },
  {
    name: 'Programmes',
    href: '/admin/documents',
    icon: FileText,
    group: 'content',
  },
  {
    name: 'Certificats',
    href: '/admin/certificates',
    icon: Award,
    group: 'content',
  },
  {
    name: 'Messages',
    href: '/chat',
    icon: MessageCircle,
    group: 'communication',
  },
  {
    name: 'Paramètres',
    href: '/parametres',
    icon: Settings,
    group: 'settings',
  },
];

const piloteNavItems = [
  {
    name: 'Tableau de bord',
    href: '/pilote',
    icon: LayoutDashboard,
    group: 'dashboard',
  },
  {
    name: 'Participants',
    href: '/pilote/invites',
    icon: Users,
    group: 'management',
  },
  {
    name: 'Cellules',
    href: '/pilote/cellules',
    icon: Building2,
    group: 'project',
  },
  {
    name: 'Segments',
    href: '/pilote/segments',
    icon: Layers,
    group: 'project',
  },
  {
    name: 'Tâches',
    href: '/pilote/taches',
    icon: CheckSquare,
    group: 'project',
  },
  { name: 'KPIs', href: '/pilote/kpis', icon: BarChart3, group: 'project' },
  {
    name: 'Messages',
    href: '/chat',
    icon: MessageCircle,
    group: 'communication',
  },
  {
    name: 'Paramètres',
    href: '/parametres',
    icon: Settings,
    group: 'settings',
  },
];

const responsableNavItems = [
  {
    name: 'Tableau de bord',
    href: '/responsable',
    icon: LayoutDashboard,
    group: 'dashboard',
  },
  {
    name: 'Mes Tâches',
    href: '/responsable/taches',
    icon: CheckSquare,
    group: 'project',
  },
  {
    name: 'Mes KPIs',
    href: '/responsable/kpis',
    icon: BarChart3,
    group: 'project',
  },
  {
    name: 'Messages',
    href: '/chat',
    icon: MessageCircle,
    group: 'communication',
  },
  {
    name: 'Paramètres',
    href: '/parametres',
    icon: Settings,
    group: 'settings',
  },
];

const userNavItems = [
  {
    name: 'Tableau de bord',
    href: '/utilisateur',
    icon: LayoutDashboard,
    group: 'dashboard',
  },
  {
    name: 'Messages',
    href: '/chat',
    icon: MessageCircle,
    group: 'communication',
  },
  {
    name: 'Paramètres',
    href: '/parametres',
    icon: Settings,
    group: 'settings',
  },
];

const guestNavItems = [
  {
    name: 'Accueil',
    href: '/guest',
    icon: LayoutDashboard,
    group: 'dashboard',
  },
  {
    name: 'Programme',
    href: '/guest/program',
    icon: FileText,
    group: 'content',
  },

  {
    name: 'Hébergement',
    href: '/guest/hebergement',
    icon: Building2,
    group: 'accommodations',
  },
  {
    name: 'Certificat',
    href: '/guest/certificate',
    icon: Award,
    group: 'content',
  },
  {
    name: "L'école en photos",
    href: '/guest/gallerie',
    icon: Image,
    group: 'content',
  },
  {
    name: 'Restaurants',
    href: '/guest/restaurants',
    icon: UtensilsCrossed,
    group: 'accommodations',
  },
  {
    name: 'Accomodations',
    href: '/guest/accommodation',
    icon: ShoppingCart,
    group: 'accommodations',
  },
  {
    name: 'Divertissement',
    href: '/guest/divertissement',
    icon: Camera,
    group: 'accommodations',
  },

  {
    name: 'Paramètres',
    href: '/parametres',
    icon: Settings,
    group: 'settings',
  },
];

const groupLabels = {
  dashboard: 'Tableau de bord',
  management: 'Gestion des participants',
  project: 'Gestion du colloque',
  accommodations: 'Hébergements & Services',
  content: 'Documents Utiles',
  communication: 'Communication',
  settings: 'Paramètres',
};

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getNavItems = () => {
    switch (session?.user?.role) {
      case 'ADMIN':
        return adminNavItems;
      case 'PILOTE_CELLULE':
        return piloteNavItems;
      case 'RESPONSABLE_TACHE':
        return responsableNavItems;
      case 'GUEST':
        return guestNavItems;
      default:
        return userNavItems;
    }
  };

  const navItems = getNavItems();

  // Group navigation items
  const groupedNavItems = navItems.reduce((groups, item) => {
    const group = item.group || 'other';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, typeof navItems>);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.jpg" alt="YDE Logo" className="w-10" />
            <div>
              <h1 className="text-xl font-bold text-primary">YDE</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-6">
          {Object.entries(groupedNavItems).map(([groupKey, items]) => (
            <div key={groupKey} className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                {groupLabels[groupKey as keyof typeof groupLabels] || groupKey}
              </h3>
              <div className="space-y-1">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session?.user?.image || ''}
                onLoad={() =>
                  console.log('Sidebar avatar loaded:', session?.user?.image)
                }
                onError={() =>
                  console.log('Sidebar avatar failed:', session?.user?.image)
                }
              />
              <AvatarFallback className="text-xs">
                {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {session?.user?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Accueil
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut()}
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </Button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-card border-r">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-card border-r">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
