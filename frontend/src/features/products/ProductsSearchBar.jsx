import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function ProductsSearchBar() {
const [searchTerm, setSearchTerm] = useState("");
  return (
<div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
  )
}
