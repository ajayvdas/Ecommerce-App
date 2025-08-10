// import { Check } from "lucide-react";

// const steps = ["Sign In", "Shipping", "Payment", "Place Order"];

// function MultiStepIndicator({ currentStep }) {
//     return (
//         <nav aria-label="Progress">
//             <ol className="flex items-center">
//                 {steps.map((step, index) => (
//                     <li key={step} className="relative flex-1">
//                         {index < currentStep ? (
//                             <div className="group flex items-center">
//                                 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
//                                     <Check className="w-5 h-5 text-white" />
//                                 </span>
//                                 <span className="ml-3 text-sm font-medium text-primary">{step}</span>
//                             </div>
//                         ) : index === currentStep ? (
//                             <div className="flex items-center" aria-current="step">
//                                 <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary z-10">
//                                     <span className="text-primary">{index + 1}</span>
//                                 </span>
//                                 <span className="ml-3 text-sm font-medium text-primary">{step}</span>
//                             </div>
//                         ) : (
//                             <div className="group flex items-center">
//                                 <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300">
//                                     <span className="text-gray-500">{index + 1}</span>
//                                 </span>
//                                 <span className="ml-3 text-sm font-medium text-gray-500">{step}</span>
//                             </div>
//                         )}

// {index !== steps.length - 1 && (
//     <div className="hidden md:block absolute top-4 left-0 w-full">
//         <div className="h-0.5 bg-gray-200" />
//     </div>
// )}
//                     </li>
//                 ))}
//             </ol>
//         </nav>
//     );
// }

// export default MultiStepIndicator


import { Check } from "lucide-react";

// Simple utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const steps = ["Sign In", "Shipping", "Payment", "Place Order"];

function MultiStepIndicator({ currentStep = 0 }) {
    return (
        <nav aria-label="Order Progress" className="w-full max-w-4xl mx-auto px-4 py-6">
            <ol className="flex items-center">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    
                    return (
                        <li key={step} className="relative flex-1">
                            <div className="flex flex-col items-center group">
                                {/* Step indicator */}
                                <div 
                                    className={cn(
                                        "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                                        isCompleted && "bg-primary shadow-lg shadow-primary/30 scale-110",
                                        isCurrent && "border-2 border-primary bg-white shadow-md",
                                        !isCompleted && !isCurrent && "border-2 border-gray-200 bg-white"
                                    )}
                                    aria-current={isCurrent ? "step" : undefined}
                                >
                                    {isCompleted ? (
                                        <Check className="w-5 h-5 text-white animate-in fade-in duration-300" />
                                    ) : (
                                        <span 
                                            className={cn(
                                                "text-sm font-semibold",
                                                isCurrent ? "text-primary" : "text-gray-400"
                                            )}
                                        >
                                            {index + 1}
                                        </span>
                                    )}
                                </div>

                                {/* Step label */}
                                <span 
                                    className={cn(
                                        "mt-3 text-sm font-medium absolute -bottom-6 transform -translate-x-1/2 left-1/2 whitespace-nowrap transition-colors duration-200",
                                        isCompleted && "text-primary",
                                        isCurrent && "text-primary font-semibold",
                                        !isCompleted && !isCurrent && "text-gray-500"
                                    )}
                                >
                                    {step}
                                </span>
                            </div>

                            {/* Connector line */}
                            {index !== steps.length - 1 && (
                                <div 
                                    className={cn(
                                        "-z-10 md:block absolute top-5 left-1/2 w-full h-0.5 transition-colors duration-200",
                                        index < currentStep ? "bg-primary" : "bg-gray-200"
                                    )}
                                    aria-hidden="true"
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default MultiStepIndicator;