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
  "metlife-stadium": {
    nome: "MetLife Stadium",
    cidade: "East Rutherford",
    pais: "EUA",
    capacidade: 80663,
    anoConstrucao: 2010,
    descricao: "Estádio moderno localizado em Nova Jersey, próximo a Nova York.",
    historia: "Inaugurado em 2010, o MetLife Stadium é o estádio com maior capacidade da NFL. Será palco de jogos importantes da Copa do Mundo 2026, incluindo a final do torneio.",
    imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    ],
    coordenadas: "40.8135,-74.0745",
  },
  "att-stadium": {
    nome: "AT&T Stadium",
    cidade: "Arlington",
    pais: "EUA",
    capacidade: 70649,
    anoConstrucao: 2009,
    descricao: "Estádio monumental no Texas, conhecido como 'Jerry World'.",
    historia: "O AT&T Stadium é um gigante do esporte localizado no Texas. Inaugurado em 2009, é famoso por sua arquitetura impressionante e capacidade de sediar grandes eventos.",
    imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    ],
    coordenadas: "32.7473,-97.0945",
  },
  "mercedes-benz-stadium": {
    nome: "Mercedes-Benz Stadium",
    cidade: "Atlanta",
    pais: "EUA",
    capacidade: 68239,
    anoConstrucao: 2017,
    descricao: "Estádio futurista com teto retrátil em formato de pétala.",
    historia: "Inaugurado em 2017, o Mercedes-Benz Stadium é conhecido por seu teto retrátil inspirado em uma flor de oito pétalas. É um dos estádios mais tecnológicos do mundo.",
    imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    ],
    coordenadas: "33.7555,-84.4017",
  },
  "sofi-stadium": {
    nome: "SoFi Stadium",
    cidade: "Inglewood",
    pais: "EUA",
    capacidade: 70492,
    anoConstrucao: 2020,
    descricao: "Estádio de última geração com tecnologia imersiva.",
    historia: "Inaugurado em 2020, o SoFi Stadium é um dos estádios mais caros e modernos já construídos. Com seu design inovador e telão de 360 graus, representa o futuro dos estádios esportivos.",
    imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    ],
    coordenadas: "33.9534,-118.3390",
  },
  "nrg-stadium": {
    nome: "NRG Stadium",
    cidade: "Houston",
    pais: "EUA",
    capacidade: 68777,
    anoConstrucao: 2002,
    descricao: "Estádio coberto com teto retrátil no Texas.",
    historia: "Inaugurado em 2002, o NRG Stadium é a casa do Houston Texans da NFL. Seu teto retrátil e sistema de climatização o tornam ideal para grandes eventos esportivos.",
    imagemPrincipal: "https://images.unsplash.com/photo-1704908327144-e6237ea323a4?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1704908327144-e6237ea323a4?w=800&q=80",
      "https://images.unsplash.com/photo-1502836050073-c79f265d3ca5?w=800&q=80",
    ],
    coordenadas: "29.6847,-95.4107",
  },
  "levis-stadium": {
    nome: "Levi's Stadium",
    cidade: "Santa Clara",
    pais: "EUA",
    capacidade: 68827,
    anoConstrucao: 2014,
    descricao: "Estádio moderno no coração do Vale do Silício.",
    historia: "Inaugurado em 2014, o Levi's Stadium é a casa do San Francisco 49ers. Conhecido por sua arquitetura contemporânea e tecnologia de ponta, está localizado no coração do Vale do Silício.",
    imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    ],
    coordenadas: "37.4030,-121.9698",
  },
  "lincoln-financial-field": {
    nome: "Lincoln Financial Field",
    cidade: "Filadélfia",
    pais: "EUA",
    capacidade: 68324,
    anoConstrucao: 2003,
    descricao: "Estádio icônico da Filadélfia, conhecido como 'The Linc'.",
    historia: "Inaugurado em 2003, o Lincoln Financial Field é a casa do Philadelphia Eagles. Sua atmosfera elétrica e localização privilegiada na Filadélfia o tornam um dos estádios mais emblemáticos dos EUA.",
    imagemPrincipal: "https://images.unsplash.com/photo-1693669029487-54a7b306841d?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1693669029487-54a7b306841d?w=800&q=80",
      "https://images.unsplash.com/photo-1779449607695-c4c7d268ff3a?w=800&q=80",
    ],
    coordenadas: "39.9008,-75.1675",
  },
  "lumen-field": {
    nome: "Lumen Field",
    cidade: "Seattle",
    pais: "EUA",
    capacidade: 66925,
    anoConstrucao: 2002,
    descricao: "Estádio ao ar livre com vista para o centro de Seattle.",
    historia: "Inaugurado em 2002, o Lumen Field é a casa do Seattle Seahawks. Conhecido por sua atmosfera ensurdecedora e localização com vista para o centro de Seattle, é um dos estádios mais icônicos da Costa Oeste.",
    imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      "https://images.unsplash.com/photo-1709495034740-f6e6c22f1d1f?w=800&q=80",
    ],
    coordenadas: "47.5952,-122.3316",
  },
  "hard-rock-stadium": {
    nome: "Hard Rock Stadium",
    cidade: "Miami Gardens",
    pais: "EUA",
    capacidade: 64478,
    anoConstrucao: 1987,
    descricao: "Estádio modernizado em Miami, palco de Super Bowls e finais.",
    historia: "Inaugurado em 1987 e completamente renovado em 2015, o Hard Rock Stadium é a casa do Miami Dolphins. Palco de múltiplos Super Bowls e finais de tênis, é um dos estádios mais versáteis do mundo.",
    imagemPrincipal: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    ],
    coordenadas: "25.9580,-80.2389",
  },
  "arrowhead-stadium": {
    nome: "Arrowhead Stadium",
    cidade: "Kansas City",
    pais: "EUA",
    capacidade: 69045,
    anoConstrucao: 1972,
    descricao: "Estádio lendário conhecido por sua atmosfera barulhenta.",
    historia: "Inaugurado em 1972, o Arrowhead Stadium é a casa do Kansas City Chiefs. Conhecido por deter o recorde de estádio mais barulhento do mundo, sua atmosfera é lendária no esporte americano.",
    imagemPrincipal: "https://images.unsplash.com/photo-1685463121370-d524d75e26de?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1685463121370-d524d75e26de?w=800&q=80",
      "https://images.unsplash.com/photo-1771344159210-ceb27cd406a7?w=800&q=80",
    ],
    coordenadas: "39.0489,-94.4839",
  },
  "gillette-stadium": {
    nome: "Gillette Stadium",
    cidade: "Foxborough",
    pais: "EUA",
    capacidade: 64146,
    anoConstrucao: 2002,
    descricao: "Estádio moderno em Massachusetts, próximo a Boston.",
    historia: "Localizado em Foxborough, Massachusetts, o Gillette Stadium é a casa do New England Patriots. Inaugurado em 2002, foi selecionado como uma das sedes americanas para a Copa de 2026.",
    imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    ],
    coordenadas: "42.0909,-71.2643",
  },
  "estadio-azteca": {
    nome: "Estádio Azteca",
    cidade: "Cidade do México",
    pais: "México",
    capacidade: 80824,
    anoConstrucao: 1966,
    descricao: "Um dos estádios mais icônicos do mundo, palco de duas finais de Copa do Mundo.",
    historia: "Inaugurado em 1966, o Estádio Azteca é o terceiro maior estádio do mundo e o maior do México. Foi palco das finais das Copas de 1970 e 1986, sendo o único estádio a sediar duas finais do torneio.",
    imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    ],
    coordenadas: "19.3029,-99.1504",
  },
  "estadio-bbva": {
    nome: "Estádio BBVA",
    cidade: "Guadalupe",
    pais: "México",
    capacidade: 51243,
    anoConstrucao: 2015,
    descricao: "Estádio moderno e sustentável, casa do Monterrey.",
    historia: "Inaugurado em 2015, o Estádio BBVA é considerado um dos estádios mais modernos da América Latina. Com design sustentável e tecnologia de ponta, foi selecionado para sediar jogos da Copa de 2026.",
    imagemPrincipal: "https://images.unsplash.com/photo-1642321215251-bd9999b0b408?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1642321215251-bd9999b0b408?w=800&q=80",
      "https://images.unsplash.com/photo-1779449607695-c4c7d268ff3a?w=800&q=80",
    ],
    coordenadas: "25.7200,-100.3124",
  },
  "estadio-akron": {
    nome: "Estádio Akron",
    cidade: "Zapopan",
    pais: "México",
    capacidade: 45664,
    anoConstrucao: 2010,
    descricao: "Estádio moderno com design sustentável em Guadalajara.",
    historia: "Inaugurado em 2010, o Estádio Akron é a casa do Club Deportivo Guadalajara. Seu design moderno e compromisso com a sustentabilidade o tornam um dos estádios mais emblemáticos do México.",
    imagemPrincipal: "https://images.unsplash.com/photo-1709495034740-f6e6c22f1d1f?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1709495034740-f6e6c22f1d1f?w=800&q=80",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    ],
    coordenadas: "20.6826,-103.4618",
  },
  "bc-place": {
    nome: "BC Place",
    cidade: "Vancouver",
    pais: "Canadá",
    capacidade: 52497,
    anoConstrucao: 1983,
    descricao: "Estádio coberto com teto retrátil, localizado em Vancouver.",
    historia: "O BC Place é um estádio multiuso localizado em Vancouver, Canadá. Inaugurado em 1983, passou por uma grande renovação em 2010 e possui um dos maiores tetos retráteis do mundo.",
    imagemPrincipal: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    ],
    coordenadas: "49.2766,-123.1119",
  },
  "bmo-field": {
    nome: "BMO Field",
    cidade: "Toronto",
    pais: "Canadá",
    capacidade: 43036,
    anoConstrucao: 2007,
    descricao: "Estádio multiuso no coração de Toronto.",
    historia: "Localizado em Toronto, o BMO Field foi inaugurado em 2007 e é um dos principais centros esportivos do Canadá. Passou por expansões significativas e receberá jogos emocionantes da Copa de 2026.",
    imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      "https://images.unsplash.com/photo-1709495034740-f6e6c22f1d1f?w=800&q=80",
    ],
    coordenadas: "43.6333,-79.4189",
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
