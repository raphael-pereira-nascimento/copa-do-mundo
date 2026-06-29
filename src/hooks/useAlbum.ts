import { create } from "zustand";

export interface FigurinhaData {
  id: string;
  numero: number;
  raridade: string;
  selecaoId: string;
  selecao: {
    nome: string;
    codigoIso: string;
    grupo: string;
    bandeiraUrl: string | null;
    figurinhaUrl: string | null;
  };
  obtida?: boolean;
  ehFavorita?: boolean;
  obtidaEm?: string;
}

interface AlbumState {
  figurinhas: FigurinhaData[];
  pacotes: number;
  carregando: boolean;
  carregarAlbum: () => Promise<void>;
  abrirPacote: () => Promise<FigurinhaData[]>;
}

export const useAlbum = create<AlbumState>((set, get) => ({
  figurinhas: [],
  pacotes: 0,
  carregando: true,

  carregarAlbum: async () => {
    try {
      const resposta = await fetch("/api/figurinhas");
      const dados = await resposta.json();
      set({
        figurinhas: dados.figurinhas,
        pacotes: dados.pacotes,
        carregando: false,
      });
    } catch {
      set({ carregando: false });
    }
  },

  abrirPacote: async () => {
    try {
      const resposta = await fetch("/api/figurinhas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acao: "abrirPacote" }),
      });

      if (!resposta.ok) throw new Error();

      const dados = await resposta.json();
      await get().carregarAlbum();
      return dados.novasFigurinhas;
    } catch {
      return [];
    }
  },
}));
