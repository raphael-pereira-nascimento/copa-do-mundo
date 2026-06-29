"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BotaoVoltar } from "@/components/botaoVoltar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { TabelaClassificacao } from "@/components/tabelaClassificacao";

const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

interface Selecao {
  id: string;
  nome: string;
  codigoIso: string;
  grupo: string;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
  pontosConduta: number;
  pontos: number;
  status: string;
}

interface Partida {
  id: string;
  mandanteId: string;
  visitanteId: string;
  golsMandante: number;
  golsVisitante: number;
  mandante: { nome: string; codigoIso: string };
  visitante: { nome: string; codigoIso: string };
}

export default function ClassificacaoPage() {
  const [selecoes, setSelecoes] = useState<Selecao[]>([]);
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch("/api/classificacao");
        const dados = await resposta.json();
        setSelecoes(dados.selecoes);
        setPartidas(dados.partidas);
      } catch {
        console.error("Erro ao carregar classificação");
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
        <h1 className="text-2xl font-bold md:text-3xl mb-6">Classificação dos Grupos</h1>

        {carregando ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <Tabs defaultValue="A" className="w-full">
            <TabsList className="mb-4 flex flex-wrap h-auto">
              {grupos.map((g) => (
                <TabsTrigger key={g} value={g} className="flex-1 min-w-[40px]">
                  Grupo {g}
                </TabsTrigger>
              ))}
            </TabsList>
            {grupos.map((g) => (
              <TabsContent key={g} value={g}>
                <TabelaClassificacao selecoes={selecoes} partidas={partidas} grupo={g} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </motion.div>
    </div>
  );
}
