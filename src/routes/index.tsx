import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/home/landing";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <LandingPage />
      <SiteFooter />
    </div>
  );
}
