import Link from "next/link";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";

export default function ProductCard({
  href = "/product/floral-jacquard-skirt",
  image = "/product.webp",
  title = "geometric shirt",
  price = "19,300 AED",

  imgWidth = 1200,
  imgHeight = 1600,
}) {
  return (
    <div className="w-full bg-background group">
      {/* Image Container */}
      <div className="relative w-full">
        {/* Heart Icon */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 z-30 p-2 rounded-full hover:bg-black/10 transition"
        >
          <FiHeart size={18} />
        </button>

        {/* ✅ Full Image Link */}
        <Link href={href} className="block relative w-full">
          {/* ✅ Responsive Image */}
          <Image
            src={image}
            alt={title}
            width={imgWidth}
            height={imgHeight}
            priority
            className="w-full h-auto object-cover"
          />

          {/* Blur Overlay */}
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

      {/* Text Content */}
      <div className="pt-3 text-foreground">
        <Link href={href}>
          <p className="text-sm sm:text-base leading-snug">{title}</p>
        </Link>

        <p className="mt-1 text-sm ">{price}</p>
      </div>
    </div>
  );
}
