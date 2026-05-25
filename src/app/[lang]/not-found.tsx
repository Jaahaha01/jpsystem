import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white py-16">
      <Container>
        <div className="text-center">
        <h1 className="text-8xl font-extrabold tracking-tight text-slate-100 sm:text-9xl">
          404
        </h1>
        <h2 className="mt-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Page not found
        </h2>
        <p className="mt-4 text-base text-slate-600 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or didn't exist in the first place.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 hover:shadow-md"
        >
          Go back home
        </Link>
        </div>
      </Container>
    </div>
  );
}
