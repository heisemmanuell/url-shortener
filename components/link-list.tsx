"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Links = {
  id: number;
  originalUrl: string;
  shortCode: string;
  clicks: number;
}

export function LinkList ({ initialLinks } : { initialLinks : Links[] }) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 100000);
    
    return () => clearInterval(interval);
  }, [router]);

  if(initialLinks.length === 0){
    return(
      <div className="text-center p-12 border border-dashed border-zinc-300 rounded-2xl text-zinc-400">
        <p>No links created yet. Start shortening!</p>
      </div>
    )
  }

  return(
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-zinc-500 font-medium border-b border-zinc-100">
            <tr>
              <th className="p-4 pl-6">Short Link</th>
              <th className="p-4">Original Destination</th>
              <th className="p-4 pr-6 text-right">Clicks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {initialLinks.map((link) => (
              <tr key={link.id} className="group hover:bg-zinc-50/50 transition-colors">
                <td className="p-4 pl-6 font-mono text-zinc-900 font-semibold">
                  <span className="text-zinc-400 opacity-50 group-hover:opacity-100 transition-opacity">/</span>
                  {link.shortCode}
                </td>
                <td className="p-4 text-zinc-500 max-w-xs truncate font-medium">
                  {link.originalUrl}
                </td>
                <td className="p-4 pr-6 text-right font-mono text-zinc-900">
                  <span className="inline-block min-w-[20px] text-center bg-zinc-100 rounded px-1 py-0.5">
                    {link.clicks}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}