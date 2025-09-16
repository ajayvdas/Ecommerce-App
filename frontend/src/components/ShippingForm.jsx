import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function ShippingForm({ formData, handleInputChange, handleCountryChange, handleSubmit }) {
    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select onValueChange={handleCountryChange} value={formData.country}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-full">
                Continue
            </Button>
        </motion.form>
    );
}

export default ShippingForm