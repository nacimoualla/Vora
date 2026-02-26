import Hero from "@/components/layout/HeroSec"
import FeaturesSec from "@/components/layout/FeaturesSec"
import ProductGrid from "@/components/product/ProductGrid"
export default function Home() {
  return (
    <>
      <Hero></Hero>
      <FeaturesSec></FeaturesSec>
      <ProductGrid></ProductGrid>
    </>
  );
}