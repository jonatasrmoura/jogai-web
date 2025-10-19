import Image from "next/image";
import { Button } from "../../../components/ui/button";

export default function HomePage() {
  return (
    <section className="h-screen container mx-auto px-6 py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-extrabold !leading-tight tracking-tighter">
            <span className="text-primary">Trade</span>
            {", Sell, or "} <span className="text-primary">Lend</span>{" "}
            {" Games Safely"}
          </h2>

          <p className="text-lg text-foreground-light/70 dark:text-foreground-dark/70">
            Join Jogaí, the platform where gamers can easily and securely
            exchange, sell, or lend their video games. Connect with other
            players, expand your collection, and share your passion for gaming.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button>Get Started</Button>
            <Button variant="secondary" className="bg-border">
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative w-full flex justify-center">
          {/* camada de efeito */}
          <div className="absolute -inset-4 bg-gradient-to-br rounded-xl opacity-30 blur-3xl" />

          {/* imagem real acima do efeito */}
          <Image
            src="/icons/controller.png"
            alt="jogo"
            width={500}
            height={500}
            className="relative"
            priority
          />
        </div>
      </div>
    </section>
  );
}
