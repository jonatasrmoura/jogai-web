import { listMyProductsService } from "../../services/products/list-my-products.service";
import { ProductCard } from "../cards/product-card";

export async function ListMyProducts({ search }: { search?: string }) {
  const myProducts = await listMyProductsService({
    page: 1,
    limit: 30,
    name: search,
  });

  return (
    <>
      {!myProducts.length ? (
        <div className="flex flex-col items-center justify-center p-12 mt-8 text-center border border-dashed border-border rounded-2xl bg-card/20">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <span className="text-2xl">🎮</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Nenhum produto cadastrado
          </h3>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Você ainda não adicionou nenhum produto à sua vitrine. Que tal
            começar anunciando aquele produto que está parado?
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 w-full">
          {myProducts.map((product) => (
            <ProductCard
              key={product.uuid}
              uuid={product.uuid}
              name={product.name}
              images={product.images}
              brandOrPlatform={product.brandOrPlatform}
              status={product.status}
            />
          ))}
        </div>
      )}
    </>
  );
}
