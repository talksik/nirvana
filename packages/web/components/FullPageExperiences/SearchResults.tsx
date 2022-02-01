import { useRouter } from "next/router";

export default function SearchResults() {
  const router = useRouter();

  const q = router.query.q;

  return (
    <div className="mx-auto my-auto flex flex-col">
      <span className="text-xs text-slate-400">0 results for {`"${q}"`}</span>
    </div>
  );
}
