import { ShortenerForm } from "@/components/form";
import { LinkList } from "@/components/link-list";
import Features from "@/components/features";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; 

export default async function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  const links = userId ? await prisma.link.findMany({
    where: { 
      userId: userId 
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  }) : [];

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col items-center pt-24 pb-12 px-4 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <nav className="absolute top-6 left-6 md:top-10 md:left-10 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-zinc-900">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
            K
          </div>
          <span>Kurtz.</span>
        </div>
      </nav>

      <div className="text-center mb-12 relative z-10 max-w-2xl">
        <div className="inline-block mb-4 px-3 py-1 bg-white border border-zinc-200 rounded-full text-xs font-semibold text-zinc-600 uppercase tracking-wider">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>&nbsp;
          v1.0 Beta
        </div>
        <h1 className="text-7xl font-extrabold text-zinc-900 tracking-tighter mb-4 leading-tighter">
          Make your links <br/>
          <span className="text-zinc-400">shorter & smarter.</span>
        </h1>
        <p className="text-zinc-500 text-lg">
          The minimalist URL shortener. <br className="hidden sm:block"/>
          No ads. Just links.
        </p>
      </div>
      
      <div className="w-full relative z-10">
        <ShortenerForm />
      </div>

      <Features />

      <div className="mt-20 w-full max-w-4xl relative z-10">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-lg font-bold text-zinc-900">Recent Activity</h2>
          <span className="text-xs text-zinc-400 font-mono">LIVE_DATA</span>
        </div>
        
        <LinkList initialLinks={links} />
      </div>

      <footer className="mt-20 text-zinc-400 text-sm text-center relative z-10">
        <p>© 2025 Kurtz. Built with Next.js, Prisma & Supabase.</p>
      </footer>
    </main>
  );
}