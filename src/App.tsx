import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Aggressive removal of Lovable elements in React
    const removeLovable = () => {
      const selectors = [
        '[id*="lovable" i]',
        '[class*="lovable" i]',
        '[data-lovable]',
        'iframe[src*="lovable" i]',
        'iframe[src*="cdn.lovable" i]',
        'script[src*="lovable" i]',
        'script[src*="cdn.lovable" i]',
      ];

      selectors.forEach(selector => {
        try {
          document.querySelectorAll(selector).forEach(el => {
            try { el.remove(); } catch(e) {}
          });
        } catch(e) {}
      });

      // Check all elements for lovable in attributes
      try {
        document.querySelectorAll('*').forEach(el => {
          try {
            for (let attr of el.attributes || []) {
              if (attr.value && attr.value.toLowerCase().includes('lovable')) {
                el.remove();
                break;
              }
            }
          } catch(e) {}
        });
      } catch(e) {}
    };

    // Run immediately and periodically
    removeLovable();
    const interval = setInterval(removeLovable, 200);

    // Monitor DOM changes
    const observer = new MutationObserver(removeLovable);
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id', 'class', 'src', 'data-lovable']
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
