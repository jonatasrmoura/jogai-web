import { ProductConditionEnum } from "../../enums/product-condition.enum";

export const listConditionMock = [
  { value: ProductConditionEnum.NEW, label: "Novo" },
  {
    value: ProductConditionEnum.OPEN_BOX,
    label: "Novo (Aberto para teste, sem marcas de uso)",
  },
  { value: ProductConditionEnum.USED_GOOD, label: "Usado (Bom estado)" },
  { value: ProductConditionEnum.USED_FAIR, label: "Usado (Estado médio)" },
  {
    value: ProductConditionEnum.DEFECTIVE_FOR_PARTS,
    label: "Defeituoso (Apenas para peças)",
  },
  {
    value: ProductConditionEnum.NOT_APPLICABLE,
    label: "Não aplicável",
  },
];
