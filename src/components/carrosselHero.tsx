"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    imagem: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&q=80",
    alt: "Estádio lotado durante partida de futebol",
  },
  {
    imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80",
    alt: "Torcida comemorando no estádio",
  },
  {
    imagem: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1600&q=80",
    alt: "Lance de gol em partida de futebol",
  },
  {
    imagem: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1600&q=80",
    alt: "Campo de futebol visto de cima",
  },
  {
    imagem: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&q=80",
    alt: "Torcida com bandeiras no estádio",
  },
];

export function CarrosselHero() {
  const [atual, setAtual] = useState(0);
  const [direcao, setDirecao] = useState(0);

  const proximo = useCallback(() => {
    setDirecao(1);
    setAtual((prev) => (prev + 1) % slides.length);
  }, []);

  const anterior = useCallback(() => {
    setDirecao(-1);
    setAtual((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const irPara = useCallback((index: number) => {
    setDirecao(index > atual ? 1 : -1);
    setAtual(index);
  }, [atual]);

  useEffect(() => {
    const timer = setInterval(proximo, 5000);
    return () => clearInterval(timer);
  }, [proximo]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden md:h-[80vh]" role="region" aria-label="Carrossel de imagens da Copa do Mundo">
      <AnimatePresence initial={false} custom={direcao} mode="popLayout">
        <motion.div
          key={atual}
          custom={direcao}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[atual].imagem}
            alt={slides[atual].alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold text-center md:text-6xl lg:text-7xl drop-shadow-lg"
        >
          Copa do Mundo 2026
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-lg text-center md:text-xl text-white/80 max-w-2xl drop-shadow-lg"
        >
          Viva a emoção do maior evento do futebol mundial
        </motion.p>
      </div>

      <button
        onClick={anterior}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={proximo}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Navegação dos slides">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => irPara(index)}
            className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
              index === atual ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            role="tab"
            aria-selected={index === atual}
            aria-label={`Slide ${index + 1} de ${slides.length}`}
          />
        ))}
      </div>
    </div>
  );
}
