"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { BotaoVoltar } from "@/components/botaoVoltar";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, User } from "lucide-react";

interface SelecaoDetalhe {
  id: string;
  nome: string;
  codigoIso: string;
  grupo: string;
  tecnico: string | null;
  status: string;
  bandeiraUrl: string | null;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
  pontos: number;
}

interface Jogador {
  id: string;
  nome: string;
  posicao: string;
  numeroCamisa: number;
}

const posicaoLabel: Record<string, string> = {
  Goleiro: "Goleiros",
  Defensor: "Defensores",
  "Meio-campista": "Meio-campistas",
  Atacante: "Atacantes",
};

const posicaoCor: Record<string, string> = {
  Goleiro: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  Defensor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  "Meio-campista": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Atacante: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export default function SelecaoDetalhePage() {
  const params = useParams();
  const iso = params.slug as string;
  const [selecao, setSelecao] = useState<SelecaoDetalhe | null>(null);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(`/api/selecoes/${iso}`);
        const dados = await resposta.json();
        setSelecao(dados.selecao);
        setJogadores(dados.jogadores);
      } catch {
        console.error("Erro ao carregar seleção");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [iso]);

  if (carregando) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6"><BotaoVoltar /></div>
        <Skeleton className="h-48 w-full rounded-lg mb-6" />
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-6 w-48 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!selecao) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6"><BotaoVoltar /></div>
        <p className="text-muted-foreground">Seleção não encontrada.</p>
      </div>
    );
  }

  const posicoes = ["Goleiro", "Defensor", "Meio-campista", "Atacante"];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <BotaoVoltar />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-fifa-azul to-fifa-verde p-6 sm:p-10">
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <Image
              src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${selecao.codigoIso.toLowerCase()}.svg`}
              alt={selecao.nome}
              width={96}
              height={72}
              className="rounded-lg object-cover shadow-lg"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = "none";
              }}
            />
            <div className="text-center sm:text-left text-white">
              <h1 className="text-3xl font-bold">{selecao.nome}</h1>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-3 text-sm">
                <span className="rounded-full bg-white/20 px-3 py-1">Grupo {selecao.grupo}</span>
                {selecao.tecnico && (
                  <span className="rounded-full bg-white/20 px-3 py-1 flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {selecao.tecnico}
                  </span>
                )}
                <span className={`rounded-full px-3 py-1 ${
                  selecao.status === "classificado" ? "bg-green-500" :
                  selecao.status === "eliminado" ? "bg-red-500" : "bg-white/20"
                }`}>
                  {selecao.status === "classificado" ? "Classificado" :
                   selecao.status === "eliminado" ? "Eliminado" : "Pendente"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {posicoes.map((posicao) => {
            const jogadoresFiltrados = jogadores.filter((j) => j.posicao === posicao);
            if (jogadoresFiltrados.length === 0) return null;
            return (
              <motion.div
                key={posicao}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-fifa-verde" />
                  {posicaoLabel[posicao]}
                  <span className="text-sm text-muted-foreground font-normal">
                    ({jogadoresFiltrados.length})
                  </span>
                </h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {jogadoresFiltrados.map((jogador) => (
                    <div
                      key={jogador.id}
                      className="flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent"
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${posicaoCor[posicao]}`}>
                        {jogador.numeroCamisa}
                      </span>
                      <span className="font-medium text-sm truncate">{jogador.nome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
