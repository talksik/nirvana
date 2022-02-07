import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";

export default function SearchResults() {
  const router = useRouter();

  const q = router.query.q;

  return (
    <div className="mx-auto my-auto flex flex-col">
      <span className="text-xs text-slate-400 text-center">
        0 results for {`"${q}"`}
      </span>

      <span className="bg-slate-50 shadow-xl rounded p-10 m-10 flex flex-col items-start space-y-5">
        <span className="uppercase text-lg tracking-widest text-slate-400 ">
          Upgrade to Pro
        </span>

        <span className="flex flex-row items-center space-x-2">
          <FaCheck className="text-emerald-500 text-lg" />
          <span className="text-slate-500 text-lg">
            Seamless search for conversations, drawer links, etc.
          </span>
        </span>
        <span className="flex flex-row items-center space-x-2">
          <FaCheck className="text-emerald-500 text-lg" />
          <span className="text-slate-500 text-lg">
            NLP technology to search based on what someone said.
          </span>
        </span>
        <span className="flex flex-row items-center space-x-2">
          <FaCheck className="text-emerald-500 text-lg" />
          <span className="text-slate-500 text-lg">
            View conversations from over 30 days ago.
          </span>
        </span>

        <button
          onClick={() => window.open("mailto:arjun@nirvana.com", "_blank")}
          className="rounded-lg p-2 border border-teal-500 flex flex-row items-center space-x-2
            text-xs bg-teal-500 hover:font-semibold mx-2 text-white mt-10 text-md font-semibold"
        >
          <span> Email Us</span>
        </button>
      </span>
    </div>
  );
}
