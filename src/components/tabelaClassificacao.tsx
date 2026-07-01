"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, AlertCircle, Calendar, Clock, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { BandeiraSelecao } from "@/components/bandeiraSelecao";

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
  dataPartida?: string | null;
  estadioId?: string | null;
  mandante: { nome: string; codigoIso: string };
  visitante: { nome: string; codigoIso: string };
  estadio?: { id: string; nome: string; cidade: string; pais: string } | null;
}

interface EstadioItem {
  id: string;
  nome: string;
  cidade: string;
  pais: string;
}

interface TabelaClassificacaoProps {
  selecoes: Selecao[];
  partidas: Partida[];
  estadios: EstadioItem[];
  grupo: string;
  onPartidaAtualizada?: () => void;
}

function getCorStatus(status: string) {
  switch (status) {
    case "classificado": return { bg: "bg-green-100 dark:bg-green-900/30", dot: "text-green-600" };
    case "pendente": return { bg: "bg-blue-50 dark:bg-blue-900/20", dot: "text-blue-500" };
    case "eliminado": return { bg: "bg-red-50 dark:bg-red-900/20", dot: "text-red-500" };
    default: return { bg: "", dot: "text-gray-400" };
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "classificado": return "Classificado";
    case "pendente": return "Na disputa";
    case "eliminado": return "Eliminado";
    default: return "Pendente";
  }
}

function getUltimosResultados(partidas: Partida[], selecaoId: string): Array<"V" | "E" | "D"> {
  const resultados = partidas
    .filter((p) => p.mandanteId === selecaoId || p.visitanteId === selecaoId)
    .slice(-3)
    .map((p) => {
      if (p.mandanteId === selecaoId) {
        return p.golsMandante > p.golsVisitante ? "V" : p.golsMandante === p.golsVisitante ? "E" : "D";
      }
      return p.golsVisitante > p.golsMandante ? "V" : p.golsVisitante === p.golsMandante ? "E" : "D";
    });

  while (resultados.length < 3) resultados.push("-" as never);
  return resultados;
}

export function TabelaClassificacao({ selecoes, partidas, estadios, grupo, onPartidaAtualizada }: TabelaClassificacaoProps) {
  const { toast } = useToast();
  const [salvando, setSalvando] = useState<string | null>(null);
  const timeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const selecoesGrupo = selecoes
    .filter((s) => s.grupo === grupo)
    .sort((a, b) => b.pontos - a.pontos || b.saldoGols - a.saldoGols || b.golsPro - a.golsPro);

  const partidasGrupo = partidas.filter((p) =>
    selecoesGrupo.some((s) => s.id === p.mandanteId) && selecoesGrupo.some((s) => s.id === p.visitanteId)
  );

  const getPartidaExistente = useCallback((mandanteId: string, visitanteId: string) => {
    return partidasGrupo.find((p) => p.mandanteId === mandanteId && p.visitanteId === visitanteId);
  }, [partidasGrupo]);

  async function handleSalvar(mandanteId: string, visitanteId: string, golsMandante: number, golsVisitante: number) {
    const chave = `${mandanteId}-${visitanteId}`;
    setSalvando(chave);

    try {
      const resposta = await fetch("/api/partidas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mandanteId,
          visitanteId,
          golsMandante,
          golsVisitante,
        }),
      });

      if (!resposta.ok) throw new Error();

      toast({
        title: "Placar salvo!",
        description: "A classificação foi atualizada.",
        variant: "success",
      });

      if (onPartidaAtualizada) onPartidaAtualizada();
    } catch {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Tente novamente.",
      });
    } finally {
      setSalvando(null);
    }
  }

  function formatDateForInput(data?: string | null) {
    if (!data) return "";
    try {
      return data.split("T")[0];
    } catch {
      return "";
    }
  }

  function formatTimeForInput(data?: string | null) {
    if (!data) return "";
    try {
      const d = new Date(data);
      return d.toTimeString().slice(0, 5);
    } catch {
      return "";
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-2 text-center font-bold w-10">#</th>
            <th className="p-2 text-left font-bold">Seleção</th>
            <th className="p-2 text-center font-bold w-10" title="Jogos">J</th>
            <th className="p-2 text-center font-bold w-10" title="Vitórias">C</th>
            <th className="p-2 text-center font-bold w-10" title="Empates">E</th>
            <th className="p-2 text-center font-bold w-10" title="Derrotas">D</th>
            <th className="p-2 text-center font-bold w-10" title="Gols Marcados">M</th>
            <th className="p-2 text-center font-bold w-10" title="Gols Sofridos">S</th>
            <th className="p-2 text-center font-bold w-10" title="Saldo de Gols">DG</th>
            <th className="p-2 text-center font-bold w-14" title="Pontos Conduta Equipe">PCE</th>
            <th className="p-2 text-center font-bold w-10">Pts</th>
            <th className="p-2 text-center font-bold w-20">Últimos</th>
          </tr>
        </thead>
        <AnimatePresence mode="popLayout">
          <tbody>
            {selecoesGrupo.map((selecao, index) => {
              const cor = getCorStatus(selecao.status);
              const ultimos = getUltimosResultados(partidasGrupo, selecao.id);

              return (
                <motion.tr
                  key={selecao.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`border-b hover:bg-muted/30 ${cor.bg}`}
                >
                  <td className="p-2 text-center font-bold">{index + 1}</td>
                  <td className="p-2">
                    <BandeiraSelecao codigoIso={selecao.codigoIso} nome={selecao.nome} />
                    <span className="hidden md:inline text-xs text-muted-foreground ml-1">
                      ({getStatusLabel(selecao.status)})
                    </span>
                  </td>
                  <td className="p-2 text-center">{selecao.jogos}</td>
                  <td className="p-2 text-center">{selecao.vitorias}</td>
                  <td className="p-2 text-center">{selecao.empates}</td>
                  <td className="p-2 text-center">{selecao.derrotas}</td>
                  <td className="p-2 text-center">{selecao.golsPro}</td>
                  <td className="p-2 text-center">{selecao.golsContra}</td>
                  <td className={`p-2 text-center font-mono ${selecao.saldoGols > 0 ? "text-green-600" : selecao.saldoGols < 0 ? "text-red-600" : ""}`}>
                    {selecao.saldoGols > 0 ? "+" : ""}{selecao.saldoGols}
                  </td>
                  <td className="p-2 text-center font-mono text-xs">{selecao.pontosConduta}</td>
                  <td className="p-2 text-center font-bold text-lg">{selecao.pontos}</td>
                  <td className="p-2">
                    <div className="flex justify-center gap-1">
                      {ultimos.map((r, i) => (
                        <span
                          key={i}
                          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                            r === "V" ? "bg-green-500" : r === "E" ? "bg-yellow-500" : r === "D" ? "bg-red-500" : "bg-gray-300"
                          }`}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </AnimatePresence>
      </table>

      {selecoesGrupo.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="font-semibold text-sm text-muted-foreground">Editar Placar das Partidas</h4>
          {selecoesGrupo.map((mandante, i) =>
            selecoesGrupo.slice(i + 1).map((visitante) => {
              const chave = `${mandante.id}-${visitante.id}`;
              const partida = getPartidaExistente(mandante.id, visitante.id);
              const golsM = String(partida?.golsMandante ?? "");
              const golsV = String(partida?.golsVisitante ?? "");
              const dataPartida = formatDateForInput(partida?.dataPartida);
              const horaPartida = formatTimeForInput(partida?.dataPartida);
              const estadioSelecionado = partida?.estadioId || "";

              return (
                <div key={chave} className="rounded-lg border p-4 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="min-w-[140px]">
                      <BandeiraSelecao codigoIso={mandante.codigoIso} nome={mandante.nome} />
                    </div>
                    <Input
                      type="number"
                      min={0}
                      max={99}
                      className="w-16 h-9 text-center"
                      placeholder="M"
                      defaultValue={golsM}
                      onBlur={(e) => {
                        const gM = Number(e.target.value);
                        const gV = Number((e.target.closest(".flex")?.querySelector('[data-gols-visitante]') as HTMLInputElement)?.value || 0);
                        handleSalvar(mandante.id, visitante.id, gM, gV);
                      }}
                      aria-label={`Gols de ${mandante.nome}`}
                    />
                    <span className="text-sm font-bold">x</span>
                    <Input
                      type="number"
                      min={0}
                      max={99}
                      className="w-16 h-9 text-center"
                      placeholder="S"
                      defaultValue={golsV}
                      data-gols-visitante="true"
                      onBlur={(e) => {
                        const gV = Number(e.target.value);
                        const gM = Number((e.target.closest(".flex")?.querySelector('[aria-label*="Gols de"]') as HTMLInputElement)?.value || 0);
                        handleSalvar(mandante.id, visitante.id, gM, gV);
                      }}
                      aria-label={`Gols de ${visitante.nome}`}
                    />
                    <div className="min-w-[140px]">
                      <BandeiraSelecao codigoIso={visitante.codigoIso} nome={visitante.nome} />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {dataPartida && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="text-xs">{new Date(partida!.dataPartida!).toLocaleDateString("pt-BR")}</span>
                      </div>
                    )}
                    {horaPartida && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="text-xs">{horaPartida}</span>
                      </div>
                    )}
                    {estadioSelecionado && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="text-xs">{estadios.find((e) => e.id === estadioSelecionado)?.nome ?? "Estádio"}</span>
                      </div>
                    )}

                    {salvando === chave && (
                      <span className="text-xs text-muted-foreground animate-pulse">Salvando...</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-green-600" /> Classificado</span>
        <span className="flex items-center gap-1"><Circle className="h-3 w-3 text-blue-500" /> Na disputa</span>
        <span className="flex items-center gap-1"><AlertCircle className="h-3 w-3 text-red-500" /> Eliminado</span>
      </div>
    </div>
  );
}
