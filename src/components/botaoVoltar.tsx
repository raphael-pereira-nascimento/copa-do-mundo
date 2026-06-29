"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BotaoVoltar() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => router.back()}
      className="gap-2"
      aria-label="Voltar para página anterior"
    >
      <ArrowLeft className="h-4 w-4" />
      Voltar
    </Button>
  );
}
