import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { iso: string } }) {
  try {
    const iso = params.iso.toUpperCase();

    const selecao = await prisma.selecao.findUnique({
      where: { codigoIso: iso },
    });

    if (!selecao) {
      return NextResponse.json({ message: "Seleção não encontrada." }, { status: 404 });
    }

    const jogadores = await prisma.jogador.findMany({
      where: { selecaoId: selecao.id },
      orderBy: { numeroCamisa: "asc" },
    });

    return NextResponse.json({ selecao, jogadores });
  } catch {
    return NextResponse.json(
      { message: "Erro ao carregar seleção." },
      { status: 500 }
    );
  }
}
