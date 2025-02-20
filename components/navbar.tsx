'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { ModeToggle } from '@/components/mode-toggle';
import {
  Menu,
  X,
  Bell,
  ShoppingCart,
  Mail,
  Settings,
  User as Profile,
  Home,
  Info,
  Briefcase,
  BookOpen,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const navigationLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/service', label: 'Service', icon: Briefcase },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileOpen]);

  const renderAuthSection = () => {
    if (loading) {
      return <Skeleton className="h-9 w-36 rounded-sm" />;
    }

    if (user) {
      return (
        <div className="relative" ref={profileRef}>
          <div className="flex items-center gap-3">
            <ShoppingCart className="cursor-pointer" />
            <Bell className="cursor-pointer" />
            <Settings className="cursor-pointer" />
            <Image
              src={user.photoURL || '/avatar-1.png'}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />
          </div>
          {profileOpen && (
            <Card className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Welcome to NKS</p>
                <div className="flex items-center gap-3 mt-2">
                  <Image
                    src={user.photoURL || '/avatar-1.png'}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{user.displayName || 'User'}</p>
                    <p className=" text-gray-500">CEO & Founder</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  onClick={() => setProfileOpen(false)}
                >
                  <Profile size={16} /> Profile
                </Link>
                <Link
                  href="/inbox"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  onClick={() => setProfileOpen(false)}
                >
                  <Mail size={16} /> Inbox
                </Link>
                <button
                  onClick={() => {
                    signOut(auth);
                    setProfileOpen(false);
                    router.push('/login');
                  }}
                  className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  Sign Out
                </button>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    return (
      <Link href="/login">
        <Profile size={24} />
      </Link>
    );
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 shadow-md bg-background">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo-light.png"
              width={112}
              height={24}
              alt="Logo Light"
              className="hidden h-6 mx-auto dark:block"
            />
            <Image
              src="/logo-dark.png"
              width={112}
              height={24}
              alt="Logo Dark"
              className="block h-6 mx-auto dark:hidden"
            />
          </Link>
        </div>

        <div className="hidden md:flex gap-6 ml-0">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-custom-500 font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            {renderAuthSection()}
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 bg-custom-500 dark:text-white text-black rounded-lg hover:bg-custom-600 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-background backdrop-blur-sm md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-3.5 border-b">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <Image
                src="/logo-light.png"
                width={112}
                height={24}
                alt="Logo Light"
                className="hidden dark:block"
              />
              <Image
                src="/logo-dark.png"
                width={112}
                height={24}
                alt="Logo Dark"
                className="block dark:hidden"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Navigation Links */}
              <nav className="space-y-2">
                {navigationLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={20} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <Separator />

              {/* User Section */}
              <div className="space-y-4">
                <ModeToggle />
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3">
                      <Image
                        src={user.photoURL || '/avatar-1.png'}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.displayName || 'User'}</p>
                        <p className="text-sm text-gray-500">CEO & Founder</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Profile size={20} /> Profile
                      </Link>
                      <Link
                        href="/inbox"
                        className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Mail size={20} /> Inbox
                      </Link>
                      <button
                        onClick={() => {
                          signOut(auth);
                          setMobileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-red-500"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" className="block">
                    <Button
                      className="w-full text-white bg-custom-500 hover:bg-custom-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
