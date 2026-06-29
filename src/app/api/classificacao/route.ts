import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const selecoes = await prisma.selecao.findMany({
      orderBy: [{ grupo: "asc" }, { pontos: "desc" }, { saldoGols: "desc" }, { golsPro: "desc" }],
    });

    const partidas = await prisma.partida.findMany({
      include: {
        mandante: { select: { nome: true, codigoIso: true } },
        visitante: { select: { nome: true, codigoIso: true } },
        estadio: { select: { id: true, nome: true, cidade: true, pais: true } },
      },
      orderBy: { dataPartida: "asc" },
    });

    const estadios = await prisma.estadio.findMany({
      select: { id: true, nome: true, cidade: true, pais: true },
      orderBy: { nome: "asc" },
    });

    return NextResponse.json({ selecoes, partidas, estadios });
  } catch {
    return NextResponse.json(
      { message: "Erro ao carregar classificação." },
      { status: 500 }
    );
  }
}
