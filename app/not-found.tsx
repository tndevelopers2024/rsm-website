import Link from "next/link";
import { Orbits } from "@/components/Orbits";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80vh] place-items-center overflow-hidden bg-navy-deep px-6 text-center text-white">
      <Orbits className="absolute left-1/2 top-1/2 -z-10 w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div>
        <div className="font-serif text-[9rem] font-light leading-none text-gold">404</div>
        <p className="mt-4 text-xl text-white/75">This page could not be found.</p>
        <Link href="/" className="btn btn-gold mt-10">Back to home</Link>
      </div>
    </section>
  );
}
