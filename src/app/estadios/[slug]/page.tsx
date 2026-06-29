"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Users, Calendar, ArrowLeft } from "lucide-react";
import { BotaoVoltar } from "@/components/botaoVoltar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface EstadioDetalhe {
  nome: string;
  cidade: string;
  pais: string;
  capacidade: number;
  anoConstrucao: number;
  descricao: string;
  historia: string;
  imagemPrincipal: string;
  imagens: string[];
  coordenadas: string;
}

const estadiosData: Record<string, EstadioDetalhe> = {
  "estadio-azteca": {
    nome: "Estádio Azteca",
    cidade: "Cidade do México",
    pais: "México",
    capacidade: 87523,
    anoConstrucao: 1966,
    descricao: "Um dos estádios mais icônicos do mundo, palco de duas finais de Copa do Mundo.",
    historia: "Inaugurado em 1966, o Estádio Azteca é o terceiro maior estádio do mundo e o maior do México. Foi palco das finais das Copas de 1970 e 1986, sendo o único estádio a sediar duas finais do torneio.",
    imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    ],
    coordenadas: "19.3029,-99.1504",
  },
  "metlife-stadium": {
    nome: "MetLife Stadium",
    cidade: "East Rutherford",
    pais: "EUA",
    capacidade: 82500,
    anoConstrucao: 2010,
    descricao: "Estádio moderno localizado em Nova Jersey, próximo a Nova York.",
    historia: "Inaugurado em 2010, o MetLife Stadium é o estádio com maior capacidade da NFL. Será palco de jogos importantes da Copa do Mundo 2026.",
    imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    ],
    coordenadas: "40.8135,-74.0745",
  },
  "rose-bowl": {
    nome: "Rose Bowl",
    cidade: "Pasadena",
    pais: "EUA",
    capacidade: 92542,
    anoConstrucao: 1922,
    descricao: "Estádio histórico da Califórnia, palco da final da Copa de 1994.",
    historia: "O Rose Bowl é um estádio icônico localizado em Pasadena, Califórnia. Inaugurado em 1922, sediou a final da Copa do Mundo FIFA de 1994 e é um dos estádios mais famosos dos EUA.",
    imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    ],
    coordenadas: "34.1614,-118.1676",
  },
};

function getEstadioPorSlug(slug: string): EstadioDetalhe | null {
  return estadiosData[slug] || null;
}

export default function EstadioDetalhePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [estadio, setEstadio] = useState<EstadioDetalhe | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemAmpliada, setImagemAmpliada] = useState<string | null>(null);

  useEffect(() => {
    const dados = getEstadioPorSlug(slug);
    if (dados) {
      setEstadio(dados);
    }
    setCarregando(false);
  }, [slug]);

  if (carregando) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Skeleton className="h-[400px] w-full rounded-lg mb-6" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!estadio) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <BotaoVoltar />
        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold">Estádio não encontrado</h1>
          <p className="text-muted-foreground mt-2">O estádio que você procura não existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[40vh] min-h-[300px] md:h-[50vh]">
        <Image
          src={estadio.imagemPrincipal}
          alt={estadio.nome}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold text-white md:text-4xl">{estadio.nome}</h1>
            <p className="mt-2 text-lg text-white/80">{estadio.cidade}, {estadio.pais}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-6">
          <BotaoVoltar />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 space-y-6"
          >
            <section>
              <h2 className="text-xl font-bold mb-3">Sobre o Estádio</h2>
              <p className="text-muted-foreground leading-relaxed">{estadio.descricao}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">História</h2>
              <p className="text-muted-foreground leading-relaxed">{estadio.historia}</p>
            </section>

            {estadio.imagens.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-3">Galeria</h2>
                <div className="grid grid-cols-2 gap-3">
                  {estadio.imagens.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setImagemAmpliada(img)}
                      className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
                      aria-label={`Ampliar imagem ${index + 1} do estádio`}
                    >
                      <Image
                        src={img}
                        alt={`${estadio.nome} - imagem ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {estadio.coordenadas && (
              <section>
                <h2 className="text-xl font-bold mb-3">Localização</h2>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    title={`Mapa do ${estadio.nome}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${estadio.coordenadas.split(",")[1]},${estadio.coordenadas.split(",")[0]},${parseFloat(estadio.coordenadas.split(",")[1]) + 0.01},${parseFloat(estadio.coordenadas.split(",")[0]) + 0.01}&layer=mapnik&marker=${estadio.coordenadas}`}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </section>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-bold">Informações</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{estadio.cidade}, {estadio.pais}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{estadio.capacidade.toLocaleString("pt-BR")} lugares</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Construído em {estadio.anoConstrucao}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {imagemAmpliada && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setImagemAmpliada(null)}
          role="dialog"
          aria-label="Imagem ampliada"
        >
          <button
            onClick={() => setImagemAmpliada(null)}
            className="absolute right-4 top-4 text-white hover:text-gray-300 z-10"
            aria-label="Fechar imagem ampliada"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={imagemAmpliada}
              alt="Imagem ampliada do estádio"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
