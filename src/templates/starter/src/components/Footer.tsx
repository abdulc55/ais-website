import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/siteConfig";

/**
 * Public footer — only intentionally-dark surface on the page. Anchors the
 * page and provides one moment of contrast against the bright canvas above.
 */
export default function Footer() {
  return (
    <footer className="bg-footer-bg text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="font-display text-xl text-white mb-3">
              {siteConfig.business.name}
            </h3>
            <p className="text-sm leading-relaxed text-white/70">
              {siteConfig.footer.description}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-[0.08em] mb-5">
              Quick Links
            </h4>
            <div className="space-y-3">
              <Link
                href="/"
                className="block text-sm text-white/70 hover:text-white transition"
              >
                Home
              </Link>
              {siteConfig.navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/70 hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-[0.08em] mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              {siteConfig.business.phone && (
                <a
                  href={`tel:${siteConfig.business.phone}`}
                  className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition"
                >
                  <Phone className="w-4 h-4" /> {siteConfig.business.phone}
                </a>
              )}
              <a
                href={`mailto:${siteConfig.business.email}`}
                className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition"
              >
                <Mail className="w-4 h-4" /> {siteConfig.business.email}
              </a>
              {siteConfig.business.address && (
                <div className="flex items-start gap-2.5 text-sm text-white/70">
                  <MapPin className="w-4 h-4 mt-0.5" />{" "}
                  {siteConfig.business.address}
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="border-white/10" />
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} {siteConfig.business.name}. All
            rights reserved.
          </p>
          <p className="text-white/50 text-xs">
            Built by{" "}
            <a
              href="https://spiffytec.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF751F] hover:text-[#FFAB80] transition font-medium"
            >
              Spiffy Tec
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
