import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { departments, locations } from '@/lib/data';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', department: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email is required';
    if (!/^\+?[\d\s-]{8,}$/.test(form.phone)) e.phone = 'Valid phone is required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }
    // Demo: no backend persistence for contact messages. Clearly labelled.
    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', department: '', message: '' });
    setTimeout(() => setStatus('idle'), 6000);
  };

  const field = (key: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="label" htmlFor={key}>{label}</label>
      <input
        id={key}
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="input"
      />
      {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in Touch"
        subtitle="Questions, feedback, or appointment help — our team is here for you."
        image="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="card p-7">
              <h2 className="text-xl font-bold text-brand-800 dark:text-white">Send a Message</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Demo form — messages are not stored on a server.</p>

              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" /> Thank you! Your message has been received (demo).
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  <AlertCircle className="h-5 w-5" /> Please correct the highlighted fields.
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                {field('name', 'Full Name', 'text', 'John Doe')}
                {field('email', 'Email', 'email', 'john@example.com')}
                {field('phone', 'Phone', 'tel', '+91 98765 43210')}
                {field('subject', 'Subject', 'text', 'How can we help?')}
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="department">Department</label>
                  <select id="department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="input">
                    <option value="">Select department</option>
                    {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="message">Message</label>
                  <textarea id="message" rows={5} placeholder="Type your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input" />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary sm:col-span-2">
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-5">
            <div className="card p-6">
              <h3 className="font-bold text-brand-800 dark:text-white">Contact Details</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex gap-2.5"><MapPin className="h-5 w-5 flex-shrink-0 text-brand-500" /> 12 Marine Drive, Mumbai 400020</li>
                <li className="flex gap-2.5"><Phone className="h-5 w-5 flex-shrink-0 text-brand-500" /> +91 22 4000 1000</li>
                <li className="flex gap-2.5"><Mail className="h-5 w-5 flex-shrink-0 text-brand-500" /> care@smartcare.health</li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-brand-800 dark:text-white">Operating Hours</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex gap-2.5"><Clock className="h-5 w-5 flex-shrink-0 text-brand-500" /> Mon–Sat: 8:00 AM – 8:00 PM</li>
                <li className="flex gap-2.5"><Clock className="h-5 w-5 flex-shrink-0 text-emerald-500" /> Emergency: 24/7</li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-brand-800 dark:text-white">Our Branches</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                {locations.map((l) => <li key={l.id}>• {l.name}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
