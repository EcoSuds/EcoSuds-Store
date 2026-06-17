import Link from "next/link";

export default function Custom404() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--background)] px-4 py-16 text-[var(--foreground)]">
      <section className="surface max-w-xl rounded-[2.4rem] p-8 text-center">
        <p className="eyebrow">404</p>
        <h1 className="h2 mt-5 font-display">This page could not be found.</h1>
        <p className="lead mt-4">The page may have moved. Head back to the studio and store hub.</p>
        <Link href="/" className="btn btn-primary mt-6">Return home</Link>
      </section>
    </main>
  );
}
