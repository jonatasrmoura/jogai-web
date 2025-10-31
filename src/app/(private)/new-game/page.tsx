import { NewGameForm } from "../../../components/forms/new-game-form/new-game-form";

export default function NewGamePage() {
  return (
    <main className="w-full flex flex-col items-center">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Register Your Game</h1>
        <p className="text-neutral-500">Share your game with the community!</p>
      </div>

      <NewGameForm />
    </main>
  );
}
