import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CalendarPlus, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, User, Phone, Mail, FileText, MapPin, Clock, Building2, Loader2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { doctors, departments, locationNames, services } from '@/lib/data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Appointment } from '@/lib/types';

const steps = ['Department', 'Doctor', 'Date & Slot', 'Your Details', 'Confirm'] as const;

export function BookAppointment() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [department, setDepartment] = useState(params.get('department') ?? '');
  const [doctorSlug, setDoctorSlug] = useState(params.get('doctor') ?? '');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [form, setForm] = useState({ name: '', age: '', phone: '', email: '', reason: '', consultationType: 'In-person', location: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ref: string; saved: boolean } | null>(null);
  const [submitError, setSubmitError] = useState('');

  const doctor = useMemo(() => doctors.find((d) => d.slug === doctorSlug), [doctorSlug]);
  const deptDoctors = useMemo(() => doctors.filter((d) => !department || d.department === department), [department]);

  useEffect(() => {
    if (params.get('doctor')) setStep(2);
  }, [params]);

  // Load already-taken slots for the selected doctor + date from Supabase
  useEffect(() => {
    if (!doctorSlug || !date || !isSupabaseConfigured) {
      setTakenSlots([]);
      return;
    }
    setLoadingSlots(true);
    (async () => {
      const { data, error } = await supabase!
        .from('appointments')
        .select('time_slot')
        .eq('doctor_slug', doctorSlug)
        .eq('appt_date', date)
        .neq('status', 'cancelled');
      if (!error && data) setTakenSlots(data.map((r: { time_slot: string }) => r.time_slot));
      setLoadingSlots(false);
    })();
  }, [doctorSlug, date]);

  const availableSlots = useMemo(() => {
    if (!doctor) return [];
    return doctor.slots.filter((s) => !takenSlots.includes(s));
  }, [doctor, takenSlots]);

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (!/^\+?[\d\s-]{8,}$/.test(form.phone)) e.phone = 'Valid phone required';
    if (!form.location) e.location = 'Select a location';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validateDetails() || !doctor) return;
    setSubmitting(true);
    setSubmitError('');

    if (isSupabaseConfigured && supabase) {
      // Real persistence — re-check availability then insert
      const { data: conflict } = await supabase
        .from('appointments')
        .select('id')
        .eq('doctor_slug', doctorSlug)
        .eq('appt_date', date)
        .eq('time_slot', slot)
        .neq('status', 'cancelled')
        .maybeSingle();

      if (conflict) {
        setSubmitError('That slot was just booked. Please choose another time.');
        setTakenSlots((prev) => [...prev, slot]);
        setSlot('');
        setStep(2);
        setSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from('appointments')
        .insert({
          patient_name: form.name,
          patient_age: form.age ? Number(form.age) : null,
          phone: form.phone,
          email: form.email,
          department,
          doctor_slug: doctorSlug,
          doctor_name: doctor.name,
          location: form.location,
          appt_date: date,
          time_slot: slot,
          reason: form.reason,
          consultation_type: form.consultationType,
          status: 'pending',
        })
        .select('booking_ref')
        .single();

      if (error || !data) {
        setSubmitError(error?.message ?? 'Could not save your booking. Please try again.');
        setSubmitting(false);
        return;
      }
      setResult({ ref: data.booking_ref, saved: true });
    } else {
      // Demo fallback — not persisted
      const ref = 'SC-DEMO-' + Math.random().toString(36).slice(2, 8).toUpperCase();
      setResult({ ref, saved: false });
    }
    setSubmitting(false);
    setStep(4);
  };

  if (result) {
    return (
      <>
        <PageHero eyebrow="Appointment" title="Booking Confirmation" image="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1600" />
        <section className="container-page py-16">
          <div className="mx-auto max-w-lg card p-8 text-center">
            <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-9 w-9" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-brand-800 dark:text-white">Appointment Booked!</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Your booking reference is
            </p>
            <p className="mt-1 text-2xl font-extrabold tracking-wider text-emerald-600">{result.ref}</p>
            {!result.saved && (
              <p className="mt-3 rounded-lg bg-amber-50 px-4 py-2 text-xs text-amber-700">
                Demo mode — this booking was not saved to a live database. Save this reference for the preview.
              </p>
            )}
            <div className="mt-6 space-y-2 text-left text-sm text-gray-600 dark:text-gray-300">
              <p><span className="font-semibold text-brand-700 dark:text-brand-300">Doctor:</span> {doctor?.name}</p>
              <p><span className="font-semibold text-brand-700 dark:text-brand-300">Department:</span> {department}</p>
              <p><span className="font-semibold text-brand-700 dark:text-brand-300">Date:</span> {date}</p>
              <p><span className="font-semibold text-brand-700 dark:text-brand-300">Time:</span> {slot}</p>
              <p><span className="font-semibold text-brand-700 dark:text-brand-300">Location:</span> {form.location}</p>
            </div>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link to="/" className="btn-outline">Back to Home</Link>
              <Link to="/erp/patient/login" className="btn-primary">Track in Patient Portal</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const canProceed = [
    !!department,
    !!doctorSlug,
    !!date && !!slot,
    validateDetails,
  ][step] ?? true;

  return (
    <>
      <PageHero eyebrow="Appointments" title="Book an Appointment" subtitle="Four quick steps to confirm your visit." image="https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1600" />

      <section className="container-page py-12">
        {/* Stepper */}
        <div className="mb-10 flex items-center justify-between gap-2 overflow-x-auto">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${i <= step ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-400 dark:bg-brand-800'}`}>
                {i + 1}
              </div>
              <span className={`hidden text-sm font-medium sm:inline ${i <= step ? 'text-brand-700 dark:text-brand-300' : 'text-gray-400'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`h-0.5 flex-1 ${i < step ? 'bg-brand-500' : 'bg-gray-200 dark:bg-brand-700'}`} />}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl card p-7">
          {submitError && (
            <div className="mb-5 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="h-5 w-5" /> {submitError}
            </div>
          )}

          {/* Step 0: Department */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-brand-800 dark:text-white">Select a Department</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {departments.map((d) => (
                  <button key={d} onClick={() => { setDepartment(d); setDoctorSlug(''); }} className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${department === d ? 'border-brand-500 bg-brand-50 dark:bg-brand-700/30' : 'border-gray-100 hover:border-brand-300 dark:border-brand-700/40'}`}>
                    <Building2 className="h-5 w-5 text-brand-600" />
                    <span className="text-sm font-semibold text-brand-800 dark:text-white">{d}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Doctor */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-brand-800 dark:text-white">Choose a Doctor</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Department: {department}</p>
              <div className="mt-5 grid gap-3">
                {deptDoctors.map((d) => (
                  <button key={d.slug} onClick={() => setDoctorSlug(d.slug)} className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${doctorSlug === d.slug ? 'border-brand-500 bg-brand-50 dark:bg-brand-700/30' : 'border-gray-100 hover:border-brand-300 dark:border-brand-700/40'}`}>
                    <img src={d.photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-brand-800 dark:text-white">{d.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{d.specialization} • {d.experience}</p>
                    </div>
                  </button>
                ))}
                {deptDoctors.length === 0 && <p className="text-sm text-gray-500">No doctors in this department.</p>}
              </div>
            </div>
          )}

          {/* Step 2: Date & Slot */}
          {step === 2 && doctor && (
            <div>
              <h2 className="text-lg font-bold text-brand-800 dark:text-white">Pick a Date &amp; Time</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{doctor.name} • {doctor.availability}</p>
              <div className="mt-5">
                <label className="label">Appointment Date</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} value={date} onChange={(e) => { setDate(e.target.value); setSlot(''); }} className="input" />
              </div>
              {date && (
                <div className="mt-5">
                  <label className="label">Available Time Slots {loadingSlots && <Loader2 className="ml-1 inline h-4 w-4 animate-spin" />}</label>
                  {availableSlots.length === 0 && !loadingSlots && (
                    <p className="rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-700">All slots are booked for this date. Please pick another date.</p>
                  )}
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {availableSlots.map((s) => (
                      <button key={s} onClick={() => setSlot(s)} className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${slot === s ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : 'border-gray-100 text-brand-800 hover:border-emerald-300 dark:border-brand-700/40 dark:text-gray-200'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-brand-800 dark:text-white">Your Details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label"><User className="mr-1 inline h-4 w-4" />Full Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="label">Age</label>
                  <input type="number" min={0} max={120} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="label"><Phone className="mr-1 inline h-4 w-4" />Phone *</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className="label"><Mail className="mr-1 inline h-4 w-4" />Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="label"><MapPin className="mr-1 inline h-4 w-4" />Hospital Location *</label>
                  <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input">
                    <option value="">Select location</option>
                    {locationNames.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Consultation Type</label>
                  <select value={form.consultationType} onChange={(e) => setForm({ ...form, consultationType: e.target.value })} className="input">
                    <option>In-person</option>
                    <option>Video</option>
                    <option>Phone</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label"><FileText className="mr-1 inline h-4 w-4" />Reason for Visit</label>
                  <textarea rows={3} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className="input" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && doctor && (
            <div>
              <h2 className="text-lg font-bold text-brand-800 dark:text-white">Review &amp; Confirm</h2>
              <div className="mt-5 space-y-2.5 rounded-xl bg-brand-50 p-5 text-sm dark:bg-brand-800/50">
                <p><span className="font-semibold text-brand-700 dark:text-brand-300">Patient:</span> {form.name}</p>
                <p><span className="font-semibold text-brand-700 dark:text-brand-300">Doctor:</span> {doctor.name}</p>
                <p><span className="font-semibold text-brand-700 dark:text-brand-300">Department:</span> {department}</p>
                <p><span className="font-semibold text-brand-700 dark:text-brand-300">Date:</span> {date}</p>
                <p><span className="font-semibold text-brand-700 dark:text-brand-300">Time:</span> {slot}</p>
                <p><span className="font-semibold text-brand-700 dark:text-brand-300">Location:</span> {form.location}</p>
                <p><span className="font-semibold text-brand-700 dark:text-brand-300">Type:</span> {form.consultationType}</p>
              </div>
              {submitting ? (
                <div className="mt-5 flex items-center justify-center gap-2 text-brand-600"><Loader2 className="h-5 w-5 animate-spin" /> Saving your booking...</div>
              ) : (
                <button onClick={submit} className="btn-emerald mt-5 w-full">
                  <CheckCircle2 className="h-4 w-4" /> Confirm Booking
                </button>
              )}
            </div>
          )}

          {/* Nav buttons */}
          {step < 4 && (
            <div className="mt-7 flex justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="btn-ghost disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={() => {
                  if (step === 3 && !validateDetails()) return;
                  setStep((s) => Math.min(4, s + 1));
                }}
                disabled={!canProceed || (step === 2 && (!date || !slot))}
                className="btn-primary disabled:opacity-40"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
