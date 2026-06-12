import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 · LDA";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-dot opacity-25 pointer-events-none" />
      <div className="absolute inset-0 gradient-hero pointer-events-none" />

      <div className="relative z-10 max-w-xl px-6 text-center">
        <div className="font-code text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
          STATUS · 404
        </div>
        <h1 className="text-display text-7xl sm:text-9xl leading-[0.85]">
          Nothing here.
        </h1>
        <p className="font-serif italic text-xl text-muted-foreground mt-6">
          The block at <span className="text-foreground">{location.pathname}</span> wasn't finalized.
        </p>
        <a
          href="/"
          data-cursor="hover"
          className="mt-10 inline-flex items-center gap-2 pl-4 pr-5 py-3 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-all shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to root
        </a>
      </div>
    </div>
  );
};

export default NotFound;
