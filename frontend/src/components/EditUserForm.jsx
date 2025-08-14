import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export default function EditUserForm({ formData, onInputChange, onSubmit, isLoading = false }) {
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        onInputChange(name, type === "checkbox" ? checked : value);
    };

    const handleCheckboxChange = (checked) => {
        onInputChange("isAdmin", checked);
    };
    return (
        <motion.form
            onSubmit={onSubmit}
            className="space-y-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="space-y-2">
                <Label htmlFor="name">name</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
            </div>
            {/* Admin checkbox */}
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="isAdmin"
                    checked={formData.isAdmin}
                    onCheckedChange={handleCheckboxChange}
                    disabled={isLoading}
                />
                <Label
                    htmlFor="isAdmin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                    Administrator privileges
                </Label>
            </div>

            {/* Submit button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <motion.div
                            className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Updating...
                    </>
                ) : (
                    "Update User"
                )}
            </Button>
        </motion.form>
    );
}
