"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import html2canvas from "html2canvas";

export default function ResultPage() {
  const params = useSearchParams();
  const score = Number(params.get("score"));
  const resultRef = useRef(null);

  if (isNaN(score)) {
    return <div style={{ padding: 40 }}>No score found</div>;
  }

  const getConclusion = (score) => {
    if (score >= 90)
      return {
        title: "🌒 Guarded / Untouched",
        text: "You’ve lived cautiously. Your experiences are limited, but not invalid."
      };
    if (score >= 70)
      return {
        title: "🔥 Exploring & Learning",
        text: "You’ve tasted connection, confusion, and growth."
      };
    if (score >= 40)
      return {
        title: "🩸 Scarred but Self-Aware",
        text: "You’ve loved deeply, lost painfully, and learned honestly."
      };
    return {
      title: "🖤 Deeply Lived, Deeply Changed",
        text: "You’ve been through intimacy, loss, and transformation. You carry wisdom."
    };
  };

  const shareScreenshot = async () => {
    if (!resultRef.current) return;

    const canvas = await html2canvas(resultRef.current, {
      backgroundColor: "#0f0f0f",
      scale: 2
    });

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], "afterlove-result.png", {
        type: "image/png"
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "AfterLove",
          text: `I scored ${score} on AfterLove.`,
          files: [file]
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "afterlove-result.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const result = getConclusion(score);

  return (
    <main className="container center">
      <section ref={resultRef} className="result">
        <h1>Your Score</h1>
        <div className="score">{score}</div>
        <h2>{result.title}</h2>
        <p>{result.text}</p>
      </section>

      <button className="share" onClick={shareScreenshot}>
        Share Screenshot
      </button>
    </main>
  );
}
