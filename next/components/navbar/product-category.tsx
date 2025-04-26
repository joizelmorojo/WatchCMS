"use client";
import { memo } from "react";
import { ProductCategory } from "@/types/product";
export const ProductCategoryList = memo(({ categories }: { categories: ProductCategory[] }) => (
    <div className="space-y-12">
      {categories.map((category, index) => (
        <div key={index} className="space-y-6" id={category.title.replace(/\s+/g, '-')}>
          <h2 className="text-2xl font-semibold text-orange-400">{category.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
            {category.products.map((product, idx) => (
              <div
                key={idx}
                className="group cursor-pointer p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) =>
                      (e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30')
                    }
                  />
                </div>
                <h3 className="text-lg font-medium">{product.title}</h3>
                <p className="text-orange-400 font-semibold mt-1">{product.price}</p>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
));