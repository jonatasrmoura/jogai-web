export enum ProductConditionEnum {
  NEW = "NEW", // Produto na caixa, sem uso, com lacre original (se aplicável).
  OPEN_BOX = "OPEN_BOX", //  Produto tirado da caixa apenas para teste, sem NENHUMA marca de uso.
  USED_GOOD = "USED_GOOD", // Possui marcas normais e leves de uso, mas funciona 100%. (Aqui entra a grande maioria do C2C).
  USED_FAIR = "USED_FAIR", // Marcas pesadas de uso, arranhões visíveis, falta um cabo, mas a função principal funciona.
  DEFECTIVE_FOR_PARTS = "DEFECTIVE_FOR_PARTS", // (Com Defeito / Para Peças) - Não liga ou precisa de conserto.
  NOT_APPLICABLE = "NOT_APPLICABLE", // Não aplicável (Contas Upadas/Serviços Digitais)
}

// Exportamos também como um array constante para facilitar a vida do Zod
export const ProductConditionValues = [
  "NEW",
  "OPEN_BOX", // Juntei LIKE_NEW e OPEN_BOX aqui
  "USED_GOOD",
  "USED_FAIR",
  "DEFECTIVE_FOR_PARTS", // Deixei só um de defeito
  "NOT_APPLICABLE",
] as const;
