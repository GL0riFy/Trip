"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { products } from "../../src/data/products";
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // Extracts 'en' or 'zh' from the URL

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  

  const cardVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  };

  return (
      <div className="min-h-screen">

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl"
                  >
                    📦
                  </motion.div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {locale === "en" ? product.name : product.nameCN}
                </h3>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ฿{product.price.toLocaleString()}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
                  >
                    🛒
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
