import { ProductConditionEnum } from "../../enums/product-condition.enum";

export const listConditionMock = [
  { value: ProductConditionEnum.NEW_OPENED, label: "Novo / Aberto" },
  {
    value: ProductConditionEnum.DEFECTIVE_FOR_PARTS,
    label: "Defeituoso (Apenas para peças)",
  },
  { value: ProductConditionEnum.NEW_SEALED, label: "Novo / Lacrado" },
  { value: ProductConditionEnum.NOT_APPLICABLE, label: "Não aplicável" },
  { value: ProductConditionEnum.USED_EXCELLENT, label: "Usado (Ótimo estado)" },
  { value: ProductConditionEnum.USED_GOOD, label: "Usado (Bom estado)" },
  {
    value: ProductConditionEnum.USED_FLAWED,
    label: "Usado (Arranhado / Pode falhar)",
  },
];
