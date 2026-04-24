interface ToastCharacterProps {
  variant?: "cooked" | "crying" | "cool";
  size?: number;
  animate?: boolean;
}

export default function ToastCharacter({
  variant = "cooked",
  size = 180,
  animate = true,
}: ToastCharacterProps) {
  const expressions = {
    cooked: {
      eyes: "✕✕",
      mouth: "😵",
      flames: true,
    },
    crying: {
      eyes: "😭",
      mouth: "😢",
      flames: true,
    },
    cool: {
      eyes: "😎",
      mouth: "😏",
      flames: false,
    },
  };

  const expr = expressions[variant];

  return (
    <div
      className={animate ? "animate-float" : ""}
      style={{ width: size, height: size, position: "relative", display: "inline-block" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flames */}
        {expr.flames && (
          <>
            <ellipse cx="70" cy="40" rx="12" ry="22" fill="#FF6B3D" opacity="0.9" className="animate-flame" />
            <ellipse cx="100" cy="25" rx="14" ry="28" fill="#FFB347" opacity="0.95" />
            <ellipse cx="130" cy="38" rx="11" ry="20" fill="#FF6B3D" opacity="0.9" />
            <ellipse cx="85" cy="35" rx="8" ry="16" fill="#FFD700" opacity="0.8" />
            <ellipse cx="115" cy="30" rx="9" ry="18" fill="#FFD700" opacity="0.8" />
          </>
        )}
        {/* Toast body */}
        <rect x="40" y="55" width="120" height="130" rx="20" fill="#D4956A" />
        <rect x="48" y="63" width="104" height="114" rx="16" fill="#E8A87C" />
        {/* Crust */}
        <rect x="40" y="55" width="120" height="20" rx="12" fill="#C4784A" />
        <rect x="40" y="165" width="120" height="20" rx="12" fill="#C4784A" />
        {/* Burnt spots */}
        <ellipse cx="80" cy="110" rx="10" ry="8" fill="#B8651A" opacity="0.5" />
        <ellipse cx="125" cy="130" rx="8" ry="6" fill="#B8651A" opacity="0.4" />
        <ellipse cx="95" cy="150" rx="6" ry="5" fill="#B8651A" opacity="0.35" />
        {/* Eyes */}
        {variant === "cooked" && (
          <>
            <line x1="72" y1="98" x2="84" y2="110" stroke="#5a2d0c" strokeWidth="4" strokeLinecap="round" />
            <line x1="84" y1="98" x2="72" y2="110" stroke="#5a2d0c" strokeWidth="4" strokeLinecap="round" />
            <line x1="116" y1="98" x2="128" y2="110" stroke="#5a2d0c" strokeWidth="4" strokeLinecap="round" />
            <line x1="128" y1="98" x2="116" y2="110" stroke="#5a2d0c" strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {variant === "crying" && (
          <>
            <ellipse cx="78" cy="103" rx="10" ry="10" fill="#5a2d0c" />
            <ellipse cx="122" cy="103" rx="10" ry="10" fill="#5a2d0c" />
            <ellipse cx="82" cy="107" rx="3" ry="5" fill="#4488ff" opacity="0.8" />
            <ellipse cx="126" cy="107" rx="3" ry="5" fill="#4488ff" opacity="0.8" />
          </>
        )}
        {variant === "cool" && (
          <>
            <rect x="62" y="96" width="28" height="16" rx="8" fill="#1a1a1a" />
            <rect x="110" y="96" width="28" height="16" rx="8" fill="#1a1a1a" />
            <line x1="90" y1="104" x2="110" y2="104" stroke="#1a1a1a" strokeWidth="3" />
          </>
        )}
        {/* Mouth */}
        {variant === "cooked" && (
          <path d="M85 135 Q100 125 115 135" stroke="#5a2d0c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        )}
        {variant === "crying" && (
          <path d="M85 138 Q100 150 115 138" stroke="#5a2d0c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        )}
        {variant === "cool" && (
          <path d="M85 130 Q100 142 115 130" stroke="#5a2d0c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        )}
        {/* Arms */}
        <path d="M40 110 Q20 120 18 140" stroke="#C4784A" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M160 110 Q180 120 182 140" stroke="#C4784A" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Legs */}
        <path d="M75 185 Q72 200 68 210" stroke="#C4784A" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M125 185 Q128 200 132 210" stroke="#C4784A" strokeWidth="10" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
