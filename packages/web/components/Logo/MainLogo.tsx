export default function MainLogo({ ...props }) {
  return (
    <span onClick={() => window.open("/", "_self")} id="main-title" {...props}>
      nirvana
    </span>
  );
}
