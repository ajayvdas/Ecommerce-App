import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import Pagination from "./Pagination"

export default function ProductGrid({ products, totalCount, onAddToCart }) {
  const hasProducts = Array.isArray(products) && products.length > 0
  const isQueryActive = false

  return (
    <main className="min-w-0">
      {hasProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {products.map((product) => (
            <div key={product._id} className="group">
              <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 bg-background transition hover:shadow-md">
                {/* Image */}
                <Link to={`/product/${product._id}`} className="block">
                  <div className="w-full h-48 sm:h-56 lg:h-60 overflow-hidden bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>

                {/* Content */}
                <CardContent className="p-4 md:p-5 flex flex-col gap-2.5">
                  {/* Category */}
                  <p className="text-xs md:text-sm text-muted-foreground">{product.category}</p>

                  {/* Name */}
                  <h3 className="text-sm md:text-base font-semibold text-foreground line-clamp-2">{product.name}</h3>

                  {/* Reviews */}
                  <div className="mt-1 flex items-center gap-2 text-xs md:text-sm">
                    <div className="flex text-yellow-500" aria-hidden="true">
                      {"★".repeat(4)}
                      {"☆"}
                    </div>
                    <span className="text-muted-foreground">{product.reviews?.length ?? 0} Reviews</span>
                  </div>

                  {/* Stock */}
                  <p
                    className={`text-xs md:text-sm font-medium ${
                      product.countInStock > 0 ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {product.countInStock > 0 ? `In Stock (${product.countInStock})` : "Out of Stock"}
                  </p>

                  {/* Price & CTA */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base md:text-lg font-bold text-foreground">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className={`inline-flex items-center rounded-md px-3 py-2 text-xs md:text-sm font-medium transition ${
                        product.countInStock === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-foreground text-background hover:opacity-90"
                      }`}
                      onClick={() => onAddToCart({...product}, 1)}
                      disabled={product.countInStock === 0}
                    >
                      {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : isQueryActive ? (
        <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 md:w-20 md:h-20 text-gray-300 dark:text-gray-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground max-w-md">
            Try adjusting your search criteria or browse our categories to find what you&apos;re looking for.
          </p>
        </div>
      ) : null}

      {/* Pagination */}
      <div className="mt-8 md:mt-10">
        <Pagination totalCount={totalCount} />
      </div>
    </main>
  )
}
