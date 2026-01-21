"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { products } from "../../src/data/products";
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // Extracts 'en' or 'zh' from the URL

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,   // เรียงทีละใบ
      },
    },
  };  
  
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
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
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50"
                />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
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
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-medium shadow-lg"
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
