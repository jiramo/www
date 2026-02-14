import Image from "next/image";
import Link from "next/link";

export default function TeamPage() {
    const team = [
        { name: "Pietro Peerani", role: "Founder", img: "/team/pietro.jpeg", href: "https://github.com/pietropeerani" },
        { name: "Federico Bosio", role: "Backend", img: "/team/federico.png", href: "https://github.com/bosioF" },
        { name: "Conan", role: "Full stack", img: "/team/conan.jpeg", href: "https://github.com/gkkconan" },
    ];

    return (
        <div>
            <h2 className="text-sm font-mono text-orange-500 uppercase tracking-widest mb-12 animate-in fade-in duration-500">The Architects</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
                {team.map((member, idx) => (
                    <Link
                        href={member.href} 
                        key={idx} 
                        className="group animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
                        style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
                    >
                        <div className="w-full aspect-4/3 bg-neutral-900 mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
                            <div className="absolute inset-0 bg-white/5 flex items-center justify-center text-neutral-800 text-4xl font-bold group-hover:text-white/20 transition-colors">
                                <Image
                                    className="saturate-0 group-hover:saturate-100 transition-all duration-300"
                                    src={member.img || "/logo.svg"}
                                    fill
                                    objectFit="cover"
                                    alt={member.name + " image"}
                                    />
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-baseline border-b border-white/5 pb-4 group-hover:border-white/20 transition-colors">
                            <h3 className="text-xl text-white font-medium">{member.name}</h3>
                            <span className="text-xs text-neutral-500 font-mono">{member.role}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}