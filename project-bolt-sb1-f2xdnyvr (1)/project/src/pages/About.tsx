import { Link } from 'react-router-dom';
import { Target, Eye, HeartHandshake, Cpu, Workflow, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';

const values = [
  { icon: Target, title: 'Our Mission', desc: 'To make quality healthcare accessible, organized, and patient-first through intelligent digital systems.' },
  { icon: Eye, title: 'Our Vision', desc: 'A future where every patient receives timely care and every doctor works at a sustainable, balanced pace.' },
  { icon: HeartHandshake, title: 'Our Philosophy', desc: 'Care should be compassionate, coordinated, and transparent — powered by technology, never replaced by it.' },
];

const benefits = [
  'Reduced patient waiting times through organized scheduling',
  'Balanced doctor workloads to prevent burnout',
  'Transparent appointment tracking for patients and staff',
  'Data-driven department and capacity planning',
  'AI-assisted recommendations for smarter reassignment',
  'Role-based secure access for admins, doctors, and patients',
];

export function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Healthcare, Reimagined."
        subtitle="SmartCare blends medical expertise with smart technology to deliver care that is organized, accessible, and human."
        image="https://images.pexels.com/photos/6627815/pexels-photo-6627815.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <section className="container-page py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Hospital" className="rounded-2xl object-cover shadow-md" loading="lazy" />
          <div>
            <SectionHeading eyebrow="Who We Are" title="A Modern Healthcare Network" subtitle="SmartCare is a multi-specialty hospital network with branches across the city, offering 10+ specialized departments and a team of experienced medical professionals." />
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              We believe great healthcare starts with great organization. Our platform connects patients, doctors, and administrators in one coordinated system — so appointments run on time, schedules stay balanced, and care never waits.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-50/60 py-20 dark:bg-brand-800/30">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="card p-7 text-center">
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-700/40 dark:text-brand-300">
                  <v.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-brand-800 dark:text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Technology-Enabled Care" title="Smart Systems Behind Better Outcomes" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Our integrated ERP tracks every appointment, every schedule, and every workload metric — giving administrators the visibility they need and giving doctors the breathing room they deserve.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Cpu, t: 'Digital Workflows', d: 'Paperless scheduling and records.' },
                { icon: Workflow, t: 'Workload Balancing', d: 'AI-assisted slot recommendations.' },
                { icon: Users, t: 'Team Coordination', d: 'Departments aligned in real time.' },
                { icon: CheckCircle2, t: 'Conflict Detection', d: 'No overlapping bookings.' },
              ].map((f) => (
                <div key={f.t} className="flex gap-3 rounded-xl border border-gray-100 p-4 dark:border-brand-700/40">
                  <f.icon className="h-6 w-6 flex-shrink-0 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-brand-800 dark:text-white">{f.t}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Organized Workflows" title="Benefits for Everyone" />
            <ul className="mt-6 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-brand-800 dark:text-gray-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" /> {b}
                </li>
              ))}
            </ul>
            <Link to="/erp" className="btn-primary mt-8">Explore the ERP <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
