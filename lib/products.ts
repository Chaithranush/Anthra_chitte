import type { Product } from "@/lib/data";
import fabricSareesData from "@/lib/fabric-sarees.json";
import { getProductById as getMainProduct } from "@/lib/data";

export type ProductWithFabric = Product & { fabric?: string };

export async function getProductById(id: string): Promise<ProductWithFabric | undefined> {
  const main = await getMainProduct(id);
  if (main) return main;

  const fabric = (fabricSareesData as { id: string; name: string; fabric: string; price: number; image: string; description: string }[]).find(
    (p) => p.id === id
  );
  if (fabric) {
    return {
      id: fabric.id,
      name: fabric.name,
      category: "Sarees",
      price: fabric.price,
      image: fabric.image,
      description: fabric.description,
      fabric: fabric.fabric,
    };
  }
  return undefined;
}

export function isFabricProduct(product: ProductWithFabric): boolean {
  return "fabric" in product && !!product.fabric;
}
