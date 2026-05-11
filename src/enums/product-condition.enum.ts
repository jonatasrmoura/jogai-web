export enum ProductConditionEnum {
  NEW_SEALED = "NEW_SEALED", // Novo Lacrado (Manga, Figure, Jogo)
  NEW_OPENED = "NEW_OPENED", // Novo Aberto (Apenas conferido)
  USED_EXCELLENT = "USED_EXCELLENT", // Usado - Estado de colecionador
  USED_GOOD = "USED_GOOD", // Usado - Bom estado
  USED_FLAWED = "USED_FLAWED", // Usado - Detalhes/Marcas de uso
  DEFECTIVE_FOR_PARTS = "DEFECTIVE_FOR_PARTS", // Defeituoso (Consoles/Periféricos)
  NOT_APPLICABLE = "NOT_APPLICABLE", // Não aplicável (Contas Upadas/Serviços Digitais)
}

// Exportamos também como um array constante para facilitar a vida do Zod
export const ProductConditionValues = [
  "NEW_SEALED",
  "NEW_OPENED",
  "USED_EXCELLENT",
  "USED_GOOD",
  "USED_FLAWED",
  "DEFECTIVE_FOR_PARTS",
  "NOT_APPLICABLE",
] as const;
