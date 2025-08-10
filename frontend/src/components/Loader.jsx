import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function Loader({ size = 48, color = "text-primary" }) {
    return (
        <div className="flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className={color}
            >
                <Loader2 size={size} />
            </motion.div>
        </div>
    );
}

export default Loader;
