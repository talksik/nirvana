export default function BackgroundLayout({ children }) {
  return (
    <div id="bg" className="text-white min-w-full min-h-screen">
      {children}
    </div>
  );
}
