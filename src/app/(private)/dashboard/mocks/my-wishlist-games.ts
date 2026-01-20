import { gamesExploreMock } from "./games-explore-mock";

// Teste rapido! essa logica esta incorreta, porem serve para simular a wishlist
export const myWishlistGames: ListGamesDTO[] = gamesExploreMock.filter(
  (game) => game.name,
);
