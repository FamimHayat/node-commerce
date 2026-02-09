import Link from "next/link";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";

export default function ProductCard({
  href = "/product/floral-jacquard-skirt",
  image = "/product.webp",
  title = "geometric shirt",
  price = "৳ 2000",

  imgWidth = 1200,
  imgHeight = 1600,
}) {
  return (
    <div className="w-full bg-background group">
      <div className="relative w-full">
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-30  rounded-full  cursor-pointer"
        >
          <FaHeart
            size={28}
            className="text-black/80 duration-200 hover:text-red-500"
          />
        </button>

        <Link href={href} className="block relative w-full">
          <Image
            src={image}
            alt={title}
            width={imgWidth}
            height={imgHeight}
            priority
            className="w-full h-auto object-cover"
          />

          <div
            className="
              absolute inset-0
              opacity-0 group-hover:opacity-100
              transition duration-300
              backdrop-blur-sm bg-black/20
              flex items-center justify-center
              z-20
            "
          >
            <span
              className="
               text-white text-xl md:text-3xl
              "
            >
              See
            </span>
          </div>
        </Link>
      </div>

      <div className="pt-3 text-foreground">
        <Link href={href}>
          <p className="text-sm sm:text-base leading-snug">{title}</p>
        </Link>

        <p className="mt-1 text-sm ">{price}</p>
      </div>
    </div>
  );
}
