"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{ background: "#FAF7F2", borderBottom: "1px solid #EAE6DF" }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Image src="/logo.png" alt="Roast My Resume" width={36} height={36} style={{ objectFit: "contain" }} />
          <span style={{ color: "#1a1a1a" }}>
            ROAST <span style={{ color: "#FF6B3D" }}>MY RESUME</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/leaderboard"
            className="text-sm font-medium transition-colors"
            style={{ color: pathname === "/leaderboard" ? "#FF6B3D" : "#555" }}
          >
            Leaderboard
          </Link>
          <a href="#how-it-works" className="text-sm font-medium" style={{ color: "#555" }}>
            How it works
          </a>
          <a href="#examples" className="text-sm font-medium" style={{ color: "#555" }}>
            Examples
          </a>
        </div>

        <Link href="/upload" className="btn-primary text-sm">
          Roast My Resume →
        </Link>
      </div>
    </nav>
  );
}
