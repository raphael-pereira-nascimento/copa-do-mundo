import { Trophy } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-8" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-fifa-verde">
            <Trophy className="h-5 w-5" />
            <span className="font-bold">Copa do Mundo FIFA 2026</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} — Aplicação educacional sem vínculo oficial com a FIFA.
          </p>
          <p className="text-xs text-muted-foreground">
            Imagens por Unsplash. Bandeiras por flag-icons.
          </p>
        </div>
      </div>
    </footer>
  );
}
