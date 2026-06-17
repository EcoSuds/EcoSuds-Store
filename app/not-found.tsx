import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center px-4 pt-[var(--nav-h)]">
      <div className="surface max-w-xl rounded-[2.4rem] p-8 text-center">
        <p className="eyebrow">404</p>
        <h1 className="h2 mt-5 font-display">This page could not be found.</h1>
        <p className="lead mt-4">The link may have moved, or the page may not exist in the current CMS content.</p>
        <Link href="/" className="btn btn-primary mt-6">Return home</Link>
      </div>
    </section>
  );
}
