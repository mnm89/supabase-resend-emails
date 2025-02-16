"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/protected",
  },
  {
    title: "Social Links",
    href: "/protected/social-links",
  },
  {
    title: "Personal Info",
    href: "/protected/personal-info",
  },
  {
    title: "Account Access",
    href: "/protected/account",
  },
  {
    title: "Preferences",
    href: "/protected/preferences",
  },
  {
    title: "Notifications",
    href: "/protected/notifications",
  },
];
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className={"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"}>
      {sidebarNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
