
import { useState } from "react"
import { useDispatch } from "react-redux"
import ProductFilters from "@/components/ProductFilters"
import { useQueryParams } from "@/hooks/useQueryParams"
import { useGetProductsQuery } from "@/slices/productsApiSlice"
import Loader from "@/components/Loader"
import ProductGrid from "@/components/ProductGrid"
import { addToCart } from "@/slices/cartSlice"
import { toast } from "react-toastify"

const ProductsPage = () => {
  const dispatch = useDispatch()
  const { queryParams } = useQueryParams()
  const { data, error, isLoading } = useGetProductsQuery(queryParams)

  const products = data?.products || []
  const totalCount = data?.totalCount || 0

  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const handleAddToCart = (product, quantity = 1) => {
    dispatch(addToCart({ ...product, quantity }))
    toast.success('Product added to cart')
  }

  if (error) return <div className="container mx-auto px-4 py-8 text-red-600">Error loading products</div>

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {/* Header actions (mobile filter toggle) */}
          <div className="mb-4 md:mb-6 flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-semibold text-foreground text-pretty">Products</h1>

            {/* Mobile filter toggle */}
            <button
              type="button"
              onClick={() => setShowMobileFilters((s) => !s)}
              className="md:hidden inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-medium bg-background hover:bg-accent hover:text-accent-foreground transition"
              aria-expanded={showMobileFilters}
              aria-controls="mobile-filters"
            >
              <span className="i-lucide-filter w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Mobile filters (collapsible) */}
          <div
            id="mobile-filters"
            className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
              showMobileFilters ? "max-h-[800px] opacity-100 mb-6" : "max-h-0 opacity-0"
            }`}
          >
            <ProductFilters onAfterChange={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
          </div>

          {/* Main content with sticky sidebar on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-[18rem,1fr] lg:grid-cols-[20rem,1fr] gap-6 md:gap-8">
            {/* Sidebar (hidden on mobile because we have collapsible above) */}
            <aside className="hidden md:block">
              <div className="md:sticky md:top-24">
                <ProductFilters onAfterChange={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
              </div>
            </aside>

            {/* Grid */}
            <ProductGrid products={products} totalCount={totalCount} onAddToCart={handleAddToCart} />
          </div>
        </div>
      )}
    </>
  )
}

export default ProductsPage
