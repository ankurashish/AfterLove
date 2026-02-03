import { Suspense } from "react";
import ResultClient from "./ResultClient";

export default function ResultPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading result…</div>}>
      <ResultClient />
    </Suspense>
  );
}
