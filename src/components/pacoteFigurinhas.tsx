"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { FigurinhaData } from "@/hooks/useAlbum";

interface PacoteFigurinhasProps {
  pacotesRestantes: number;
  aoAbrir: () => Promise<FigurinhaData[]>;
}

export function PacoteFigurinhas({ pacotesRestantes, aoAbrir }: PacoteFigurinhasProps) {
  const [abrindo, setAbrindo] = useState(false);
  const [novasFigurinhas, setNovasFigurinhas] = useState<FigurinhaData[]>([]);
  const [mostrandoResultado, setMostrandoResultado] = useState(false);

  async function handleAbrir() {
    if (abrindo || pacotesRestantes <= 0) return;

    setAbrindo(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const resultado = await aoAbrir();
    setNovasFigurinhas(resultado);
    setMostrandoResultado(true);
    setAbrindo(false);
  }

  function handleFechar() {
    setMostrandoResultado(false);
    setNovasFigurinhas([]);
  }

  return (
    <>
      <Button
        onClick={handleAbrir}
        disabled={abrindo || pacotesRestantes <= 0}
        className="relative gap-2 bg-fifa-verde hover:bg-fifa-verde/90 text-white px-6"
        size="lg"
      >
        {abrindo ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Gift className="h-5 w-5" />
          </motion.div>
        ) : (
          <Gift className="h-5 w-5" />
        )}
        {abrindo ? "Abrindo..." : "Abrir Pacote"}
        <span className="text-xs opacity-80">({pacotesRestantes})</span>
      </Button>

      <AnimatePresence>
        {mostrandoResultado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={handleFechar}
            role="dialog"
            aria-label="Resultado do pacote"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-lg rounded-xl bg-background p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="h-8 w-8 mx-auto text-fifa-dourado mb-2" />
                  <h2 className="text-xl font-bold">Novas Figurinhas!</h2>
                </motion.div>
              </div>

              <div className="grid grid-cols-5 gap-3 mb-6">
                {novasFigurinhas.map((fig, index) => (
                  <motion.div
                    key={fig.id}
                    initial={{ opacity: 0, y: 20, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex flex-col items-center gap-1 rounded-lg border p-2 bg-card"
                  >
                    <Image
                      src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${fig.selecao.codigoIso.toLowerCase()}.svg`}
                      alt={fig.selecao.nome}
                      width={50}
                      height={37}
                      className="rounded object-contain"
                    />
                    <span className="text-[10px] font-medium text-center leading-tight">
                      {fig.selecao.nome}
                    </span>
                    {fig.raridade === "lendaria" && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Sparkles className="h-3 w-3 text-fifa-dourado" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <Button onClick={handleFechar} className="w-full">
                Legal!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
