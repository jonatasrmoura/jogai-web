import { NewGameForm } from "../../../components/forms/new-game-form/new-game-form";
import { listGenresService } from "../../../services/genres/list-genres.service";

export default async function NewGamePage() {
  // Chamada à API para buscar as categorias
  const { data: listGenres } = await listGenresService({ limit: 50, page: 1 });

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col items-center gap-8">
      {/* Cabeçalho Premium e Localizado */}
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Anuncie seu Jogo
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Desapegue daquele jogo que está parado na estante e faça um ótimo
          negócio com a comunidade do Jogaí!
        </p>
      </div>

      {/* Container do Formulário */}
      <div className="w-full">
        <NewGameForm listGenres={listGenres} />
      </div>
    </main>
  );
}
