"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BotaoVoltar } from "@/components/botaoVoltar";
import { CardFigurinha } from "@/components/cardFigurinha";
import { PacoteFigurinhas } from "@/components/pacoteFigurinhas";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAlbum, type FigurinhaData } from "@/hooks/useAlbum";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Trophy } from "lucide-react";

const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export default function AlbumPage() {
  const { data: session } = useSession();
  const { figurinhas, pacotes, carregando, carregarAlbum, abrirPacote } = useAlbum();
  const { toast } = useToast();
  const [figurinhaSelecionada, setFigurinhaSelecionada] = useState<FigurinhaData | null>(null);
  const [grupoAtivo, setGrupoAtivo] = useState("A");

  useEffect(() => {
    carregarAlbum();
  }, [carregarAlbum]);

  const totalFigurinhas = figurinhas.length;
  const obtidas = figurinhas.filter((f) => f.obtida).length;
  const progresso = totalFigurinhas > 0 ? Math.round((obtidas / totalFigurinhas) * 100) : 0;

  async function handleAbrirPacote(): Promise<FigurinhaData[]> {
    const resultado = await abrirPacote();
    if (resultado.length === 0) {
      toast({
        variant: "destructive",
        title: "Sem pacotes",
        description: session ? "Compre mais pacotes para continuar." : "Faça login para ganhar pacotes.",
      });
    }
    return resultado;
  }

  const figurinhasGrupo = figurinhas.filter((f) => f.selecao.grupo === grupoAtivo);
  const obtidasGrupo = figurinhasGrupo.filter((f) => f.obtida).length;
  const totalGrupo = figurinhasGrupo.length;

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
        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Álbum de Figurinhas</h1>
            <p className="text-muted-foreground mt-1">
              {obtidas} de {totalFigurinhas} figurinhas completadas
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PacoteFigurinhas pacotesRestantes={pacotes} aoAbrir={handleAbrirPacote} />
          </div>
        </div>

        <div className="mb-6">
          <Progress value={progresso} className="h-3" />
          <p className="text-sm text-muted-foreground mt-1 text-right">{progresso}% completo</p>
        </div>

        {carregando ? (
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-16" />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] w-full rounded-lg" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {grupos.map((g) => (
                <button
                  key={g}
                  onClick={() => setGrupoAtivo(g)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    grupoAtivo === g
                      ? "bg-fifa-verde text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Grupo {g}
                  <span className="ml-1 text-xs opacity-70">
                    ({obtidasGrupo}/{totalGrupo})
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {figurinhasGrupo.map((fig, index) => (
                <CardFigurinha
                  key={fig.id}
                  figurinha={fig}
                  index={index}
                  onClick={() => setFigurinhaSelecionada(fig)}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>

      <Dialog open={!!figurinhaSelecionada} onOpenChange={() => setFigurinhaSelecionada(null)}>
        <DialogContent className="sm:max-w-sm">
          {figurinhaSelecionada && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-fifa-dourado" />
                  {figurinhaSelecionada.selecao.nome}
                </DialogTitle>
                <DialogDescription>
                  Figurinha #{figurinhaSelecionada.numero.toString().padStart(2, "0")}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <Image
                  src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${figurinhaSelecionada.selecao.codigoIso.toLowerCase()}.svg`}
                  alt={`Bandeira de ${figurinhaSelecionada.selecao.nome}`}
                  width={160}
                  height={120}
                  className="rounded-lg object-contain border"
                />
                <div className="text-center space-y-1">
                  <p className="font-medium">{figurinhaSelecionada.selecao.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    Grupo {figurinhaSelecionada.selecao.grupo}
                  </p>
                  <p className="text-sm">
                    Raridade:{" "}
                    <span className={`font-medium capitalize ${
                      figurinhaSelecionada.raridade === "lendaria" ? "text-fifa-dourado" :
                      figurinhaSelecionada.raridade === "rara" ? "text-purple-500" :
                      figurinhaSelecionada.raridade === "epica" ? "text-orange-500" :
                      "text-muted-foreground"
                    }`}>
                      {figurinhaSelecionada.raridade === "comum" ? "Comum" :
                       figurinhaSelecionada.raridade === "rara" ? "Rara" :
                       figurinhaSelecionada.raridade === "epica" ? "Épica" : "Lendária"}
                    </span>
                  </p>
                  {figurinhaSelecionada.obtidaEm && (
                    <p className="text-xs text-muted-foreground">
                      Obtida em {new Date(figurinhaSelecionada.obtidaEm).toLocaleDateString("pt-BR")}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
