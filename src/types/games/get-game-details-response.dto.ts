import type { GameConditionEnum } from "../../enums/game-condition.enum";
import type { GameGenreDTO } from "./game-genre.dto";
import type { GameImageDTO } from "./game-image.dto";

export interface GameSellerDTO {
  uuid: string;
  fullname: string;
  avatarUrl: string | null;
}

export interface GetGameDetailsResponseDTO {
  uuid: string;
  id: number;
  name: string;
  platform: string;
  condition: GameConditionEnum;
  isDigital: boolean;
  value: number;
  description: string;
  sold: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  user: GameSellerDTO;
  images: GameImageDTO[];
  genres: GameGenreDTO[];
}
