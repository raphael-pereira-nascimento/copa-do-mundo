"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";

interface CardEstadioProps {
  nome: string;
  slug: string;
  cidade: string;
  pais: string;
  capacidade: number;
  imagemPrincipal: string;
  index: number;
}

export function CardEstadio({ nome, slug, cidade, pais, capacidade, imagemPrincipal, index }: CardEstadioProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/estadios/${slug}`}>
        <div className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg hover:-translate-y-1">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={imagemPrincipal}
              alt={nome}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg group-hover:text-fifa-verde transition-colors">{nome}</h3>
            <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {cidade}, {pais}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {capacidade.toLocaleString("pt-BR")} lugares
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
