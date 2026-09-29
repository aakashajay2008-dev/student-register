import React from "react";

export function DscetCrest({ className = "h-9 w-auto", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-10 w-10 rounded-xl bg-blue-700 flex items-center justify-center shadow-md shadow-blue-900/30 shrink-0">
        <svg viewBox="0 0 48 48" fill="none" className="w-6 h-6">
          <path d="M24 10L37 18L24 26L11 18L24 10Z" fill="#FFFFFF" />
          <path d="M16 21V30.5C16 33 19.5 35.5 24 35.5C28.5 35.5 32 33 32 30.5V21" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M37 19V28.5" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="37" cy="30" r="1.5" fill="#FDE047" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-lg leading-tight ${dark ? "text-white" : "text-slate-900"}`}>
          DSCET
        </span>
        <span className={`text-[10px] font-semibold tracking-wider uppercase leading-none ${dark ? "text-zinc-400" : "text-slate-500"}`}>
          College of Engineering & Technology
        </span>
      </div>
    </div>
  );
}
