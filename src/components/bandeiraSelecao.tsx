import Image from "next/image";

interface BandeiraSelecaoProps {
  codigoIso: string;
  nome: string;
  tamanho?: number;
}

export function BandeiraSelecao({ codigoIso, nome, tamanho = 24 }: BandeiraSelecaoProps) {
  return (
    <div className="flex items-center gap-2" aria-label={`Bandeira de ${nome}`}>
      <Image
        src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${codigoIso.toLowerCase()}.svg`}
        alt={`Bandeira de ${nome}`}
        width={tamanho}
        height={tamanho * 0.75}
        className="rounded-sm object-cover"
        style={{ width: tamanho, height: tamanho * 0.75 }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
      <span className="font-medium text-sm">{nome}</span>
    </div>
  );
}
