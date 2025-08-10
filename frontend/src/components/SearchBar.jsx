import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar({ setQuery }) {
    return (
        <div className="mb-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search products..."
                    // value={searchTerm}
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    className="pl-10"
                />
            </div>
        </div>
    );
}
