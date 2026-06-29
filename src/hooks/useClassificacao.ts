import { create } from "zustand";

interface SelecaoData {
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

interface PartidaData {
  id: string;
  mandanteId: string;
  visitanteId: string;
  golsMandante: number;
  golsVisitante: number;
  mandante: { nome: string; codigoIso: string };
  visitante: { nome: string; codigoIso: string };
}

interface ClassificacaoState {
  selecoes: SelecaoData[];
  partidas: PartidaData[];
  carregando: boolean;
  carregarDados: () => Promise<void>;
}

export const useClassificacao = create<ClassificacaoState>((set) => ({
  selecoes: [],
  partidas: [],
  carregando: true,

  carregarDados: async () => {
    try {
      const resposta = await fetch("/api/classificacao");
      const dados = await resposta.json();
      set({ selecoes: dados.selecoes, partidas: dados.partidas, carregando: false });
    } catch {
      set({ carregando: false });
    }
  },
}));
