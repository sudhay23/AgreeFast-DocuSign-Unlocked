import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  setShowPopup: any;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, setShowPopup, ...props }, ref) => {
  return (
    <button
      ref={ref}
      onFocus={() => setShowPopup(true)}
      className={cn(
        "group relative w-52 cursor-pointer overflow-hidden rounded-full border border-gray-300 bg-white p-2 text-center font-semibold dark:border-neutral-800 dark:bg-neutral-950",
        className
      )}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-black border-black">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-neutral-50 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 dark:text-neutral-900">
        <span>{text}</span>
        <ArrowRight />
      </div>

      <div className="absolute left-[20%] top-[35%] h-3 w-3 scale-[1] rounded-full bg-neutral-900 duration-300 transition-all group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-neutral-900 dark:bg-neutral-50 dark:group-hover:bg-neutral-50"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;
