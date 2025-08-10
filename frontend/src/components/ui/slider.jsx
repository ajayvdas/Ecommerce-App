// import * as React from "react";
// import * as SliderPrimitive from "@radix-ui/react-slider";

// import { cn } from "@/lib/utils";

// const Slider = React.forwardRef(({ className, ...props }, ref) => (
//     <SliderPrimitive.Root
//         ref={ref}
//         className={cn("relative flex w-full touch-none select-none items-center", className)}
//         {...props}
//     >
//         <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
//             <SliderPrimitive.Range className="absolute h-full bg-primary" />
//         </SliderPrimitive.Track>
//         <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
//     </SliderPrimitive.Root>
// ));
// Slider.displayName = SliderPrimitive.Root.displayName;

// export { Slider };

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

// Standard Slider component
const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    minStepsBetweenThumbs={1}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

// Reverse Slider where thumb starts from left
const ReverseSlider = React.forwardRef(({ 
  className, 
  defaultValue, 
  value,
  onValueChange,
  onValueCommit,
  min = 0, 
  max = 100, 
  ...props 
}, ref) => {
  // Internal state to manage reversed values
  const [internalValue, setInternalValue] = React.useState(
    value ? value.map(v => max - v + min) : 
    defaultValue ? defaultValue.map(v => max - v + min) : 
    [max]
  );

  // Effect to sync with external value if provided
  React.useEffect(() => {
    if (value) {
      setInternalValue(value.map(v => max - v + min));
    }
  }, [value, min, max]);

  // Handle change events
  const handleValueChange = (newValues) => {
    const reversedValues = newValues.map(v => max - v + min);
    setInternalValue(newValues);
    if (onValueChange) {
      onValueChange(reversedValues);
    }
  };

  const handleValueCommit = (newValues) => {
    const reversedValues = newValues.map(v => max - v + min);
    if (onValueCommit) {
      onValueCommit(reversedValues);
    }
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      value={internalValue}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});

ReverseSlider.displayName = "ReverseSlider";

export { Slider, ReverseSlider };