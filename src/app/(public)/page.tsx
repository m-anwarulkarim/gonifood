import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSection from "@/components/home/HeroSection";
import ProductSection, {
  ProductItem,
} from "@/components/home/ProductByCategorySection";

const toysProducts: ProductItem[] = [
  {
    id: 1,
    title: "Chess and Ludo Board Game",
    price: 390,
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1200&auto=format&fit=crop",
    stock: true,
  },
  {
    id: 2,
    title: "Huanger Music Bus Xylophone with Shape Sorter Toy",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop",
    stock: false,
  },
  {
    id: 3,
    title: "Huanger Music Bus Xylophone with Shape Sorter Toy",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop",
    stock: false,
  },
  {
    id: 4,
    title: "Huanger Music Bus Xylophone with Shape Sorter Toy",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop",
    stock: false,
  },
  {
    id: 5,
    title: "Huanger Music Bus Xylophone with Shape Sorter Toy",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200&auto=format&fit=crop",
    stock: false,
  },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <ProductSection
        title="Toys & Games"
        viewAllHref="/category/toys-games"
        products={toysProducts}
      />
      <ProductSection
        title="Toys & Games"
        viewAllHref="/category/toys-games"
        products={toysProducts}
      />
    </div>
  );
}
