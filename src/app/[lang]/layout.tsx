'use client';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BookOpen,
  Swords,
  Languages,
  User,
  Settings,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/auth/hook';
import { languages } from '@/lib/languages';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const lang = params.lang as string;
  const currentLanguage = languages.find(l => l.code === lang);

  const isActive = (path: string) => pathname === `/${lang}${path}`;

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/lessons', icon: BookOpen, label: 'Lessons' },
    // { href: '/games', icon: Swords, label: 'Games' },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link
            href="/languages"
            className="font-headline text-2xl font-bold text-primary flex items-center gap-2"
          >
            {currentLanguage && <currentLanguage.icon className="w-7 h-7" />}
            BhashaSetu
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={{ children: item.label }}
                >
                  <Link href={`/${lang}${item.href}`}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t">
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: "Switch Language" }}>
                  <Link href="/languages">
                    <Languages />
                    <span>Switch Language</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={{ children: "Profile" }}>
                    <Avatar className="w-8 h-8">
                       <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                    </Avatar>
                    <span>{loading ? 'Loading...' : 'Profile'}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl font-semibold capitalize">
            {pathname.split('/').pop()?.replace('-', ' ')}
          </h1>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
