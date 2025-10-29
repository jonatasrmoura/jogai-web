import { GamesExploreMock } from "./games-explore-mock";

export const myWishlistGames: GameExplore[] = GamesExploreMock.filter(
  (game) => game.isFavorite
);
