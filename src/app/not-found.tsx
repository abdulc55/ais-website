import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Big animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] sm:text-[14rem] font-black leading-none tracking-tighter gradient-text select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/20 to-cyan-500/20 blur-2xl" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
          Page not found
        </h2>
        <p className="text-gray-500 mb-8 text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-white bg-[var(--color-spiffy-orange)] hover:bg-[var(--color-spiffy-orange-dark)] transition"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-navy border border-gray-200 hover:bg-gray-50 transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Subtle footer */}
        <p className="mt-12 text-sm text-gray-400">
          Need help? Call{" "}
          <a href="tel:+19842151498" className="text-primary-500 hover:underline">
            (984) 215-1498
          </a>
        </p>
      </div>
    </div>
  );
}
