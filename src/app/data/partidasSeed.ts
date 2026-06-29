export interface PartidaSeed {
  mandanteIso: string;
  visitanteIso: string;
  estadioSlug: string;
  dataPartida: string;
  fase: string;
  grupo?: string;
}

export const partidasData: PartidaSeed[] = [
  // ========== GRUPO A ==========
  { mandanteIso: "MEX", visitanteIso: "RSA", estadioSlug: "estadio-azteca", dataPartida: "2026-06-11T16:00:00Z", fase: "grupos", grupo: "A" },
  { mandanteIso: "KOR", visitanteIso: "CZE", estadioSlug: "metlife-stadium", dataPartida: "2026-06-11T19:00:00Z", fase: "grupos", grupo: "A" },
  { mandanteIso: "MEX", visitanteIso: "KOR", estadioSlug: "hard-rock-stadium", dataPartida: "2026-06-16T16:00:00Z", fase: "grupos", grupo: "A" },
  { mandanteIso: "RSA", visitanteIso: "CZE", estadioSlug: "arrowhead-stadium", dataPartida: "2026-06-16T21:00:00Z", fase: "grupos", grupo: "A" },
  { mandanteIso: "MEX", visitanteIso: "CZE", estadioSlug: "metlife-stadium", dataPartida: "2026-06-22T16:00:00Z", fase: "grupos", grupo: "A" },
  { mandanteIso: "RSA", visitanteIso: "KOR", estadioSlug: "att-stadium", dataPartida: "2026-06-22T19:00:00Z", fase: "grupos", grupo: "A" },

  // ========== GRUPO B ==========
  { mandanteIso: "SUI", visitanteIso: "CAN", estadioSlug: "att-stadium", dataPartida: "2026-06-11T16:00:00Z", fase: "grupos", grupo: "B" },
  { mandanteIso: "BIH", visitanteIso: "QAT", estadioSlug: "mercedes-benz-stadium", dataPartida: "2026-06-11T21:00:00Z", fase: "grupos", grupo: "B" },
  { mandanteIso: "SUI", visitanteIso: "BIH", estadioSlug: "estadio-bbva", dataPartida: "2026-06-17T16:00:00Z", fase: "grupos", grupo: "B" },
  { mandanteIso: "CAN", visitanteIso: "QAT", estadioSlug: "estadio-akron", dataPartida: "2026-06-17T19:00:00Z", fase: "grupos", grupo: "B" },
  { mandanteIso: "SUI", visitanteIso: "QAT", estadioSlug: "mercedes-benz-stadium", dataPartida: "2026-06-22T16:00:00Z", fase: "grupos", grupo: "B" },
  { mandanteIso: "CAN", visitanteIso: "BIH", estadioSlug: "sofi-stadium", dataPartida: "2026-06-22T19:00:00Z", fase: "grupos", grupo: "B" },

  // ========== GRUPO C ==========
  { mandanteIso: "BRA", visitanteIso: "MAR", estadioSlug: "lumen-field", dataPartida: "2026-06-12T16:00:00Z", fase: "grupos", grupo: "C" },
  { mandanteIso: "SCO", visitanteIso: "HAI", estadioSlug: "hard-rock-stadium", dataPartida: "2026-06-12T19:00:00Z", fase: "grupos", grupo: "C" },
  { mandanteIso: "BRA", visitanteIso: "SCO", estadioSlug: "bc-place", dataPartida: "2026-06-17T16:00:00Z", fase: "grupos", grupo: "C" },
  { mandanteIso: "MAR", visitanteIso: "HAI", estadioSlug: "bmo-field", dataPartida: "2026-06-17T19:00:00Z", fase: "grupos", grupo: "C" },
  { mandanteIso: "BRA", visitanteIso: "HAI", estadioSlug: "nrg-stadium", dataPartida: "2026-06-23T16:00:00Z", fase: "grupos", grupo: "C" },
  { mandanteIso: "MAR", visitanteIso: "SCO", estadioSlug: "levis-stadium", dataPartida: "2026-06-23T19:00:00Z", fase: "grupos", grupo: "C" },

  // ========== GRUPO D ==========
  { mandanteIso: "USA", visitanteIso: "AUS", estadioSlug: "arrowhead-stadium", dataPartida: "2026-06-12T16:00:00Z", fase: "grupos", grupo: "D" },
  { mandanteIso: "PAR", visitanteIso: "TUR", estadioSlug: "gillette-stadium", dataPartida: "2026-06-12T19:00:00Z", fase: "grupos", grupo: "D" },
  { mandanteIso: "USA", visitanteIso: "PAR", estadioSlug: "metlife-stadium", dataPartida: "2026-06-18T16:00:00Z", fase: "grupos", grupo: "D" },
  { mandanteIso: "AUS", visitanteIso: "TUR", estadioSlug: "att-stadium", dataPartida: "2026-06-18T19:00:00Z", fase: "grupos", grupo: "D" },
  { mandanteIso: "USA", visitanteIso: "TUR", estadioSlug: "lincoln-financial-field", dataPartida: "2026-06-23T16:00:00Z", fase: "grupos", grupo: "D" },
  { mandanteIso: "AUS", visitanteIso: "PAR", estadioSlug: "lumen-field", dataPartida: "2026-06-23T21:00:00Z", fase: "grupos", grupo: "D" },

  // ========== GRUPO E ==========
  { mandanteIso: "GER", visitanteIso: "CIV", estadioSlug: "estadio-bbva", dataPartida: "2026-06-13T16:00:00Z", fase: "grupos", grupo: "E" },
  { mandanteIso: "ECU", visitanteIso: "CUW", estadioSlug: "estadio-akron", dataPartida: "2026-06-13T21:00:00Z", fase: "grupos", grupo: "E" },
  { mandanteIso: "GER", visitanteIso: "ECU", estadioSlug: "mercedes-benz-stadium", dataPartida: "2026-06-18T16:00:00Z", fase: "grupos", grupo: "E" },
  { mandanteIso: "CIV", visitanteIso: "CUW", estadioSlug: "sofi-stadium", dataPartida: "2026-06-18T19:00:00Z", fase: "grupos", grupo: "E" },
  { mandanteIso: "GER", visitanteIso: "CUW", estadioSlug: "hard-rock-stadium", dataPartida: "2026-06-24T16:00:00Z", fase: "grupos", grupo: "E" },
  { mandanteIso: "CIV", visitanteIso: "ECU", estadioSlug: "arrowhead-stadium", dataPartida: "2026-06-24T19:00:00Z", fase: "grupos", grupo: "E" },

  // ========== GRUPO F ==========
  { mandanteIso: "NED", visitanteIso: "JPN", estadioSlug: "bc-place", dataPartida: "2026-06-13T16:00:00Z", fase: "grupos", grupo: "F" },
  { mandanteIso: "SWE", visitanteIso: "TUN", estadioSlug: "bmo-field", dataPartida: "2026-06-13T19:00:00Z", fase: "grupos", grupo: "F" },
  { mandanteIso: "NED", visitanteIso: "SWE", estadioSlug: "nrg-stadium", dataPartida: "2026-06-19T16:00:00Z", fase: "grupos", grupo: "F" },
  { mandanteIso: "JPN", visitanteIso: "TUN", estadioSlug: "levis-stadium", dataPartida: "2026-06-19T19:00:00Z", fase: "grupos", grupo: "F" },
  { mandanteIso: "NED", visitanteIso: "TUN", estadioSlug: "gillette-stadium", dataPartida: "2026-06-24T16:00:00Z", fase: "grupos", grupo: "F" },
  { mandanteIso: "JPN", visitanteIso: "SWE", estadioSlug: "estadio-azteca", dataPartida: "2026-06-24T19:00:00Z", fase: "grupos", grupo: "F" },

  // ========== GRUPO G ==========
  { mandanteIso: "BEL", visitanteIso: "EGY", estadioSlug: "metlife-stadium", dataPartida: "2026-06-14T16:00:00Z", fase: "grupos", grupo: "G" },
  { mandanteIso: "IRI", visitanteIso: "NZL", estadioSlug: "att-stadium", dataPartida: "2026-06-14T19:00:00Z", fase: "grupos", grupo: "G" },
  { mandanteIso: "BEL", visitanteIso: "IRI", estadioSlug: "lincoln-financial-field", dataPartida: "2026-06-19T16:00:00Z", fase: "grupos", grupo: "G" },
  { mandanteIso: "EGY", visitanteIso: "NZL", estadioSlug: "lumen-field", dataPartida: "2026-06-19T21:00:00Z", fase: "grupos", grupo: "G" },
  { mandanteIso: "BEL", visitanteIso: "NZL", estadioSlug: "estadio-bbva", dataPartida: "2026-06-25T16:00:00Z", fase: "grupos", grupo: "G" },
  { mandanteIso: "EGY", visitanteIso: "IRI", estadioSlug: "estadio-akron", dataPartida: "2026-06-25T21:00:00Z", fase: "grupos", grupo: "G" },

  // ========== GRUPO H ==========
  { mandanteIso: "ESP", visitanteIso: "CPV", estadioSlug: "mercedes-benz-stadium", dataPartida: "2026-06-14T16:00:00Z", fase: "grupos", grupo: "H" },
  { mandanteIso: "URU", visitanteIso: "KSA", estadioSlug: "sofi-stadium", dataPartida: "2026-06-14T19:00:00Z", fase: "grupos", grupo: "H" },
  { mandanteIso: "ESP", visitanteIso: "URU", estadioSlug: "hard-rock-stadium", dataPartida: "2026-06-20T16:00:00Z", fase: "grupos", grupo: "H" },
  { mandanteIso: "CPV", visitanteIso: "KSA", estadioSlug: "arrowhead-stadium", dataPartida: "2026-06-20T19:00:00Z", fase: "grupos", grupo: "H" },
  { mandanteIso: "ESP", visitanteIso: "KSA", estadioSlug: "bc-place", dataPartida: "2026-06-25T16:00:00Z", fase: "grupos", grupo: "H" },
  { mandanteIso: "CPV", visitanteIso: "URU", estadioSlug: "bmo-field", dataPartida: "2026-06-25T19:00:00Z", fase: "grupos", grupo: "H" },

  // ========== GRUPO I ==========
  { mandanteIso: "FRA", visitanteIso: "NOR", estadioSlug: "nrg-stadium", dataPartida: "2026-06-15T16:00:00Z", fase: "grupos", grupo: "I" },
  { mandanteIso: "SEN", visitanteIso: "IRQ", estadioSlug: "levis-stadium", dataPartida: "2026-06-15T19:00:00Z", fase: "grupos", grupo: "I" },
  { mandanteIso: "FRA", visitanteIso: "SEN", estadioSlug: "gillette-stadium", dataPartida: "2026-06-20T16:00:00Z", fase: "grupos", grupo: "I" },
  { mandanteIso: "NOR", visitanteIso: "IRQ", estadioSlug: "estadio-azteca", dataPartida: "2026-06-20T19:00:00Z", fase: "grupos", grupo: "I" },
  { mandanteIso: "FRA", visitanteIso: "IRQ", estadioSlug: "metlife-stadium", dataPartida: "2026-06-26T16:00:00Z", fase: "grupos", grupo: "I" },
  { mandanteIso: "NOR", visitanteIso: "SEN", estadioSlug: "att-stadium", dataPartida: "2026-06-26T19:00:00Z", fase: "grupos", grupo: "I" },

  // ========== GRUPO J ==========
  { mandanteIso: "ARG", visitanteIso: "AUT", estadioSlug: "lincoln-financial-field", dataPartida: "2026-06-15T16:00:00Z", fase: "grupos", grupo: "J" },
  { mandanteIso: "ALG", visitanteIso: "JOR", estadioSlug: "lumen-field", dataPartida: "2026-06-15T19:00:00Z", fase: "grupos", grupo: "J" },
  { mandanteIso: "ARG", visitanteIso: "ALG", estadioSlug: "estadio-bbva", dataPartida: "2026-06-21T16:00:00Z", fase: "grupos", grupo: "J" },
  { mandanteIso: "AUT", visitanteIso: "JOR", estadioSlug: "estadio-akron", dataPartida: "2026-06-21T19:00:00Z", fase: "grupos", grupo: "J" },
  { mandanteIso: "ARG", visitanteIso: "JOR", estadioSlug: "mercedes-benz-stadium", dataPartida: "2026-06-26T16:00:00Z", fase: "grupos", grupo: "J" },
  { mandanteIso: "AUT", visitanteIso: "ALG", estadioSlug: "sofi-stadium", dataPartida: "2026-06-26T19:00:00Z", fase: "grupos", grupo: "J" },

  // ========== GRUPO K ==========
  { mandanteIso: "COL", visitanteIso: "POR", estadioSlug: "sofi-stadium", dataPartida: "2026-06-11T16:00:00Z", fase: "grupos", grupo: "K" },
  { mandanteIso: "COD", visitanteIso: "UZB", estadioSlug: "nrg-stadium", dataPartida: "2026-06-11T19:00:00Z", fase: "grupos", grupo: "K" },
  { mandanteIso: "COL", visitanteIso: "COD", estadioSlug: "bc-place", dataPartida: "2026-06-21T16:00:00Z", fase: "grupos", grupo: "K" },
  { mandanteIso: "POR", visitanteIso: "UZB", estadioSlug: "bmo-field", dataPartida: "2026-06-21T21:00:00Z", fase: "grupos", grupo: "K" },
  { mandanteIso: "COL", visitanteIso: "UZB", estadioSlug: "nrg-stadium", dataPartida: "2026-06-27T16:00:00Z", fase: "grupos", grupo: "K" },
  { mandanteIso: "POR", visitanteIso: "COD", estadioSlug: "levis-stadium", dataPartida: "2026-06-27T19:00:00Z", fase: "grupos", grupo: "K" },

  // ========== GRUPO L ==========
  { mandanteIso: "ENG", visitanteIso: "CRO", estadioSlug: "levis-stadium", dataPartida: "2026-06-11T16:00:00Z", fase: "grupos", grupo: "L" },
  { mandanteIso: "GHA", visitanteIso: "PAN", estadioSlug: "lincoln-financial-field", dataPartida: "2026-06-11T19:00:00Z", fase: "grupos", grupo: "L" },
  { mandanteIso: "ENG", visitanteIso: "GHA", estadioSlug: "gillette-stadium", dataPartida: "2026-06-16T16:00:00Z", fase: "grupos", grupo: "L" },
  { mandanteIso: "CRO", visitanteIso: "PAN", estadioSlug: "estadio-azteca", dataPartida: "2026-06-16T19:00:00Z", fase: "grupos", grupo: "L" },
  { mandanteIso: "ENG", visitanteIso: "PAN", estadioSlug: "lincoln-financial-field", dataPartida: "2026-06-27T16:00:00Z", fase: "grupos", grupo: "L" },
  { mandanteIso: "CRO", visitanteIso: "GHA", estadioSlug: "lumen-field", dataPartida: "2026-06-27T21:00:00Z", fase: "grupos", grupo: "L" },

  // ========== ROUND OF 32 (trintaEDoisAvos) ==========
  // Jun 28
  { mandanteIso: "TBD1", visitanteIso: "TBD2", estadioSlug: "hard-rock-stadium", dataPartida: "2026-06-28T16:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD3", visitanteIso: "TBD4", estadioSlug: "arrowhead-stadium", dataPartida: "2026-06-28T19:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD5", visitanteIso: "TBD6", estadioSlug: "gillette-stadium", dataPartida: "2026-06-28T21:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD7", visitanteIso: "TBD8", estadioSlug: "estadio-azteca", dataPartida: "2026-06-28T16:00:00Z", fase: "trintaEDoisAvos" },
  // Jun 29
  { mandanteIso: "TBD9", visitanteIso: "TBD10", estadioSlug: "estadio-bbva", dataPartida: "2026-06-29T19:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD11", visitanteIso: "TBD12", estadioSlug: "estadio-akron", dataPartida: "2026-06-29T21:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD13", visitanteIso: "TBD14", estadioSlug: "bc-place", dataPartida: "2026-06-29T16:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD15", visitanteIso: "TBD16", estadioSlug: "bmo-field", dataPartida: "2026-06-29T19:00:00Z", fase: "trintaEDoisAvos" },
  // Jun 30
  { mandanteIso: "TBD17", visitanteIso: "TBD18", estadioSlug: "metlife-stadium", dataPartida: "2026-06-30T21:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD19", visitanteIso: "TBD20", estadioSlug: "att-stadium", dataPartida: "2026-06-30T16:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD21", visitanteIso: "TBD22", estadioSlug: "mercedes-benz-stadium", dataPartida: "2026-06-30T19:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD23", visitanteIso: "TBD24", estadioSlug: "sofi-stadium", dataPartida: "2026-06-30T21:00:00Z", fase: "trintaEDoisAvos" },
  // Jul 1
  { mandanteIso: "TBD25", visitanteIso: "TBD26", estadioSlug: "nrg-stadium", dataPartida: "2026-07-01T16:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD27", visitanteIso: "TBD28", estadioSlug: "levis-stadium", dataPartida: "2026-07-01T19:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD29", visitanteIso: "TBD30", estadioSlug: "lincoln-financial-field", dataPartida: "2026-07-01T21:00:00Z", fase: "trintaEDoisAvos" },
  { mandanteIso: "TBD31", visitanteIso: "TBD32", estadioSlug: "lumen-field", dataPartida: "2026-07-01T16:00:00Z", fase: "trintaEDoisAvos" },

  // ========== ROUND OF 16 (oitavas) ==========
  // Jul 3
  { mandanteIso: "TBD33", visitanteIso: "TBD34", estadioSlug: "hard-rock-stadium", dataPartida: "2026-07-03T16:00:00Z", fase: "oitavas" },
  { mandanteIso: "TBD35", visitanteIso: "TBD36", estadioSlug: "arrowhead-stadium", dataPartida: "2026-07-03T19:00:00Z", fase: "oitavas" },
  // Jul 4
  { mandanteIso: "TBD37", visitanteIso: "TBD38", estadioSlug: "gillette-stadium", dataPartida: "2026-07-04T16:00:00Z", fase: "oitavas" },
  { mandanteIso: "TBD39", visitanteIso: "TBD40", estadioSlug: "estadio-azteca", dataPartida: "2026-07-04T19:00:00Z", fase: "oitavas" },
  // Jul 5
  { mandanteIso: "TBD41", visitanteIso: "TBD42", estadioSlug: "estadio-bbva", dataPartida: "2026-07-05T16:00:00Z", fase: "oitavas" },
  { mandanteIso: "TBD43", visitanteIso: "TBD44", estadioSlug: "estadio-akron", dataPartida: "2026-07-05T19:00:00Z", fase: "oitavas" },
  // Jul 6
  { mandanteIso: "TBD45", visitanteIso: "TBD46", estadioSlug: "bc-place", dataPartida: "2026-07-06T16:00:00Z", fase: "oitavas" },
  { mandanteIso: "TBD47", visitanteIso: "TBD48", estadioSlug: "bmo-field", dataPartida: "2026-07-06T19:00:00Z", fase: "oitavas" },

  // ========== QUARTERFINALS (quartas) ==========
  // Jul 9
  { mandanteIso: "TBD49", visitanteIso: "TBD50", estadioSlug: "metlife-stadium", dataPartida: "2026-07-09T16:00:00Z", fase: "quartas" },
  { mandanteIso: "TBD51", visitanteIso: "TBD52", estadioSlug: "att-stadium", dataPartida: "2026-07-09T19:00:00Z", fase: "quartas" },
  // Jul 10
  { mandanteIso: "TBD53", visitanteIso: "TBD54", estadioSlug: "mercedes-benz-stadium", dataPartida: "2026-07-10T16:00:00Z", fase: "quartas" },
  { mandanteIso: "TBD55", visitanteIso: "TBD56", estadioSlug: "sofi-stadium", dataPartida: "2026-07-10T19:00:00Z", fase: "quartas" },

  // ========== SEMIFINALS (semifinal) ==========
  { mandanteIso: "TBD57", visitanteIso: "TBD58", estadioSlug: "nrg-stadium", dataPartida: "2026-07-14T19:00:00Z", fase: "semifinal" },
  { mandanteIso: "TBD59", visitanteIso: "TBD60", estadioSlug: "levis-stadium", dataPartida: "2026-07-15T19:00:00Z", fase: "semifinal" },

  // ========== THIRD PLACE (terceiro-lugar) ==========
  { mandanteIso: "TBD61", visitanteIso: "TBD62", estadioSlug: "lincoln-financial-field", dataPartida: "2026-07-18T16:00:00Z", fase: "terceiro-lugar" },

  // ========== FINAL (final) ==========
  { mandanteIso: "TBD63", visitanteIso: "TBD64", estadioSlug: "metlife-stadium", dataPartida: "2026-07-19T16:00:00Z", fase: "final" },
];
