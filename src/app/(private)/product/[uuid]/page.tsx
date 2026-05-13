import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  ShieldCheck,
  MessageCircle,
  ChevronLeft,
  Gamepad2,
  ImageIcon,
} from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { api } from "../../../../services/api";
import type { GetProductDetailsResponseDTO } from "../../../../types/products/get-product-details-response.dto";
import { FavoriteButton } from "../../../../components/buttons/favorite-button";
import { NoAvatarProfile } from "../../../../components/no-avatar-profile";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  const product = await api<GetProductDetailsResponseDTO>(`/products/${uuid}`, {
    method: "GET",
    cache: "force-cache",
    next: { tags: ["toggle-favorite-product"] },
  });

  if (!product) {
    return (
      <div className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-background text-foreground gap-4">
        <Gamepad2 className="w-12 h-12 text-muted-foreground animate-pulse" />
        <p className="text-xl font-bold">
          Anúncio não encontrado ou indisponível.
        </p>
        <Button asChild variant="outline">
          <Link href="/marketplace" aria-label="Voltar para a vitrine">
            Voltar para a Vitrine
          </Link>
        </Button>
      </div>
    );
  }

  // Tratamento seguro para arrays de imagens vazios
  const hasImages = product.images && product.images.length > 0;
  const mainImage = hasImages ? product.images[0] : null;
  const thumbnails = hasImages ? product.images.slice(1) : [];

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Bar / Breadcrumb */}
      <div className="border-b border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
          <Link
            href="/marketplace"
            aria-label="Voltar para a página anterior"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Voltar para a Vitrine
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* LADO ESQUERDO: Galeria Visual e Descrição (60% do espaço) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-8">
            {/* Galeria Premium */}
            <div className="space-y-4">
              {/* Imagem Principal Hero */}
              <div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden bg-muted border border-border shadow-sm group flex items-center justify-center">
                {mainImage ? (
                  <>
                    <Image
                      src={mainImage.url}
                      alt={`Capa principal do produto ${product.name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </>
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                    <span>Sem imagem</span>
                  </div>
                )}
              </div>

              {/* Miniaturas (Grid impecável em CSS) */}
              {thumbnails.length > 0 && (
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  {thumbnails.map((image, index) => (
                    <div
                      key={image.url}
                      className="relative w-full aspect-square rounded-2xl overflow-hidden bg-muted border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <Image
                        src={image.url}
                        alt={`Imagem detalhada ${index + 1} de ${product.name}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 25vw, 15vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Descrição do Produto (Fica abaixo das imagens na leitura fluida) */}
            <div className="mt-4 space-y-4">
              <h2 className="font-bold text-2xl tracking-tight text-foreground">
                Sobre o item
              </h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Buy Box Sticky (Gatilhos de Venda) (40% do espaço) */}
          <aside className="w-full lg:w-[40%] sticky top-24 space-y-8">
            {/* Caixa Principal de Ação */}
            <div className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-xl shadow-primary/5 relative">
              {/* Botão de Favoritar flutuando suavemente no topo */}
              <FavoriteButton
                productUuid={product.uuid}
                productName={product.name}
                isFavorite={product.isFavorite}
                className="absolute top-6 right-6"
              />

              {/* Tags de Classificação (Corrigido para category.name) */}
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4 pr-12">
                <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {product.category.name}
                </span>
                <span className="text-muted-foreground border border-border px-3 py-1 rounded-full">
                  {product.condition === "NEW" ? "Lacre Original" : "Usado"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-8">
                {product.name}
              </h1>

              {/* Área de Preço */}
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-medium text-muted-foreground">
                    R$
                  </span>
                  <span className="text-5xl font-black text-primary tracking-tighter">
                    {product.value.toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    className="w-full h-14 font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                    aria-label={`Comprar ${product.name} por R$ ${product.value.toFixed(2)}`}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar Agora
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-14 font-semibold text-base bg-background/50 hover:bg-muted"
                    aria-label="Enviar mensagem ao vendedor"
                  >
                    <MessageCircle className="w-5 h-5 mr-2 text-muted-foreground" />
                    Fazer uma oferta
                  </Button>
                </div>
              </div>

              {/* Trust Badges (Garantia) */}
              <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>
                    <strong>Compra Garantida</strong> pelo Jogaí.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Gamepad2 className="w-5 h-5 text-indigo-500" />
                  <span>
                    Receba o produto que esperava ou devolvemos seu dinheiro.
                  </span>
                </div>
              </div>
            </div>

            {/* Informações do Vendedor (Corrigido user para seller) */}
            <div
              className="p-6 rounded-3xl bg-muted/30 border border-border hover:border-primary/30 transition-colors flex items-center justify-between group cursor-pointer"
              aria-label={`Ver perfil do vendedor ${product.seller.fullname}`}
            >
              <div className="flex items-center gap-4">
                {product.seller.avatarUrl ? (
                  <Image
                    src={product.seller.avatarUrl}
                    alt={`Avatar de ${product.seller.fullname}`}
                    className="w-14 h-14 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
                    width={56}
                    height={56}
                  />
                ) : (
                  <div className="w-14 h-14 text-lg border border-border flex items-center justify-center rounded-full bg-background shadow-sm group-hover:scale-105 transition-transform">
                    <NoAvatarProfile userName={product.seller.fullname} />
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">
                    Vendido por
                  </p>
                  <p className="font-bold text-foreground">
                    {product.seller.fullname}
                  </p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180 group-hover:text-primary transition-colors" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
