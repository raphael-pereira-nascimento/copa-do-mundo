"use client";

import { motion } from "framer-motion";
import { Sparkles, Lock } from "lucide-react";
import Image from "next/image";
import type { FigurinhaData } from "@/hooks/useAlbum";
import { cn } from "@/lib/utils";

interface CardFigurinhaProps {
  figurinha: FigurinhaData;
  onClick?: () => void;
  index: number;
}

export function CardFigurinha({ figurinha, onClick, index }: CardFigurinhaProps) {
  const obtida = figurinha.obtida;
  const ehRara = figurinha.raridade === "rara" || figurinha.raridade === "epica" || figurinha.raridade === "lendaria";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center rounded-lg border p-3 transition-all focus:outline-none focus:ring-2 focus:ring-ring",
        obtida
          ? "bg-card hover:shadow-md cursor-pointer"
          : "bg-muted/30 cursor-default opacity-60"
      )}
      disabled={!obtida}
      aria-label={obtida ? `Figurinha ${figurinha.selecao.nome}` : "Figurinha bloqueada"}
    >
      {ehRara && obtida && (
        <div className="absolute -top-1 -right-1 z-10">
          <Sparkles className="h-5 w-5 text-fifa-dourado" />
        </div>
      )}

      <div className="relative mb-2 flex h-20 w-20 items-center justify-center">
        {obtida ? (
          <Image
            src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${figurinha.selecao.codigoIso.toLowerCase()}.svg`}
            alt={`Bandeira de ${figurinha.selecao.nome}`}
            width={80}
            height={60}
            className="rounded object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded bg-muted">
            <Lock className="h-8 w-8 text-muted-foreground/40" />
          </div>
        )}
      </div>

      <span className={cn("text-xs font-medium text-center leading-tight", obtida ? "text-foreground" : "text-muted-foreground")}>
        {obtida ? figurinha.selecao.nome : "???"}
      </span>

      <span className="mt-1 text-[10px] text-muted-foreground">
        #{figurinha.numero.toString().padStart(2, "0")}
      </span>
    </motion.button>
  );
}
