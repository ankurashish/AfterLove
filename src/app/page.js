"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import questions from "../../data/questions";

export default function Home() {
  const [checked, setChecked] = useState(
    Array(questions.length).fill(false)
  );
  const router = useRouter();

  const toggle = (i) => {
    const copy = [...checked];
    copy[i] = !copy[i];
    setChecked(copy);
  };

  const submit = () => {
    const count = checked.filter(Boolean).length;
    const score = 100 - count;
    router.push(`/result?score=${score}`);
  };

  return (
    <main className="container">
      <h1>AfterLove</h1>
      <p className="subtitle">18+ • Honest • No judgment</p>

      <div className="questions">
        {questions.map((q, i) => (
          <label key={i} className="question">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
            />
            <span>{i + 1}. {q}</span>
          </label>
        ))}
      </div>

      <button className="submit" onClick={submit}>
        Calculate My Score
      </button>
    </main>
  );
}
