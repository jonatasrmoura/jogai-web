export const gamesExploreMock: ListGamesDTO[] = [
  {
    name: "The Last of Us Part II",
    images: [
      {
        url: "https://i.pinimg.com/1200x/61/af/25/61af251b095c18d44e23da648459244d.jpg",
        position: 1,
      },
    ],
    condition: "Used - Like New",
    description:
      "Experience the emotional journey of Ellie in a post-apocalyptic world.",
    genres: [
      { uuid: "1", name: "Action" },
      { uuid: "2", name: "Adventure" },
    ],
    uuid: "uuid-1",
    id: 1,
    sold: false,
    value: 120,
    platform: "PlayStation 4",
  },
  {
    name: "Spider-Man: Miles Morales",
    condition: "Used - Good",
    description: "Swing through New York City as the new Spider-Man.",
    genres: [
      { uuid: "1", name: "Action" },
      { uuid: "3", name: "Superhero" },
    ],
    id: 2,
    sold: false,
    uuid: "uuid-2",
    value: 150.0,
    images: [
      {
        url: "https://i.pinimg.com/1200x/c2/9f/80/c29f8035d13fad1f7d01308151197eef.jpg",
        position: 1,
      },
    ],
    platform: "PlayStation 5",
  },
];
