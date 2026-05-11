import { NewProductForm } from "../../../../components/forms/new-product-form/new-product-form";
export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col items-center gap-8">
      {/* Cabeçalho Premium e Localizado */}
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
          Anuncie seu Produto
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Desapegue do aquele produto que está parado na estante e faça um ótimo
          negócio com a comunidade do Jogaí!
        </p>
      </div>

      {/* Container do Formulário */}
      <div className="w-full">
        <NewProductForm />
      </div>
    </main>
  );
}
