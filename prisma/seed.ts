import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const selecoes = [
  { nome: "México", codigoIso: "MEX", grupo: "A", jogos: 3, vitorias: 3, empates: 0, derrotas: 0, golsPro: 6, golsContra: 0, saldoGols: 6, pontosConduta: -6, pontos: 9, status: "classificado" },
  { nome: "África do Sul", codigoIso: "RSA", grupo: "A", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 2, golsContra: 3, saldoGols: -1, pontosConduta: -13, pontos: 4, status: "pendente" },
  { nome: "República da Coreia", codigoIso: "KOR", grupo: "A", jogos: 3, vitorias: 1, empates: 0, derrotas: 2, golsPro: 2, golsContra: 3, saldoGols: -1, pontosConduta: -4, pontos: 3, status: "eliminado" },
  { nome: "Tchéquia", codigoIso: "CZE", grupo: "A", jogos: 3, vitorias: 0, empates: 1, derrotas: 2, golsPro: 2, golsContra: 6, saldoGols: -4, pontosConduta: -1, pontos: 1, status: "eliminado" },

  { nome: "Suíça", codigoIso: "SUI", grupo: "B", jogos: 3, vitorias: 2, empates: 1, derrotas: 0, golsPro: 7, golsContra: 3, saldoGols: 4, pontosConduta: -3, pontos: 7, status: "classificado" },
  { nome: "Canadá", codigoIso: "CAN", grupo: "B", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 8, golsContra: 3, saldoGols: 5, pontosConduta: -5, pontos: 4, status: "pendente" },
  { nome: "Bósnia e Herzegovina", codigoIso: "BIH", grupo: "B", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 5, golsContra: 6, saldoGols: -1, pontosConduta: -10, pontos: 4, status: "pendente" },
  { nome: "Catar", codigoIso: "QAT", grupo: "B", jogos: 3, vitorias: 0, empates: 1, derrotas: 2, golsPro: 2, golsContra: 10, saldoGols: -8, pontosConduta: -12, pontos: 1, status: "eliminado" },

  { nome: "Brasil", codigoIso: "BRA", grupo: "C", jogos: 3, vitorias: 2, empates: 1, derrotas: 0, golsPro: 7, golsContra: 1, saldoGols: 6, pontosConduta: -5, pontos: 7, status: "classificado" },
  { nome: "Marrocos", codigoIso: "MAR", grupo: "C", jogos: 3, vitorias: 2, empates: 1, derrotas: 0, golsPro: 6, golsContra: 3, saldoGols: 3, pontosConduta: -1, pontos: 7, status: "pendente" },
  { nome: "Escócia", codigoIso: "SCO", grupo: "C", jogos: 3, vitorias: 1, empates: 0, derrotas: 2, golsPro: 1, golsContra: 4, saldoGols: -3, pontosConduta: -5, pontos: 3, status: "eliminado" },
  { nome: "Haiti", codigoIso: "HAI", grupo: "C", jogos: 3, vitorias: 0, empates: 0, derrotas: 3, golsPro: 2, golsContra: 8, saldoGols: -6, pontosConduta: -7, pontos: 0, status: "eliminado" },

  { nome: "EUA", codigoIso: "USA", grupo: "D", jogos: 3, vitorias: 2, empates: 0, derrotas: 1, golsPro: 8, golsContra: 4, saldoGols: 4, pontosConduta: -5, pontos: 6, status: "classificado" },
  { nome: "Austrália", codigoIso: "AUS", grupo: "D", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 2, golsContra: 2, saldoGols: 0, pontosConduta: -5, pontos: 4, status: "pendente" },
  { nome: "Paraguai", codigoIso: "PAR", grupo: "D", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 2, golsContra: 4, saldoGols: -2, pontosConduta: -12, pontos: 4, status: "pendente" },
  { nome: "Turquia", codigoIso: "TUR", grupo: "D", jogos: 3, vitorias: 1, empates: 0, derrotas: 2, golsPro: 3, golsContra: 5, saldoGols: -2, pontosConduta: -3, pontos: 3, status: "eliminado" },

  { nome: "Alemanha", codigoIso: "GER", grupo: "E", jogos: 3, vitorias: 2, empates: 0, derrotas: 1, golsPro: 10, golsContra: 4, saldoGols: 6, pontosConduta: -1, pontos: 6, status: "classificado" },
  { nome: "Costa do Marfim", codigoIso: "CIV", grupo: "E", jogos: 3, vitorias: 2, empates: 0, derrotas: 1, golsPro: 4, golsContra: 2, saldoGols: 2, pontosConduta: -4, pontos: 6, status: "pendente" },
  { nome: "Equador", codigoIso: "ECU", grupo: "E", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 2, golsContra: 2, saldoGols: 0, pontosConduta: -5, pontos: 4, status: "pendente" },
  { nome: "Curaçao", codigoIso: "CUW", grupo: "E", jogos: 3, vitorias: 0, empates: 1, derrotas: 2, golsPro: 1, golsContra: 9, saldoGols: -8, pontosConduta: -7, pontos: 1, status: "eliminado" },

  { nome: "Holanda", codigoIso: "NED", grupo: "F", jogos: 3, vitorias: 2, empates: 1, derrotas: 0, golsPro: 10, golsContra: 4, saldoGols: 6, pontosConduta: -3, pontos: 7, status: "classificado" },
  { nome: "Japão", codigoIso: "JPN", grupo: "F", jogos: 3, vitorias: 1, empates: 2, derrotas: 0, golsPro: 7, golsContra: 3, saldoGols: 4, pontosConduta: -1, pontos: 5, status: "pendente" },
  { nome: "Suécia", codigoIso: "SWE", grupo: "F", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 7, golsContra: 7, saldoGols: 0, pontosConduta: -5, pontos: 4, status: "pendente" },
  { nome: "Tunísia", codigoIso: "TUN", grupo: "F", jogos: 3, vitorias: 0, empates: 0, derrotas: 3, golsPro: 2, golsContra: 12, saldoGols: -10, pontosConduta: -1, pontos: 0, status: "eliminado" },

  { nome: "Bélgica", codigoIso: "BEL", grupo: "G", jogos: 3, vitorias: 1, empates: 2, derrotas: 0, golsPro: 6, golsContra: 2, saldoGols: 4, pontosConduta: -7, pontos: 5, status: "classificado" },
  { nome: "Egito", codigoIso: "EGY", grupo: "G", jogos: 3, vitorias: 1, empates: 2, derrotas: 0, golsPro: 5, golsContra: 3, saldoGols: 2, pontosConduta: -6, pontos: 5, status: "pendente" },
  { nome: "Irã", codigoIso: "IRI", grupo: "G", jogos: 3, vitorias: 0, empates: 3, derrotas: 0, golsPro: 3, golsContra: 3, saldoGols: 0, pontosConduta: -6, pontos: 3, status: "pendente" },
  { nome: "Nova Zelândia", codigoIso: "NZL", grupo: "G", jogos: 3, vitorias: 0, empates: 1, derrotas: 2, golsPro: 4, golsContra: 10, saldoGols: -6, pontosConduta: -4, pontos: 1, status: "eliminado" },

  { nome: "Espanha", codigoIso: "ESP", grupo: "H", jogos: 3, vitorias: 2, empates: 1, derrotas: 0, golsPro: 5, golsContra: 0, saldoGols: 5, pontosConduta: -2, pontos: 7, status: "classificado" },
  { nome: "Cabo Verde", codigoIso: "CPV", grupo: "H", jogos: 3, vitorias: 0, empates: 3, derrotas: 0, golsPro: 2, golsContra: 2, saldoGols: 0, pontosConduta: -4, pontos: 3, status: "pendente" },
  { nome: "Uruguai", codigoIso: "URU", grupo: "H", jogos: 3, vitorias: 0, empates: 2, derrotas: 1, golsPro: 3, golsContra: 4, saldoGols: -1, pontosConduta: -9, pontos: 2, status: "pendente" },
  { nome: "Arábia Saudita", codigoIso: "KSA", grupo: "H", jogos: 3, vitorias: 0, empates: 2, derrotas: 1, golsPro: 1, golsContra: 5, saldoGols: -4, pontosConduta: -6, pontos: 2, status: "eliminado" },

  { nome: "França", codigoIso: "FRA", grupo: "I", jogos: 3, vitorias: 3, empates: 0, derrotas: 0, golsPro: 10, golsContra: 2, saldoGols: 8, pontosConduta: -1, pontos: 9, status: "classificado" },
  { nome: "Noruega", codigoIso: "NOR", grupo: "I", jogos: 3, vitorias: 2, empates: 0, derrotas: 1, golsPro: 8, golsContra: 7, saldoGols: 1, pontosConduta: -1, pontos: 6, status: "pendente" },
  { nome: "Senegal", codigoIso: "SEN", grupo: "I", jogos: 3, vitorias: 1, empates: 0, derrotas: 2, golsPro: 8, golsContra: 6, saldoGols: 2, pontosConduta: -2, pontos: 3, status: "pendente" },
  { nome: "Iraque", codigoIso: "IRQ", grupo: "I", jogos: 3, vitorias: 0, empates: 0, derrotas: 3, golsPro: 1, golsContra: 12, saldoGols: -11, pontosConduta: -8, pontos: 0, status: "eliminado" },

  { nome: "Argentina", codigoIso: "ARG", grupo: "J", jogos: 3, vitorias: 3, empates: 0, derrotas: 0, golsPro: 8, golsContra: 1, saldoGols: 7, pontosConduta: -2, pontos: 9, status: "classificado" },
  { nome: "Áustria", codigoIso: "AUT", grupo: "J", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 6, golsContra: 6, saldoGols: 0, pontosConduta: -4, pontos: 4, status: "pendente" },
  { nome: "Argélia", codigoIso: "ALG", grupo: "J", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 5, golsContra: 7, saldoGols: -2, pontosConduta: -1, pontos: 4, status: "pendente" },
  { nome: "Jordânia", codigoIso: "JOR", grupo: "J", jogos: 3, vitorias: 0, empates: 0, derrotas: 3, golsPro: 3, golsContra: 8, saldoGols: -5, pontosConduta: -4, pontos: 0, status: "eliminado" },

  { nome: "Colômbia", codigoIso: "COL", grupo: "K", jogos: 3, vitorias: 2, empates: 1, derrotas: 0, golsPro: 4, golsContra: 1, saldoGols: 3, pontosConduta: -4, pontos: 7, status: "classificado" },
  { nome: "Portugal", codigoIso: "POR", grupo: "K", jogos: 3, vitorias: 1, empates: 2, derrotas: 0, golsPro: 6, golsContra: 1, saldoGols: 5, pontosConduta: -4, pontos: 5, status: "pendente" },
  { nome: "RD do Congo", codigoIso: "COD", grupo: "K", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 4, golsContra: 3, saldoGols: 1, pontosConduta: -5, pontos: 4, status: "pendente" },
  { nome: "Uzbequistão", codigoIso: "UZB", grupo: "K", jogos: 3, vitorias: 0, empates: 0, derrotas: 3, golsPro: 2, golsContra: 11, saldoGols: -9, pontosConduta: -4, pontos: 0, status: "eliminado" },

  { nome: "Inglaterra", codigoIso: "ENG", grupo: "L", jogos: 3, vitorias: 2, empates: 1, derrotas: 0, golsPro: 6, golsContra: 2, saldoGols: 4, pontosConduta: -2, pontos: 7, status: "classificado" },
  { nome: "Croácia", codigoIso: "CRO", grupo: "L", jogos: 3, vitorias: 2, empates: 0, derrotas: 1, golsPro: 5, golsContra: 5, saldoGols: 0, pontosConduta: -2, pontos: 6, status: "pendente" },
  { nome: "Gana", codigoIso: "GHA", grupo: "L", jogos: 3, vitorias: 1, empates: 1, derrotas: 1, golsPro: 2, golsContra: 2, saldoGols: 0, pontosConduta: -3, pontos: 4, status: "pendente" },
  { nome: "Panamá", codigoIso: "PAN", grupo: "L", jogos: 3, vitorias: 0, empates: 0, derrotas: 3, golsPro: 0, golsContra: 4, saldoGols: -4, pontosConduta: -5, pontos: 0, status: "eliminado" },
];

const estadios = [
  {
    nome: "MetLife Stadium",
    slug: "metlife-stadium",
    cidade: "East Rutherford",
    pais: "EUA",
    capacidade: 82500,
    anoConstrucao: 2010,
    descricao: "Estádio moderno localizado em Nova Jersey, próximo a Nova York.",
    historia: "Inaugurado em 2010, o MetLife Stadium é o estádio com maior capacidade da NFL. Será palco de jogos importantes da Copa do Mundo 2026, incluindo a final do torneio.",
    imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    ],
    coordenadas: "40.8135,-74.0745",
  },
  {
    nome: "AT&T Stadium",
    slug: "att-stadium",
    cidade: "Arlington",
    pais: "EUA",
    capacidade: 80000,
    anoConstrucao: 2009,
    descricao: "Estádio monumental no Texas, conhecido como 'Jerry World'.",
    historia: "O AT&T Stadium é um gigante do esporte localizado no Texas. Inaugurado em 2009, é famoso por sua arquitetura impressionante e capacidade de sediar grandes eventos.",
    imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    ],
    coordenadas: "32.7473,-97.0945",
  },
  {
    nome: "Mercedes-Benz Stadium",
    slug: "mercedes-benz-stadium",
    cidade: "Atlanta",
    pais: "EUA",
    capacidade: 71000,
    anoConstrucao: 2017,
    descricao: "Estádio futurista com teto retrátil em formato de pétala.",
    historia: "Inaugurado em 2017, o Mercedes-Benz Stadium é conhecido por seu teto retrátil inspirado em uma flor de oito pétalas. É um dos estádios mais tecnológicos do mundo.",
    imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    ],
    coordenadas: "33.7555,-84.4017",
  },
  {
    nome: "SoFi Stadium",
    slug: "sofi-stadium",
    cidade: "Inglewood",
    pais: "EUA",
    capacidade: 70240,
    anoConstrucao: 2020,
    descricao: "Estádio de última geração com tecnologia imersiva.",
    historia: "Inaugurado em 2020, o SoFi Stadium é um dos estádios mais caros e modernos já construídos. Com seu design inovador e telão de 360 graus, representa o futuro dos estádios esportivos.",
    imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    ],
    coordenadas: "33.9534,-118.3390",
  },
  {
    nome: "NRG Stadium",
    slug: "nrg-stadium",
    cidade: "Houston",
    pais: "EUA",
    capacidade: 72220,
    anoConstrucao: 2002,
    descricao: "Estádio coberto com teto retrátil no Texas.",
    historia: "Inaugurado em 2002, o NRG Stadium é a casa do Houston Texans da NFL. Seu teto retrátil e sistema de climatização o tornam ideal para grandes eventos esportivos.",
    imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    ],
    coordenadas: "29.6847,-95.4107",
  },
  {
    nome: "Levi's Stadium",
    slug: "levis-stadium",
    cidade: "Santa Clara",
    pais: "EUA",
    capacidade: 68500,
    anoConstrucao: 2014,
    descricao: "Estádio moderno no coração do Vale do Silício.",
    historia: "Inaugurado em 2014, o Levi's Stadium é a casa do San Francisco 49ers. Conhecido por sua arquitetura contemporânea e tecnologia de ponta, está localizado no coração do Vale do Silício.",
    imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    ],
    coordenadas: "37.4030,-121.9698",
  },
  {
    nome: "Lincoln Financial Field",
    slug: "lincoln-financial-field",
    cidade: "Filadélfia",
    pais: "EUA",
    capacidade: 69596,
    anoConstrucao: 2003,
    descricao: "Estádio icônico da Filadélfia, conhecido como 'The Linc'.",
    historia: "Inaugurado em 2003, o Lincoln Financial Field é a casa do Philadelphia Eagles. Sua atmosfera elétrica e localização privilegiada na Filadélfia o tornam um dos estádios mais emblemáticos dos EUA.",
    imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    ],
    coordenadas: "39.9008,-75.1675",
  },
  {
    nome: "Lumen Field",
    slug: "lumen-field",
    cidade: "Seattle",
    pais: "EUA",
    capacidade: 68740,
    anoConstrucao: 2002,
    descricao: "Estádio ao ar livre com vista para o centro de Seattle.",
    historia: "Inaugurado em 2002, o Lumen Field é a casa do Seattle Seahawks. Conhecido por sua atmosfera ensurdecedora e localização com vista para o centro de Seattle, é um dos estádios mais icônicos da Costa Oeste.",
    imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    ],
    coordenadas: "47.5952,-122.3316",
  },
  {
    nome: "Hard Rock Stadium",
    slug: "hard-rock-stadium",
    cidade: "Miami Gardens",
    pais: "EUA",
    capacidade: 65326,
    anoConstrucao: 1987,
    descricao: "Estádio modernizado em Miami, palco de Super Bowls e finais.",
    historia: "Inaugurado em 1987 e completamente renovado em 2015, o Hard Rock Stadium é a casa do Miami Dolphins. Palco de múltiplos Super Bowls e finais de tênis, é um dos estádios mais versáteis do mundo.",
    imagemPrincipal: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    ],
    coordenadas: "25.9580,-80.2389",
  },
  {
    nome: "Arrowhead Stadium",
    slug: "arrowhead-stadium",
    cidade: "Kansas City",
    pais: "EUA",
    capacidade: 76416,
    anoConstrucao: 1972,
    descricao: "Estádio lendário conhecido por sua atmosfera barulhenta.",
    historia: "Inaugurado em 1972, o Arrowhead Stadium é a casa do Kansas City Chiefs. Conhecido por deter o recorde de estádio mais barulhento do mundo, sua atmosfera é lendária no esporte americano.",
    imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    ],
    coordenadas: "39.0489,-94.4839",
  },
  {
    nome: "Gillette Stadium",
    slug: "gillette-stadium",
    cidade: "Foxborough",
    pais: "EUA",
    capacidade: 66829,
    anoConstrucao: 2002,
    descricao: "Estádio moderno em Massachusetts, próximo a Boston.",
    historia: "Localizado em Foxborough, Massachusetts, o Gillette Stadium é a casa do New England Patriots. Inaugurado em 2002, foi selecionado como uma das sedes americanas para a Copa de 2026.",
    imagemPrincipal: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    ],
    coordenadas: "42.0909,-71.2643",
  },
  {
    nome: "Estádio Azteca",
    slug: "estadio-azteca",
    cidade: "Cidade do México",
    pais: "México",
    capacidade: 87523,
    anoConstrucao: 1966,
    descricao: "Um dos estádios mais icônicos do mundo, palco de duas finais de Copa do Mundo.",
    historia: "Inaugurado em 1966, o Estádio Azteca é o terceiro maior estádio do mundo e o maior do México. Foi palco das finais das Copas de 1970 e 1986, sendo o único estádio a sediar duas finais do torneio.",
    imagemPrincipal: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    ],
    coordenadas: "19.3029,-99.1504",
  },
  {
    nome: "Estádio BBVA",
    slug: "estadio-bbva",
    cidade: "Guadalupe",
    pais: "México",
    capacidade: 53500,
    anoConstrucao: 2015,
    descricao: "Estádio moderno e sustentável, casa do Monterrey.",
    historia: "Inaugurado em 2015, o Estádio BBVA é considerado um dos estádios mais modernos da América Latina. Com design sustentável e tecnologia de ponta, foi selecionado para sediar jogos da Copa de 2026.",
    imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    ],
    coordenadas: "25.7200,-100.3124",
  },
  {
    nome: "Estádio Akron",
    slug: "estadio-akron",
    cidade: "Zapopan",
    pais: "México",
    capacidade: 49850,
    anoConstrucao: 2010,
    descricao: "Estádio moderno com design sustentável em Guadalajara.",
    historia: "Inaugurado em 2010, o Estádio Akron é a casa do Club Deportivo Guadalajara. Seu design moderno e compromisso com a sustentabilidade o tornam um dos estádios mais emblemáticos do México.",
    imagemPrincipal: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    ],
    coordenadas: "20.6826,-103.4618",
  },
  {
    nome: "BC Place",
    slug: "bc-place",
    cidade: "Vancouver",
    pais: "Canadá",
    capacidade: 54500,
    anoConstrucao: 1983,
    descricao: "Estádio coberto com teto retrátil, localizado em Vancouver.",
    historia: "O BC Place é um estádio multiuso localizado em Vancouver, Canadá. Inaugurado em 1983, passou por uma grande renovação em 2010 e possui um dos maiores tetos retráteis do mundo.",
    imagemPrincipal: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    ],
    coordenadas: "49.2766,-123.1119",
  },
  {
    nome: "BMO Field",
    slug: "bmo-field",
    cidade: "Toronto",
    pais: "Canadá",
    capacidade: 48200,
    anoConstrucao: 2007,
    descricao: "Estádio multiuso no coração de Toronto.",
    historia: "Localizado em Toronto, o BMO Field foi inaugurado em 2007 e é um dos principais centros esportivos do Canadá. Passou por expansões significativas e receberá jogos emocionantes da Copa de 2026.",
    imagemPrincipal: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    imagens: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    ],
    coordenadas: "43.6333,-79.4189",
  },
];

async function main() {
  console.log("Limpando banco de dados...");
  await prisma.usuarioFigurinha.deleteMany();
  await prisma.figurinha.deleteMany();
  await prisma.partida.deleteMany();
  await prisma.selecao.deleteMany();
  await prisma.estadio.deleteMany();
  await prisma.usuario.deleteMany();

  console.log("Inserindo seleções...");
  for (const s of selecoes) {
    await prisma.selecao.create({
      data: {
        nome: s.nome,
        codigoIso: s.codigoIso,
        grupo: s.grupo,
        jogos: s.jogos,
        vitorias: s.vitorias,
        empates: s.empates,
        derrotas: s.derrotas,
        golsPro: s.golsPro,
        golsContra: s.golsContra,
        saldoGols: s.saldoGols,
        pontosConduta: s.pontosConduta,
        pontos: s.pontos,
        status: s.status,
        bandeiraUrl: `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${s.codigoIso.toLowerCase()}.svg`,
        figurinhaUrl: `https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${s.codigoIso.toLowerCase()}.svg`,
      },
    });
  }

  console.log("Inserindo estádios...");
  for (const e of estadios) {
    await prisma.estadio.create({
      data: {
        nome: e.nome,
        slug: e.slug,
        cidade: e.cidade,
        pais: e.pais,
        capacidade: e.capacidade,
        anoConstrucao: e.anoConstrucao,
        descricao: e.descricao,
        historia: e.historia,
        imagemPrincipal: e.imagemPrincipal,
        imagens: e.imagens,
        coordenadas: e.coordenadas,
      },
    });
  }

  console.log("Criando figurinhas...");
  const todasSelecoes = await prisma.selecao.findMany({ orderBy: [{ grupo: "asc" }, { nome: "asc" }] });
  let numero = 1;
  for (const selecao of todasSelecoes) {
    const raridade = selecao.status === "classificado" ? "rara" : "comum";
    await prisma.figurinha.create({
      data: {
        numero,
        selecaoId: selecao.id,
        raridade,
      },
    });
    numero++;
  }

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
