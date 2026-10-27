import { Link } from 'react-router-dom';
import { HeartPulse, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-brand-700/30 bg-brand-800 text-brand-100">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
                <HeartPulse className="h-6 w-6" />
              </span>
              <span className="text-lg font-extrabold text-white">
                Smart<span className="text-emerald-400">Care</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              Smarter Workflows. Better Care. Healthier Tomorrows. SmartCare connects patients, doctors, and administrators through an intelligent digital healthcare platform.
            </p>
            <div className="mt-5 flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="rounded-lg bg-brand-700/50 p-2 text-brand-200 transition hover:bg-brand-600 hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/doctors" className="hover:text-white">Doctors</Link></li>
              <li><Link to="/locations" className="hover:text-white">Locations</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Departments</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/services" className="hover:text-white">Cardiology</Link></li>
              <li><Link to="/services" className="hover:text-white">Neurology</Link></li>
              <li><Link to="/services" className="hover:text-white">Orthopedics</Link></li>
              <li><Link to="/services" className="hover:text-white">Pediatrics</Link></li>
              <li><Link to="/book-appointment" className="font-semibold text-emerald-400 hover:text-emerald-300">Book Appointment</Link></li>
              <li><Link to="/erp" className="font-semibold text-brand-300 hover:text-white">Workload ERP</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5"><MapPin className="h-4 w-4 flex-shrink-0 text-brand-300" /> 12 Marine Drive, Mumbai 400020</li>
              <li className="flex gap-2.5"><Phone className="h-4 w-4 flex-shrink-0 text-brand-300" /> +91 22 4000 1000</li>
              <li className="flex gap-2.5"><Mail className="h-4 w-4 flex-shrink-0 text-brand-300" /> care@smartcare.health</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-brand-700/40 pt-6 text-xs text-brand-300 sm:flex-row">
          <p>© {year} SmartCare Health Systems. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
