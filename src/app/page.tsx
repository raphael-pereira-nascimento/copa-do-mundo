"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, StickyNote, MapPin, ArrowRight } from "lucide-react";
import { CarrosselHero } from "@/components/carrosselHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const cardsAcesso = [
  {
    titulo: "Classificação",
    descricao: "Acompanhe a classificação dos 12 grupos da Copa do Mundo 2026.",
    icone: Trophy,
    href: "/classificacao",
    cor: "text-fifa-verde",
    bgCor: "bg-fifa-verde/10",
  },
  {
    titulo: "Álbum de Figurinhas",
    descricao: "Complete seu álbum virtual com todas as 48 seleções.",
    icone: StickyNote,
    href: "/album",
    cor: "text-fifa-dourado",
    bgCor: "bg-fifa-dourado/10",
  },
  {
    titulo: "Estádios",
    descricao: "Conheça os estádios que sediarão os jogos do torneio.",
    icone: MapPin,
    href: "/estadios",
    cor: "text-fifa-azul",
    bgCor: "bg-fifa-azul/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  return (
    <div>
      <CarrosselHero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cardsAcesso.map((card) => (
            <motion.div key={card.href} variants={cardVariants}>
              <Link href={card.href}>
                <Card className="group h-full cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-lg ${card.bgCor}`}>
                      <card.icone className={`h-6 w-6 ${card.cor}`} />
                    </div>
                    <CardTitle>{card.titulo}</CardTitle>
                    <CardDescription>{card.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`flex items-center gap-1 text-sm font-medium ${card.cor} group-hover:gap-2 transition-all`}>
                      Acessar <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold md:text-3xl">
              Copa do Mundo FIFA 2026
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Canadá, Estados Unidos e México sediarão a 23ª edição da Copa do
              Mundo FIFA. Será a primeira edição com 48 seleções em 12 grupos.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
