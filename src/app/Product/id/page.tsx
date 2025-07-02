import ProductDetail from "@/components/ProductDetail/component";

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductDetail id={parseInt(params.id)} />;
}
