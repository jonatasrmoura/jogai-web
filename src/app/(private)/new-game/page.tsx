import { InputImageFile } from "../../../components/inputs/input-image-file";
import { InputLabel } from "../../../components/inputs/input-label";
import { SelectLabel } from "../../../components/selects/select-label";
import { Textarea } from "../../../components/ui/textarea";

import { listPlatforms } from "./mocks/list-platforms";

export default function NewGamePage() {
  return (
    <main className="w-full flex flex-col items-center">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Register Your Game</h1>
        <p className="text-neutral-500">Share your game with the community!</p>
      </div>

      <form className="max-w-md flex flex-col items-center gap-4 p-6">
        <InputImageFile label="Game Cover Image" id="gameCoverImage" />

        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2">
          <InputLabel
            label="Game Name"
            placeholder="Ex: God of War"
            id="name"
          />
          <SelectLabel label="Platform" data={listPlatforms} />
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2">
          <SelectLabel label="Genre" data={[]} />
          <SelectLabel label="Condition" data={[]} />
        </div>

        <InputLabel
          label="Game Value"
          id="price"
          placeholder="Enter to the game value"
        />

        <Textarea
          className="w-full h-32"
          placeholder="Describe your game, its condition, and any extra content."
        />
      </form>
    </main>
  );
}
