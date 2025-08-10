import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export default function EditUserForm() {
    // TODO: Implement the functionality
    return (
        <motion.form
            className="space-y-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="space-y-2">
                <Label htmlFor="name">name</Label>
                <Input id="name" name="name" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" required />
            </div>
            <div className="space-y-2 flex items-baseline space-x-2">
                <Checkbox id="isAdmin" />
                <label
                    htmlFor="isAdmin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    isAdmin
                </label>
            </div>

            <Button type="submit" className="w-full">
                Update
            </Button>
        </motion.form>
    );
}
