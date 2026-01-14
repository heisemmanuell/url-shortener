import { Cloud, ShieldCheck, Zap } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({title, description, icon} : FeatureCardProps){
  return(
    <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-4 text-zinc-900">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-zinc-900 mb-2">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

const FEATURES = [
  {
    title: "Lightening Fast",
    description: "Redirects happen in milliseconds. Built on Vercel's Edge Network for global speed.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Secure & Reliable",
    description: "HTTPS encryption by default. Your data is stored safely in enterprise-grade Postgres.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "Open Source",
    description: "Full transparency. View the code, contribute, or self-host your own instance.",
    icon: <Cloud className="w-6 h-6" />,
  }
];

export default function Features(){
  return(
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl px-4">
      {FEATURES.map((feature) => (
        <FeatureCard 
          key={feature.title}
          title={feature.title}
          description = {feature.description}
          icon= {feature.icon}
        />
      ))}
    </div>
  )
}
