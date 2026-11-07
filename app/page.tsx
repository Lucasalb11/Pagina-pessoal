import type { Metadata } from "next";
import { VisitCardStage } from "@/components/VisitCardStage";
import { SITE_URL } from "@/data/profile";

export const metadata: Metadata = {
  title: "Lucas de Almeida — Computer Engineering | Blockchain, DeFi & Security",
  description:
    "Personal landing page and digital signature of Lucas de Almeida — Computer Engineering, Blockchain, DeFi & Security.",
  alternates: { canonical: SITE_URL },
};

export default function VisitCardPage() {
  return <VisitCardStage />;
}
