import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const sessao = await auth();
    if (!sessao?.user) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    const { mandanteId, visitanteId, golsMandante, golsVisitante, dataPartida, estadioId } = await req.json();

    if (golsMandante < 0 || golsVisitante < 0) {
      return NextResponse.json(
        { message: "Gols não podem ser negativos." },
        { status: 400 }
      );
    }

    const dadosPartida: Record<string, unknown> = {
      golsMandante,
      golsVisitante,
      jogadaPorId: sessao.user.id,
    };

    if (dataPartida) {
      dadosPartida.dataPartida = new Date(dataPartida);
    }

    if (estadioId) {
      dadosPartida.estadioId = estadioId;
    }

    const partidaExistente = await prisma.partida.findFirst({
      where: { mandanteId, visitanteId, fase: "grupos" },
    });

    if (partidaExistente) {
      await prisma.partida.update({
        where: { id: partidaExistente.id },
        data: dadosPartida,
      });
    } else {
      await prisma.partida.create({
        data: {
          mandanteId,
          visitanteId,
          ...dadosPartida,
          dataPartida: dataPartida ? new Date(dataPartida) : new Date(),
        } as Record<string, unknown> & { mandanteId: string; visitanteId: string },
      });
    }

    await recalcularSelecao(mandanteId);
    await recalcularSelecao(visitanteId);

    return NextResponse.json({ message: "Placar salvo com sucesso!" });
  } catch {
    return NextResponse.json(
      { message: "Erro ao salvar placar." },
      { status: 500 }
    );
  }
}

async function recalcularSelecao(selecaoId: string) {
  const partidas = await prisma.partida.findMany({
    where: {
      OR: [{ mandanteId: selecaoId }, { visitanteId: selecaoId }],
      fase: "grupos",
    },
  });

  let jogos = 0;
  let vitorias = 0;
  let empates = 0;
  let derrotas = 0;
  let golsPro = 0;
  let golsContra = 0;

  for (const p of partidas) {
    jogos++;
    const golsMandante = p.golsMandante ?? 0;
    const golsVisitante = p.golsVisitante ?? 0;

    if (p.mandanteId === selecaoId) {
      golsPro += golsMandante;
      golsContra += golsVisitante;
      if (golsMandante > golsVisitante) vitorias++;
      else if (golsMandante === golsVisitante) empates++;
      else derrotas++;
    } else {
      golsPro += golsVisitante;
      golsContra += golsMandante;
      if (golsVisitante > golsMandante) vitorias++;
      else if (golsVisitante === golsMandante) empates++;
      else derrotas++;
    }
  }

  const saldoGols = golsPro - golsContra;
  const pontos = vitorias * 3 + empates;

  await prisma.selecao.update({
    where: { id: selecaoId },
    data: { jogos, vitorias, empates, derrotas, golsPro, golsContra, saldoGols, pontos },
  });
}
