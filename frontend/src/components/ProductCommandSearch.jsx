import { useState, useEffect } from 'react';
import { Search, Package, Star, ShoppingCart, Zap} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGetProductsQuery } from '@/slices/productsApiSlice';
import { Link } from 'react-router-dom';

const ProductCommandSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, error, isLoading } = useGetProductsQuery();

const products = data?.products || []

const initiaProductsOnCommand = products.slice(0, 4)
console.log(initiaProductsOnCommand)



  // Filter products based on search query
  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const displayItems = searchQuery ? filteredProducts : quickActions.map(action => ({ ...action, type: 'action' }));
  const displayItems = searchQuery ? filteredProducts : initiaProductsOnCommand;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % displayItems.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + displayItems.length) % displayItems.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (displayItems[selectedIndex]) {
            handleItemSelect(displayItems[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, displayItems, selectedIndex]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleItemSelect = (item) => {
    if (item.type === 'action') {
      console.log(`Action selected: ${item.action}`);
      // Handle quick actions
    } else {
      console.log(`Product selected: ${item.name}`);
      // Handle product selection
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="w-full max-w-md mx-auto flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-left">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500 flex-1">Search products...</span>
            <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
              <span>⌘K</span>
            </div>
          </button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-2xl p-0 gap-0">
          <DialogHeader className="p-0">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, categories, or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-lg placeholder-gray-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-400 hover:text-gray-600 text-sm"
                >
                  Clear
                </button>
              )}
            </div>
          </DialogHeader>

          <div className="max-h-96 overflow-y-auto">
            {displayItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium mb-1">No products found</p>
                <p className="text-sm">Try searching for something else</p>
              </div>
            ) : (
              <div className="py-2">
                {!searchQuery && (
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Quick Actions
                  </div>
                )}
                
                {displayItems.map((item, index) => (
                  <div
                    key={item._id || item.action}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                      index === selectedIndex ? 'bg-blue-50 border-r-2 border-blue-500' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleItemSelect(item)}
                  >
                    {item.type === 'action' ? (
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-900">{item.label}</span>
                      </div>
                    ) : (
                      <Link to={`/product/${item._id}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            {!item.inStock && (
                              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                                Out of Stock
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-semibold text-blue-600">{item.price}</span>
                            <span>{item.category}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{item.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors duration-150">
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Powered by search</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCommandSearch