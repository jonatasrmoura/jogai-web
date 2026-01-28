import { GameConditionEnum } from "../../enums/game-condition.enum";

export const listConditionMock = [
  { value: GameConditionEnum.NEW_SEALED, label: "Novo / Lacrado" },
  { value: GameConditionEnum.NEW_OPENED, label: "Novo (Aberto)" },
  { value: GameConditionEnum.REFURBISHED, label: "Seminovo" },
  { value: GameConditionEnum.USED_EXCELLENT, label: "Usado (Ótimo estado)" },
  { value: GameConditionEnum.USED_GOOD, label: "Usado (Bom estado)" },
  {
    value: GameConditionEnum.USED_LIGHT_SCRATCHES,
    label: "Usado (Arranhões leves)",
  },
  {
    value: GameConditionEnum.USED_FLAWED,
    label: "Usado (Arranhado / Pode falhar)",
  },
  {
    value: GameConditionEnum.DEFECTIVE,
    label: "Funcional, porém com defeitos",
  },
  {
    value: GameConditionEnum.FOR_PARTS,
    label: "Somente para peças / Não funciona",
  },
];
