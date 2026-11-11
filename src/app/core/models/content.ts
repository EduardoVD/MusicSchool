export interface Content {
  id: string;
  name: string;
  type: string;
  mark: string;
  assetNumber: string;
  stateConservation: string;
  acquisitionDate: string;
  loanAvailable: boolean;

  // Propriedades opcionais para compatibilidade com templates legados
  categoria?: string;
  titulo?: string;
  icone?: string;
  cor?: "azul" | "dourado" | "verde" | "lilas" | "coral" | string;
  resumo?: string;
  descricao?: string;
  autor?: string;
  formato?: string;
  acesso?: string;
  preco?: number;
  beneficios?: string[];
}

export type Conteudo = Content;

