import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectRow from "@/components/ProjectRow";
import { SHIPS } from "@/data/projects.config";
import { getDict, isLang, type Lang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const t = getDict(lang);
  return {
    title: t.meta.work.title,
    description: t.meta.work.description,
    alternates: { canonical: `https://lucasalmeida.me/${lang}/work` },
  };
}

export default async function WorkIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const t = getDict(lang);

  return (
    <main className="mx-auto max-w-2xl px-6">
      <section className="pt-4 pb-12">
        <p className="text-caps mb-6">{t.work.kicker}</p>
        <h1 className="font-editorial text-[3rem] sm:text-[4rem] leading-[0.95] mb-6">
          {t.work.title}
        </h1>
        <p className="text-[17px] leading-relaxed text-[color:var(--color-foreground)]/85 max-w-prose">
          {t.work.intro}
        </p>
      </section>

      <section className="pb-16 border-t border-[color:var(--color-border)] pt-8">
        <div className="flex flex-col">
          {SHIPS.map((s) => (
            <ProjectRow key={s.id} ship={s} lang={lang} />
          ))}
        </div>
      </section>
    </main>
  );
}
