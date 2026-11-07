import { SiteHeader } from "@/components/SiteHeader";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[40rem] px-6 pb-20 pt-8 sm:pt-10">
      <SiteHeader />
      {children}
    </div>
  );
}
