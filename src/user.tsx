import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  { id: 1, name: "Smartphone", price: 699, image: "/iphone.jpg" },
  { id: 2, name: "Headphones", price: 199, image: "/jblheadphones.jpg" },
  { id: 3, name: "Laptop", price: 1299, image: "/legion.jpg" },
  { id: 4, name: "Smartwatch", price: 249, image: "/smartwatch.jpg" },
];

export default function EShoppingWebsite() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [flyingImage, setFlyingImage] = useState(null); // {src, startX, startY, endX, endY}
  const cartRef = useRef(null);

  const addToCart = (product, event) => {
    // Get position of product image and cart icon
    const imgRect = event.currentTarget.parentNode.parentNode.querySelector("img").getBoundingClientRect();
    const cartRect = cartRef.current.getBoundingClientRect();

    setFlyingImage({
      src: product.image,
      startX: imgRect.left,
      startY: imgRect.top,
      endX: cartRect.left + cartRect.width / 2,
      endY: cartRect.top + cartRect.height / 2,
    });

    setTimeout(() => {
      setCart((prev) => [...prev, product]);
      setFlyingImage(null);
    }, 800);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      <header className="flex justify-between items-center mb-8 relative z-20">
        <h1 className="text-3xl font-bold">E-Shop</h1>
        <div className="relative flex items-center gap-2">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Search className="absolute right-4 text-gray-400" size={20} />
        </div>
        <div className="flex items-center gap-2 relative" ref={cartRef}>
          <ShoppingCart size={24} />
          <span className="text-lg">{cart.length}</span>
        </div>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="rounded-2xl shadow-md p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <Button onClick={(e) => addToCart(product, e)} className="w-full">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* Flying image animation */}
      <AnimatePresence>
        {flyingImage && (
          <motion.img
            src={flyingImage.src}
            initial={{
              position: "fixed",
              width: 150,
              height: 150,
              left: flyingImage.startX,
              top: flyingImage.startY,
              opacity: 1,
              scale: 1,
              zIndex: 50,
            }}
            animate={{
              left: flyingImage.endX - 25,
              top: flyingImage.endY - 25,
              opacity: 0,
              scale: 0.2,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
