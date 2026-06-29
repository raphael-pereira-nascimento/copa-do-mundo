"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BotaoVoltar } from "@/components/botaoVoltar";
import { CardEstadio } from "@/components/cardEstadio";
import { Skeleton } from "@/components/ui/skeleton";

interface Estadio {
  id: string;
  nome: string;
  slug: string;
  cidade: string;
  pais: string;
  capacidade: number;
  imagemPrincipal: string;
}

export default function EstadiosPage() {
  const [estadios, setEstadios] = useState<Estadio[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch("/api/classificacao");
        const dados = await resposta.json();

        const estadiosResposta = await fetch(
          "https://raw.githubusercontent.com/algodummy/data/main/estadios.json"
        ).catch(() => null);

        const estadiosMock: Estadio[] = [
          { id: "1", nome: "Estádio Azteca", slug: "estadio-azteca", cidade: "Cidade do México", pais: "México", capacidade: 87523, imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80" },
          { id: "2", nome: "MetLife Stadium", slug: "metlife-stadium", cidade: "East Rutherford", pais: "EUA", capacidade: 82500, imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80" },
          { id: "3", nome: "Rose Bowl", slug: "rose-bowl", cidade: "Pasadena", pais: "EUA", capacidade: 92542, imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80" },
          { id: "4", nome: "Estádio BBVA", slug: "estadio-bbva", cidade: "Guadalupe", pais: "México", capacidade: 53500, imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
          { id: "5", nome: "BC Place", slug: "bc-place", cidade: "Vancouver", pais: "Canadá", capacidade: 54500, imagemPrincipal: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80" },
          { id: "6", nome: "Estádio Olímpico Universitário", slug: "estadio-olimpico-universitario", cidade: "Cidade do México", pais: "México", capacidade: 72800, imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80" },
          { id: "7", nome: "Mercedes-Benz Stadium", slug: "mercedes-benz-stadium", cidade: "Atlanta", pais: "EUA", capacidade: 71000, imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80" },
          { id: "8", nome: "Estádio Nacional de Toronto", slug: "estadio-nacional-toronto", cidade: "Toronto", pais: "Canadá", capacidade: 48200, imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80" },
          { id: "9", nome: "SoFi Stadium", slug: "sofi-stadium", cidade: "Los Angeles", pais: "EUA", capacidade: 70240, imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
          { id: "10", nome: "AT&T Stadium", slug: "att-stadium", cidade: "Arlington", pais: "EUA", capacidade: 80000, imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80" },
          { id: "11", nome: "Estádio Akron", slug: "estadio-akron", cidade: "Zapopan", pais: "México", capacidade: 49850, imagemPrincipal: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80" },
          { id: "12", nome: "Gillette Stadium", slug: "gillette-stadium", cidade: "Foxborough", pais: "EUA", capacidade: 66829, imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80" },
        ];

        setEstadios(estadiosMock);
      } catch {
        console.error("Erro ao carregar estádios");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <BotaoVoltar />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold md:text-3xl mb-2">Estádios</h1>
        <p className="text-muted-foreground mb-8">
          Conheça os estádios que sediarão a Copa do Mundo 2026
        </p>

        {carregando ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {estadios.map((estadio, index) => (
              <CardEstadio key={estadio.id} {...estadio} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
