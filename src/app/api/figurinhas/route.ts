import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const sessao = await auth();
    if (!sessao?.user?.email) {
      const todasFigurinhas = await prisma.figurinha.findMany({
        include: { selecao: { select: { nome: true, codigoIso: true, grupo: true, bandeiraUrl: true, figurinhaUrl: true } } },
        orderBy: { numero: "asc" },
      });

      return NextResponse.json({
        figurinhas: todasFigurinhas.map((f) => ({ ...f, obtida: false })),
        pacotes: 0,
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email: sessao.user.email },
    });

    if (!usuario) {
      return NextResponse.json({ message: "Usuário não encontrado." }, { status: 404 });
    }

    const todasFigurinhas = await prisma.figurinha.findMany({
      include: { selecao: { select: { nome: true, codigoIso: true, grupo: true, bandeiraUrl: true, figurinhaUrl: true } } },
      orderBy: { numero: "asc" },
    });

    const minhasFigurinhas = await prisma.usuarioFigurinha.findMany({
      where: { usuarioId: usuario.id },
    });

    const figurinhaIds = new Set(minhasFigurinhas.map((uf) => uf.figurinhaId));

    const figurinhas = todasFigurinhas.map((f) => ({
      ...f,
      obtida: figurinhaIds.has(f.id),
      ehFavorita: minhasFigurinhas.find((uf) => uf.figurinhaId === f.id)?.ehFavorita || false,
      obtidaEm: minhasFigurinhas.find((uf) => uf.figurinhaId === f.id)?.obtidaEm.toISOString() || null,
    }));

    return NextResponse.json({ figurinhas, pacotes: usuario.pacotes });
  } catch {
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const sessao = await auth();
    if (!sessao?.user?.email) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email: sessao.user.email },
    });

    if (!usuario) {
      return NextResponse.json({ message: "Usuário não encontrado." }, { status: 404 });
    }

    if (usuario.pacotes <= 0) {
      return NextResponse.json({ message: "Sem pacotes disponíveis." }, { status: 400 });
    }

    const minhasFigurinhas = await prisma.usuarioFigurinha.findMany({
      where: { usuarioId: usuario.id },
      select: { figurinhaId: true },
    });

    const idsObtidos = new Set(minhasFigurinhas.map((f) => f.figurinhaId));

    const figurinhasDisponiveis = await prisma.figurinha.findMany({
      where: { id: { notIn: Array.from(idsObtidos) } },
    });

    const todasFigurinhas = await prisma.figurinha.findMany();

    const selecionadas: string[] = [];
    const novasFigurinhas: Array<{ id: string; numero: number; raridade: string; selecao: { nome: string; codigoIso: string; grupo: string } }> = [];

    const pool = figurinhasDisponiveis.length > 0 ? figurinhasDisponiveis : todasFigurinhas;

    const embaralhadas = [...pool].sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(5, embaralhadas.length); i++) {
      const fig = embaralhadas[i];
      selecionadas.push(fig.id);

      if (!idsObtidos.has(fig.id)) {
        await prisma.usuarioFigurinha.create({
          data: { usuarioId: usuario.id, figurinhaId: fig.id },
        });
      }

      const selecao = await prisma.selecao.findUnique({
        where: { id: fig.selecaoId },
        select: { nome: true, codigoIso: true, grupo: true },
      });

      novasFigurinhas.push({
        id: fig.id,
        numero: fig.numero,
        raridade: fig.raridade,
        selecao: selecao!,
      });
    }

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { pacotes: usuario.pacotes - 1 },
    });

    return NextResponse.json({ novasFigurinhas });
  } catch {
    return NextResponse.json({ message: "Erro interno." }, { status: 500 });
  }
}
