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
        if (resposta.ok) {
          const dados = await resposta.json();
          if (dados.estadios?.length > 0) {
            setEstadios(dados.estadios);
            return;
          }
        }
      } catch {
        console.error("Erro ao carregar estádios");
      }

      setEstadios([
        { id: "1", nome: "MetLife Stadium", slug: "metlife-stadium", cidade: "East Rutherford", pais: "EUA", capacidade: 82500, imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80" },
        { id: "2", nome: "AT&T Stadium", slug: "att-stadium", cidade: "Arlington", pais: "EUA", capacidade: 80000, imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80" },
        { id: "3", nome: "Mercedes-Benz Stadium", slug: "mercedes-benz-stadium", cidade: "Atlanta", pais: "EUA", capacidade: 71000, imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80" },
        { id: "4", nome: "SoFi Stadium", slug: "sofi-stadium", cidade: "Inglewood", pais: "EUA", capacidade: 70240, imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
        { id: "5", nome: "NRG Stadium", slug: "nrg-stadium", cidade: "Houston", pais: "EUA", capacidade: 72220, imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80" },
        { id: "6", nome: "Levi's Stadium", slug: "levis-stadium", cidade: "Santa Clara", pais: "EUA", capacidade: 68500, imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80" },
        { id: "7", nome: "Lincoln Financial Field", slug: "lincoln-financial-field", cidade: "Filadélfia", pais: "EUA", capacidade: 69596, imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
        { id: "8", nome: "Lumen Field", slug: "lumen-field", cidade: "Seattle", pais: "EUA", capacidade: 68740, imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80" },
        { id: "9", nome: "Hard Rock Stadium", slug: "hard-rock-stadium", cidade: "Miami Gardens", pais: "EUA", capacidade: 65326, imagemPrincipal: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80" },
        { id: "10", nome: "Arrowhead Stadium", slug: "arrowhead-stadium", cidade: "Kansas City", pais: "EUA", capacidade: 76416, imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80" },
        { id: "11", nome: "Gillette Stadium", slug: "gillette-stadium", cidade: "Foxborough", pais: "EUA", capacidade: 66829, imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80" },
        { id: "12", nome: "Estádio Azteca", slug: "estadio-azteca", cidade: "Cidade do México", pais: "México", capacidade: 87523, imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80" },
        { id: "13", nome: "Estádio BBVA", slug: "estadio-bbva", cidade: "Guadalupe", pais: "México", capacidade: 53500, imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
        { id: "14", nome: "Estádio Akron", slug: "estadio-akron", cidade: "Zapopan", pais: "México", capacidade: 49850, imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80" },
        { id: "15", nome: "BC Place", slug: "bc-place", cidade: "Vancouver", pais: "Canadá", capacidade: 54500, imagemPrincipal: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80" },
        { id: "16", nome: "BMO Field", slug: "bmo-field", cidade: "Toronto", pais: "Canadá", capacidade: 48200, imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" },
      ]);
    }
    carregar().finally(() => setCarregando(false));
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
