import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CircularProgress from "./components/CircularProgress";
import HeroUpload from "./components/HeroUpload";

const leaderboardData = {
  mostCooked: [
    { rank: 1, name: "Rohan K.", role: "Data Analyst", score: 96, avatar: "RK" },
    { rank: 2, name: "Pooja S.", role: "HR Executive", score: 94, avatar: "PS" },
    { rank: 3, name: "Aditya P.", role: "Business Analyst", score: 93, avatar: "AP" },
    { rank: 4, name: "Neha G.", role: "Marketing Specialist", score: 92, avatar: "NG" },
    { rank: 5, name: "Vikram J.", role: "Software Tester", score: 91, avatar: "VJ" },
  ],
  leastCooked: [
    { rank: 1, name: "Devansh R.", role: "ML Engineer", score: 22, avatar: "DR" },
    { rank: 2, name: "Sneha I.", role: "Data Scientist", score: 24, avatar: "SI" },
    { rank: 3, name: "Arjun M.", role: "Backend Developer", score: 27, avatar: "AM" },
    { rank: 4, name: "Mehak S.", role: "Product Manager", score: 29, avatar: "MS" },
    { rank: 5, name: "Karan B.", role: "Security Engineer", score: 31, avatar: "KB" },
  ],
};

const avatarColors = [
  "#FF6B3D", "#7C6CF2", "#2DD4BF", "#F59E0B", "#EF4444",
  "#8B5CF6", "#EC4899", "#10B981",
];

function Avatar({ initials, index }: { initials: string; index: number }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: avatarColors[index % avatarColors.length],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

const tabs = ["Global", "Tech", "Design", "Finance", "Marketing", "Product"];

export default function HomePage() {
  return (
    <div style={{ background: "#FAF7F2", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="hero-section" style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>

          {/* Left */}
          <div style={{ flex: "1 1 420px", minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#FFF0EB",
                color: "#FF6B3D",
                padding: "5px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              🔥 The internet&apos;s brutally honest AI resume roast
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                marginBottom: 16,
                color: "#1a1a1a",
              }}
            >
              Upload. Get{" "}
              <span
                style={{
                  color: "#FF6B3D",
                  textDecoration: "underline",
                  textDecorationStyle: "wavy",
                  textUnderlineOffset: 6,
                }}
              >
                roasted.
              </span>{" "}
              <br />
              Climb the leaderboard.
            </h1>

            <p style={{ color: "#666", fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
              Our AI analyzes your resume, roasts it mercilessly, and tells you how cooked you are in today&apos;s job market.
            </p>

            <HeroUpload />
          </div>

          {/* Right — toast + speech bubble, vertically centered */}
          <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", paddingTop: 16 }}>
            {/* Speech bubble above */}
            <div
              style={{
                background: "#1a1a1a",
                color: "white",
                padding: "8px 16px",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                marginBottom: 12,
                position: "relative",
              }}
            >
              bro is COOKED 💀
              {/* Little tail pointing down */}
              <div style={{
                position: "absolute",
                bottom: -7,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "7px solid #1a1a1a",
              }} />
            </div>
            <Image
              src="/logo.png"
              alt="Roast My Resume"
              width={220}
              height={220}
              style={{ objectFit: "contain", animation: "float 3s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }} id="how-it-works">
          {[
            { icon: "🔥", title: "Brutally Honest", desc: "No sugarcoating. Just the harsh truth." },
            { icon: "🤖", title: "AI-Powered", desc: "Advanced AI analyzes your skills, role & market value." },
            { icon: "📊", title: "See How You Rank", desc: "Compare with others in your industry." },
            { icon: "⏳", title: "Know Your Fate", desc: "We predict how long until you're replaced." },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                background: "white",
                border: "1px solid #EAE6DF",
                borderRadius: 14,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flex: "1 1 180px",
              }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a1a" }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section
        style={{
          background: "white",
          borderTop: "1px solid #EAE6DF",
          borderBottom: "1px solid #EAE6DF",
        }}
      >
        <div className="social-proof-bar max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center gap-8">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex" }}>
              {["A", "B", "C", "D", "E"].map((l, i) => (
                <div
                  key={i}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: avatarColors[i],
                    border: "2px solid white",
                    marginLeft: i > 0 ? -8 : 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <span style={{ color: "#555", fontSize: 14 }}>
              Join <strong>12,000+</strong> people getting roasted daily
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a" }}>72/100</span>
            <span style={{ fontSize: 20 }}>🔥</span>
            <span style={{ color: "#888", fontSize: 14 }}>Average Cooked Score</span>
          </div>
          <div
            style={{
              background: "#FAF7F2",
              border: "1px solid #EAE6DF",
              borderRadius: 12,
              padding: "12px 16px",
              maxWidth: 260,
            }}
          >
            <p style={{ fontSize: 13, color: "#555", fontStyle: "italic", margin: 0 }}>
              &quot;The roast was accurate... painfully accurate.&quot;
            </p>
            <p style={{ fontSize: 12, color: "#aaa", margin: "6px 0 0" }}>— Software Engineer</p>
          </div>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="max-w-6xl mx-auto px-6 py-16" id="examples">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", marginBottom: 4 }}
            >
              🏆 Leaderboard
            </h2>
            <p style={{ color: "#888", fontSize: 15 }}>
              See how cooked everyone is in their industry
            </p>
          </div>
          <Link
            href="/leaderboard"
            style={{ color: "#FF6B3D", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
          >
            View full leaderboard →
          </Link>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              style={{
                padding: "7px 18px",
                borderRadius: 999,
                border: "1px solid",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                background: i === 0 ? "#1a1a1a" : "white",
                color: i === 0 ? "white" : "#555",
                borderColor: i === 0 ? "#1a1a1a" : "#EAE6DF",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Most Cooked */}
          <div className="card p-6">
            <div
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}
            >
              <span style={{ fontSize: 20 }}>🔥</span>
              <div>
                <div style={{ fontWeight: 700, color: "#1a1a1a" }}>Most Cooked</div>
                <div style={{ fontSize: 12, color: "#aaa" }}>Top 5 most cooked people</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {leaderboardData.mostCooked.map((p, i) => (
                <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 20,
                      textAlign: "center",
                      fontWeight: 700,
                      color: "#aaa",
                      fontSize: 13,
                    }}
                  >
                    {p.rank}
                  </span>
                  <Avatar initials={p.avatar} index={i} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{p.role}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontWeight: 700, color: "#FF6B3D", fontSize: 14 }}>
                      {p.score}
                    </span>
                    <span style={{ fontSize: 14 }}>🔥</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Least Cooked */}
          <div className="card p-6">
            <div
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}
            >
              <span style={{ fontSize: 20 }}>😎</span>
              <div>
                <div style={{ fontWeight: 700, color: "#1a1a1a" }}>Least Cooked</div>
                <div style={{ fontSize: 12, color: "#aaa" }}>Top 5 least cooked people</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {leaderboardData.leastCooked.map((p, i) => (
                <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 20,
                      textAlign: "center",
                      fontWeight: 700,
                      color: "#aaa",
                      fontSize: 13,
                    }}
                  >
                    {p.rank}
                  </span>
                  <Avatar initials={p.avatar} index={i + 5} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{p.role}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontWeight: 700, color: "#10B981", fontSize: 14 }}>
                      {p.score}
                    </span>
                    <span style={{ fontSize: 14 }}>✅</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Average */}
          <div className="card p-6">
            <div
              style={{ fontWeight: 700, fontSize: 16, color: "#1a1a1a", marginBottom: 20 }}
            >
              Industry Average (Tech)
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <CircularProgress value={65} size={130} color="#FF6B3D" label="/100" />
            </div>
            <p style={{ textAlign: "center", fontSize: 13, color: "#666", marginBottom: 20 }}>
              Techies are 65% cooked on average. You&apos;re doing worse. Work on it.
            </p>
            <Link
              href="/leaderboard"
              style={{
                display: "block",
                textAlign: "center",
                padding: "10px",
                border: "1px solid #EAE6DF",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                color: "#555",
                textDecoration: "none",
              }}
            >
              See Full Insights →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#1a1a1a",
          margin: "0 auto 48px",
          borderRadius: 24,
          padding: "48px 32px",
          textAlign: "center",
          maxWidth: 1152,
        }}
        className="mx-6"
      >
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 12 }}>
          Think you can do better? 😏
        </h2>
        <p style={{ color: "#aaa", fontSize: 16, marginBottom: 28 }}>
          Upload your resume and see where you stand.
        </p>
        <Link href="/upload" className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
          Roast My Resume →
        </Link>
      </section>
      <Footer />
    </div>
  );
}
