"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CircularProgress from "../components/CircularProgress";
import { supabase } from "../../lib/supabase";

interface RoastRow {
  id: string;
  created_at: string;
  candidate_name: string;
  cooked_score: number;
  industry: string;
  industry_rank: number;
  months_until_cooked: number;
}

const avatarColors = [
  "#FF6B3D", "#7C6CF2", "#2DD4BF", "#F59E0B", "#EF4444",
  "#8B5CF6", "#EC4899", "#10B981", "#3B82F6", "#F97316",
];

function Avatar({ name, index, size = 36 }: { name: string; index: number; size?: number }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: avatarColors[index % avatarColors.length], display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: size * 0.33, fontWeight: 700, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

const industryTabs = ["Global", "Tech", "Design", "Finance", "Marketing", "Product"];
const timeFilters = ["This Month", "All Time"];

const industryKeywords: Record<string, string[]> = {
  Tech: ["software", "engineer", "developer", "data", "ml", "ai", "devops", "cloud", "security", "frontend", "backend", "full"],
  Design: ["design", "ux", "ui", "product designer", "visual", "creative"],
  Finance: ["finance", "analyst", "banking", "accounting", "investment"],
  Marketing: ["marketing", "content", "seo", "growth", "brand", "social"],
  Product: ["product manager", "product owner", "pm", "program manager"],
};

function filterByTab(rows: RoastRow[], tab: string) {
  if (tab === "Global") return rows;
  const keywords = industryKeywords[tab] ?? [];
  return rows.filter((r) =>
    keywords.some((k) => r.industry?.toLowerCase().includes(k))
  );
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("Global");
  const [activeTime, setActiveTime] = useState("This Month");
  const [allRows, setAllRows] = useState<RoastRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [exactRank, setExactRank] = useState<number | null>(null);
  const [exactTotal, setExactTotal] = useState<number | null>(null);

  // Last roast from this session
  const lastResult = typeof window !== "undefined" ? (() => {
    try { return JSON.parse(sessionStorage.getItem("roastResult") ?? "null"); } catch { return null; }
  })() : null;

  useEffect(() => {
    async function load() {
      setLoading(true);
      let query = supabase
        .from("roasts")
        .select("id, created_at, candidate_name, cooked_score, industry, industry_rank, months_until_cooked")
        .order("created_at", { ascending: false });

      if (activeTime === "This Month") {
        const start = new Date();
        start.setDate(1); start.setHours(0, 0, 0, 0);
        query = query.gte("created_at", start.toISOString());
      }

      const { data, error } = await query.limit(200);
      if (!error && data) setAllRows(data);
      setLoading(false);
    }
    load();
  }, [activeTime]);

  // Compute user's exact rank server-side so it's accurate even with thousands of entries
  useEffect(() => {
    if (!lastResult) return;
    async function loadRank() {
      let rankQuery = supabase
        .from("roasts")
        .select("*", { count: "exact", head: true })
        .gt("cooked_score", lastResult.cookedScore);
      let totalQuery = supabase
        .from("roasts")
        .select("*", { count: "exact", head: true });

      if (activeTime === "This Month") {
        const start = new Date();
        start.setDate(1); start.setHours(0, 0, 0, 0);
        const iso = start.toISOString();
        rankQuery = rankQuery.gte("created_at", iso);
        totalQuery = totalQuery.gte("created_at", iso);
      }

      const [{ count: above }, { count: total }] = await Promise.all([rankQuery, totalQuery]);
      setExactRank((above ?? 0) + 1);
      setExactTotal(total ?? 0);
    }
    loadRank();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTime, lastResult?.cookedScore]);

  const filtered = filterByTab(allRows, activeTab);
  const mostCooked = [...filtered].filter((r) => r.cooked_score >= 50).sort((a, b) => b.cooked_score - a.cooked_score).slice(0, 10);
  const leastCooked = [...filtered].filter((r) => r.cooked_score < 50).sort((a, b) => a.cooked_score - b.cooked_score).slice(0, 10);
  const avgScore = filtered.length ? Math.round(filtered.reduce((s, r) => s + r.cooked_score, 0) / filtered.length) : 0;

  return (
    <div style={{ background: "#FAF7F2", minHeight: "100vh" }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 800, color: "#1a1a1a", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
              Leaderboard <span style={{ fontSize: 32 }}>🏆</span>
            </h1>
            <p style={{ color: "#888", fontSize: 15 }}>
              {filtered.length > 0 ? `${filtered.length} roasts ${activeTime === "This Month" ? "this month" : "all time"}` : "See how cooked everyone is"}
            </p>
          </div>
          <select
            value={activeTime}
            onChange={(e) => setActiveTime(e.target.value)}
            style={{ padding: "8px 14px", border: "1px solid #EAE6DF", borderRadius: 10, background: "white", fontSize: 13, fontWeight: 600, color: "#555", cursor: "pointer" }}
          >
            {timeFilters.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {industryTabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: "8px 20px", borderRadius: 999, border: "1px solid", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", background: activeTab === tab ? "#1a1a1a" : "white", color: activeTab === tab ? "white" : "#555", borderColor: activeTab === tab ? "#1a1a1a" : "#EAE6DF" }}>
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa", fontSize: 16 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔥</div>
            Loading roasts...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>😶‍🌫️</div>
            <p style={{ color: "#aaa", fontSize: 16, marginBottom: 20 }}>No roasts yet for this filter.</p>
            <Link href="/upload" className="btn-primary">Be the first to get roasted →</Link>
          </div>
        ) : (
          <div className="leaderboard-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 320px", gap: 24 }}>

            {/* Most Cooked */}
            <div style={{ background: "white", border: "1px solid #EAE6DF", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #EAE6DF", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>🔥</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#1a1a1a" }}>Most Cooked</div>
                  <div style={{ fontSize: 12, color: "#aaa" }}>Descending disaster</div>
                </div>
              </div>
              <div style={{ padding: "8px 0" }}>
                {mostCooked.map((p, i) => (
                  <div key={p.id}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", borderBottom: i < mostCooked.length - 1 ? "1px solid #FAF7F2" : "none" }}>
                    <span style={{ width: 22, textAlign: "center", fontWeight: 700, color: i < 3 ? "#FF6B3D" : "#ccc", fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                    <Avatar name={p.candidate_name} index={i} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.candidate_name}</div>
                      <div style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.industry}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontWeight: 800, color: "#FF6B3D", fontSize: 15 }}>{p.cooked_score}</span>
                      <span style={{ fontSize: 13 }}>🔥</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Least Cooked */}
            <div style={{ background: "white", border: "1px solid #EAE6DF", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #EAE6DF", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>😎</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#1a1a1a" }}>Least Cooked</div>
                  <div style={{ fontSize: 12, color: "#aaa" }}>Surviving the AI apocalypse</div>
                </div>
              </div>
              <div style={{ padding: "8px 0" }}>
                {leastCooked.map((p, i) => (
                  <div key={p.id}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", borderBottom: i < leastCooked.length - 1 ? "1px solid #FAF7F2" : "none" }}>
                    <span style={{ width: 22, textAlign: "center", fontWeight: 700, color: i < 3 ? "#10B981" : "#ccc", fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                    <Avatar name={p.candidate_name} index={i + 3} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.candidate_name}</div>
                      <div style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.industry}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <span style={{ fontWeight: 800, color: "#10B981", fontSize: 15 }}>{p.cooked_score}</span>
                      <span style={{ fontSize: 13 }}>✅</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Industry average */}
              <div style={{ background: "white", border: "1px solid #EAE6DF", borderRadius: 20, padding: "24px" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 20 }}>
                  {activeTab} Average
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <CircularProgress value={avgScore} size={120} color="#FF6B3D" label="/100" />
                </div>
                <p style={{ textAlign: "center", fontSize: 13, color: "#666" }}>
                  {filtered.length} people roasted · avg score <strong>{avgScore}</strong>
                </p>
              </div>

              {/* Your rank */}
              {lastResult && (
                <div style={{ background: "white", border: "1px solid #EAE6DF", borderRadius: 20, padding: "24px" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 16 }}>📍 Your Rank</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                    <Image src="/logo.png" alt="you" width={50} height={50} style={{ objectFit: "contain" }} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a" }}>
                        {exactRank !== null ? `#${exactRank}` : "…"}
                      </div>
                      <div style={{ fontSize: 13, color: "#aaa" }}>
                        of {exactTotal !== null ? exactTotal : "…"} people
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                        <span style={{ fontWeight: 700, color: "#FF6B3D", fontSize: 16 }}>{lastResult.cookedScore}</span>
                        <span>🔥</span>
                        <span style={{ fontSize: 12, color: "#aaa" }}>cooked score</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/upload" className="btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none", fontSize: 13 }}>
                    Improve My Score
                  </Link>
                </div>
              )}

              {/* Stats */}
              <div style={{ background: "white", border: "1px solid #EAE6DF", borderRadius: 20, padding: "24px" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 16 }}>📊 Stats</div>
                {[
                  { label: "Total roasted", value: filtered.length.toString() },
                  { label: "Most common industry", value: (() => {
                    const counts: Record<string, number> = {};
                    filtered.forEach((r) => { if (r.industry) counts[r.industry] = (counts[r.industry] ?? 0) + 1; });
                    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]?.split(" ")[0] ?? "—";
                  })() },
                  { label: "Highest score", value: mostCooked[0] ? `${mostCooked[0].cooked_score} 🔥` : "—" },
                  { label: "Lowest score", value: leastCooked[0] ? `${leastCooked[0].cooked_score} ✅` : "—" },
                ].map((s) => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 13, color: "#666" }}>{s.label}</span>
                    <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 13 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Sticky CTA */}
      <div style={{ background: "#1a1a1a", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
        <p style={{ color: "white", fontWeight: 600, fontSize: 16, margin: 0 }}>Think you can do better? 😏</p>
        <Link href="/upload" className="btn-primary">Roast My Resume →</Link>
      </div>
    </div>
  );
}
