import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loading?: boolean;
}

export function ButtonColorful({
  className,
  label = "Submit Registration",
  loading = false,
  disabled,
  ...props
}: ButtonColorfulProps) {
  return (
    <div className="relative group inline-block">
      {/* Blurred dynamic gradient backdrop */}
      <div
        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 opacity-70 blur-md transition duration-300 group-hover:opacity-100 group-hover:blur-lg"
      />
      {/* Core button */}
      <button
        {...props}
        disabled={disabled || loading}
        className={cn(
          "relative flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-zinc-950 font-semibold text-white shadow-xl transition-all duration-200 active:scale-[0.98] border border-zinc-700/60 hover:bg-zinc-900 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed",
          className
        )}
      >
        <span>{label}</span>
        {loading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </button>
    </div>
  );
}
