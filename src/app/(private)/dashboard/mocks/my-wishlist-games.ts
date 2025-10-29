import { gamesExploreMock } from "./games-explore-mock";

export const myWishlistGames: GameExplore[] = gamesExploreMock.filter(
  (game) => game.isFavorite
);
