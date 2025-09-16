// import { Check } from "lucide-react";

// // Simple utility function to combine class names
// const cn = (...classes) => classes.filter(Boolean).join(' ');

// const steps = ["Sign In", "Shipping", "Payment", "Place Order"];

// function MultiStepIndicator({ currentStep = 0 }) {
//     return (
//         <nav aria-label="Order Progress" className="w-full max-w-4xl mx-auto px-4 py-6">
//             <ol className="flex items-center">
//                 {steps.map((step, index) => {
//                     const isCompleted = index < currentStep;
//                     const isCurrent = index === currentStep;

//                     return (
//                         <li key={step} className="relative flex-1">
//                             <div className="flex flex-col items-center group">
//                                 {/* Step indicator */}
//                                 <div
//                                     className={cn(
//                                         "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
//                                         isCompleted && "bg-primary shadow-lg shadow-primary/30 scale-110",
//                                         isCurrent && "border-2 border-primary bg-white shadow-md",
//                                         !isCompleted && !isCurrent && "border-2 border-gray-200 bg-white"
//                                     )}
//                                     aria-current={isCurrent ? "step" : undefined}
//                                 >
//                                     {isCompleted ? (
//                                         <Check className="w-5 h-5 text-white animate-in fade-in duration-300" />
//                                     ) : (
//                                         <span
//                                             className={cn(
//                                                 "text-sm font-semibold",
//                                                 isCurrent ? "text-primary" : "text-gray-400"
//                                             )}
//                                         >
//                                             {index + 1}
//                                         </span>
//                                     )}
//                                 </div>

//                                 {/* Step label */}
//                                 <span
//                                     className={cn(
//                                         "mt-3 text-sm font-medium absolute -bottom-6 transform -translate-x-1/2 left-1/2 whitespace-nowrap transition-colors duration-200",
//                                         isCompleted && "text-primary",
//                                         isCurrent && "text-primary font-semibold",
//                                         !isCompleted && !isCurrent && "text-gray-500"
//                                     )}
//                                 >
//                                     {step}
//                                 </span>
//                             </div>

//                             {/* Connector line */}
//                             {index !== steps.length - 1 && (
//                                 <div
//                                     className={cn(
//                                         "-z-10 md:block absolute top-5 left-1/2 w-full h-0.5 transition-colors duration-200",
//                                         index < currentStep ? "bg-primary" : "bg-gray-200"
//                                     )}
//                                     aria-hidden="true"
//                                 />
//                             )}
//                         </li>
//                     );
//                 })}
//             </ol>
//         </nav>
//     );
// }

// export default MultiStepIndicator;

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Sign In", "Shipping", "Payment", "Place Order"];

export default function MultiStepIndicator({ currentStep = 0 }) {
    return (
        <div className="space-y-8">
            {/* Progress Indicator */}
            <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => (
                        <div key={step} className="flex flex-col items-center flex-1">
                            <div className="flex items-center w-full">
                                {/* Step Circle */}
                                <div className="relative w-full flex justify-center">
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full z-10 flex items-center justify-center text-sm font-medium transition-colors",
                                            index < currentStep
                                                ? "bg-black text-white"
                                                : index === currentStep
                                                ? "bg-black text-white"
                                                : "bg-white border-2 border-gray-300 text-gray-400"
                                        )}
                                    >
                                        {index < currentStep ? <Check className="w-4 h-4" /> : <span>{index + 1}</span>}
                                    </div>

                                    {/* Connecting Line - moved outside the circle container */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className={cn(
                                                "absolute top-1/2 left-[50%] w-full h-0.5 transition-colors -translate-y-1/2",
                                                index < currentStep ? "bg-black" : "bg-gray-300"
                                            )}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Step Label - centered */}
                            <div className="mt-2 text-center w-full">
                                <span
                                    className={cn(
                                        "text-xs font-medium uppercase tracking-wide",
                                        index <= currentStep ? "text-black" : "text-gray-400"
                                    )}
                                >
                                    {step}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>{" "}
        </div>
    );
}
