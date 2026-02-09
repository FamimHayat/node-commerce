import React from "react";
import ProductCard from "../common/ProductCard";
import Link from "next/link";
import BrandButton from "../common/BrandButton";

const CheckProduct = () => {
  return (
    <section className="px-3 py-16 sm:py-20">
      <div className=" container">
        <h2 className=" text-center text-3xl sm:text-4xl text-foreground mb-18 text-shadow">
          elevate your style
        </h2>

        <div className="mt-8 grid  gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <ProductCard />
          <ProductCard image="/product2.webp" />
          <ProductCard />
          <ProductCard image="/product2.webp" />
        </div>
      </div>
      <div className="mt-15 flex justify-center">
        {/* <Link
          href={"/"}
          className="w-xs  border py-3 button-shadow text-center duration-150 hover:w-sm"
        >
          discover more
        </Link> */}
        <BrandButton href="/" text="discover more" />
      </div>
    </section>
  );
};

export default CheckProduct;
