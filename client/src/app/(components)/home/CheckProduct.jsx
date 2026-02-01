import React from "react";
import ProductCard from "../common/ProductCard";

const CheckProduct = () => {
  return (
    <section className="px-3 py-16 sm:py-20">
      <div className=" container">
        <h2 className=" text-center text-2xl sm:text-4xl text-foreground mb-18 text-shadow">
          elevate your style
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <ProductCard />
          <ProductCard image="/product2.webp" />
          <ProductCard />
          <ProductCard image="/product2.webp" />
        </div>
      </div>
    </section>
  );
};

export default CheckProduct;
