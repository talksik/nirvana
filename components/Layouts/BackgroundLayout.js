export default function BackgroundLayout({ children }) {
  return (
    <div id="bg" className="text-white min-w-full min-w-screen">
      {children}
    </div>
  );
}
