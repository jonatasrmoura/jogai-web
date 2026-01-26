import type { GameConditionEnum } from "../../enums/game-condition.enum";
import type { GameGenreDTO } from "./game-genre.dto";
import type { GameImageDTO } from "./game-image.dto";

export interface CreateGameResponseDTO {
  uuid: string;
  id: number;
  userUuid: string;
  name: string;
  platform: string;
  condition: GameConditionEnum;
  value: string;
  description: string;
  isDigital: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  genres: GameGenreDTO[];
  images: GameImageDTO[];
}
