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
        { id: "1", nome: "MetLife Stadium", slug: "metlife-stadium", cidade: "East Rutherford", pais: "EUA", capacidade: 80663, imagemPrincipal: "https://livesport-ott-images.ssl.cdn.cra.cz/r900xfq60/ccc32aac-a129-4a16-b0b8-76f0a2b266cc.jpeg" },
        { id: "2", nome: "AT&T Stadium", slug: "att-stadium", cidade: "Arlington", pais: "EUA", capacidade: 70649, imagemPrincipal: "https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1760537631/wt5wx0s0xtqspw783mgm.jpg" },
        { id: "3", nome: "Mercedes-Benz Stadium", slug: "mercedes-benz-stadium", cidade: "Atlanta", pais: "EUA", capacidade: 68239, imagemPrincipal: "https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_768/v1760450913/post_images/World%20Cup%2026/Atlanta/Atlanta_stadium.jpg" },
        { id: "4", nome: "SoFi Stadium", slug: "sofi-stadium", cidade: "Inglewood", pais: "EUA", capacidade: 70492, imagemPrincipal: "https://img.nsctotal.com.br/wp-content/uploads/2026/05/Estadio-mais-caro-do-mundo-720x405.jpg" },
        { id: "5", nome: "NRG Stadium", slug: "nrg-stadium", cidade: "Houston", pais: "EUA", capacidade: 68777, imagemPrincipal: "https://images.copaamerica.com/editions/copa-america-2024/stadiums/nrg-stadium-photo.webp" },
        { id: "6", nome: "Levi's Stadium", slug: "levis-stadium", cidade: "Santa Clara", pais: "EUA", capacidade: 68827, imagemPrincipal: "https://lncimg.lance.com.br/cdn-cgi/image/width=1280,height=720,quality=75,background=white,fit=pad/uploads/2026/05/levis-stadium-809x540-1-aspect-ratio-512-320.webp" },
        { id: "7", nome: "Lincoln Financial Field", slug: "lincoln-financial-field", cidade: "Filadélfia", pais: "EUA", capacidade: 68324, imagemPrincipal: "https://upload.wikimedia.org/wikipedia/commons/0/03/Lincoln_Financial_Field%2C_Philadelphia%2C_2024.jpg" },
        { id: "8", nome: "Lumen Field", slug: "lumen-field", cidade: "Seattle", pais: "EUA", capacidade: 66925, imagemPrincipal: "https://cdn.assets-casacor.tec.br/file/casacor-images-news/2026/04/lumen-field-facebook-ln6557bq.webp" },
        { id: "9", nome: "Hard Rock Stadium", slug: "hard-rock-stadium", cidade: "Miami Gardens", pais: "EUA", capacidade: 64478, imagemPrincipal: "https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2024/06/Miami.png" },
        { id: "10", nome: "Arrowhead Stadium", slug: "arrowhead-stadium", cidade: "Kansas City", pais: "EUA", capacidade: 69045, imagemPrincipal: "https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2026-04/GettyImages-2268319548.jpg.webp?itok=o2mKY-b1" },
        { id: "11", nome: "Gillette Stadium", slug: "gillette-stadium", cidade: "Foxborough", pais: "EUA", capacidade: 64146, imagemPrincipal: "https://p2.trrsf.com/image/fget/cf/500/0/images.terra.com/2026/05/13/1514920201-gillette-stadium-2-610x400.jpg" },
        { id: "12", nome: "Estádio Azteca", slug: "estadio-azteca", cidade: "Cidade do México", pais: "México", capacidade: 80824, imagemPrincipal: "https://selecaopiemonte.com.br/wp-content/uploads/2025/04/image-2.png" },
        { id: "13", nome: "Estádio BBVA", slug: "estadio-bbva", cidade: "Guadalupe", pais: "México", capacidade: 51243, imagemPrincipal: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUfvr9uEJEpKlfAlhBF-OS2YETnJKzNyAkAnaA_2TX8UfOyUfg-Fx4m3M&s=10" },
        { id: "14", nome: "Estádio Akron", slug: "estadio-akron", cidade: "Zapopan", pais: "México", capacidade: 45664, imagemPrincipal: "https://lncimg.lance.com.br/cdn-cgi/image/width=1280,height=720,quality=75,background=white,fit=pad/uploads/2025/12/estadio-guadalajara-mexico-copa-mundo-aspect-ratio-512-320.png" },
        { id: "15", nome: "BC Place", slug: "bc-place", cidade: "Vancouver", pais: "Canadá", capacidade: 52497, imagemPrincipal: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdA5FD3UYPjObojvb0l40kzcahlVsAXChFyLJPQBl4dLRXUfZu-HMCNFI&s=10" },
        { id: "16", nome: "BMO Field", slug: "bmo-field", cidade: "Toronto", pais: "Canadá", capacidade: 43036, imagemPrincipal: "https://viagem.cnnbrasil.com.br/wp-content/uploads/sites/5/2026/03/bmo-field.jpg?w=849&h=477&crop=0" },
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
