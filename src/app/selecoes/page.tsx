"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BotaoVoltar } from "@/components/botaoVoltar";
import { Skeleton } from "@/components/ui/skeleton";

interface Selecao {
  id: string;
  nome: string;
  codigoIso: string;
  grupo: string;
  tecnico: string | null;
  status: string;
}

export default function SelecoesPage() {
  const [selecoes, setSelecoes] = useState<Selecao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch("/api/classificacao");
        const dados = await resposta.json();
        setSelecoes(dados.selecoes);
      } catch {
        console.error("Erro ao carregar seleções");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const grupos = "ABCDEFGHIJKL";

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
        <h1 className="text-2xl font-bold md:text-3xl mb-2">Seleções</h1>
        <p className="text-muted-foreground mb-8">
          Todas as 48 seleções classificadas para a Copa do Mundo 2026
        </p>

        {carregando ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2 rounded-lg border p-4">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {grupos.split("").map((letra) => {
              const times = selecoes.filter((s) => s.grupo === letra);
              if (times.length === 0) return null;
              return (
                <div key={letra}>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-fifa-verde text-white text-sm font-bold">
                      {letra}
                    </span>
                    Grupo {letra}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {times.map((selecao, index) => (
                      <motion.div
                        key={selecao.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link href={`/selecoes/${selecao.codigoIso.toLowerCase()}`}>
                          <div className="group rounded-lg border bg-card p-4 transition-all hover:shadow-lg hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-3">
                              <Image
                                src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${selecao.codigoIso.toLowerCase()}.svg`}
                                alt={selecao.nome}
                                width={48}
                                height={36}
                                className="rounded-sm object-cover"
                                onError={(e) => {
                                  const t = e.target as HTMLImageElement;
                                  t.style.display = "none";
                                }}
                              />
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                selecao.status === "classificado" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                                selecao.status === "eliminado" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" :
                                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                              }`}>
                                {selecao.status === "classificado" ? "Classificado" :
                                 selecao.status === "eliminado" ? "Eliminado" : "Pendente"}
                              </span>
                            </div>
                            <h3 className="font-bold group-hover:text-fifa-verde transition-colors">{selecao.nome}</h3>
                            {selecao.tecnico && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Técnico: {selecao.tecnico}
                              </p>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
