"use client";

import { createShortLink } from "@/app/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Link, Copy } from "lucide-react";

export function ShortenerForm() {
  const [result, setResult] = useState<{ success?: boolean; error?: string; shortCode?: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit( formData: FormData ){
    setResult(null);
    setCopied(false);
    const response = await createShortLink(formData);
    setResult(response);
  }

  const handleCopy = () => {
    if (!result?.shortCode) return;
    const fullUrl = `${window.location.host}/${result.shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-zinc-200">
        <form action={handleSubmit} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Link color = "gray"/>
            </div>
            <input
              type="url"
              name="originalUrl"
              placeholder="Paste your long URL here..."
              required
              className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all font-medium"
            />
          </div>

          <SubmitButton />
        </form>

        {result?.error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {result.error}
          </div>
        )}

        {/* Success State */}
        {result?.success && (
          <div className="mt-6 p-1 bg-zinc-50 border border-zinc-200 rounded-xl animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-2 p-1">
              <div className="flex-1 px-4 py-3 font-mono text-sm text-zinc-600 truncate">
                <span className="text-zinc-400 select-none mr-1">{typeof window !== 'undefined' ? window.location.host : 'localhost:3000'}/</span>
                <span className="text-black font-bold">{result.shortCode}</span>
              </div>
              
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all transform active:scale-95 ${
                  copied 
                    ? "bg-gray-400 text-white shadow-emerald-200" 
                    : "bg-black text-white hover:bg-zinc-800"
                }`}
              >
                {copied ? (
                  <>
                    <Copy />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
 
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black hover:bg-zinc-800 text-white font-bold py-4 px-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:bg-zinc-200 disabled:text-zinc-400 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <svg className="animate-spin h-5 w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        "Shorten URL"
      )}
    </button>
  );
}