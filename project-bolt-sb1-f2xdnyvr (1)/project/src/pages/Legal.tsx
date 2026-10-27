import { PageHero } from '@/components/PageHero';

export function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" image="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1600" />
      <section className="container-page py-16">
        <div className="prose max-w-none text-gray-600 dark:text-gray-300">
          <p>SmartCare Health Systems respects your privacy and is committed to protecting your personal and health information.</p>
          <h2 className="text-xl font-bold text-brand-800 dark:text-white">Information We Collect</h2>
          <p>When you book an appointment, we collect your name, contact details, and reason for visit. This is used solely to schedule and manage your care.</p>
          <h2 className="text-xl font-bold text-brand-800 dark:text-white">How We Use Information</h2>
          <p>Your information is used for appointment scheduling, doctor coordination, and operational analytics. We never sell your data.</p>
          <h2 className="text-xl font-bold text-brand-800 dark:text-white">Data Security</h2>
          <p>All data is stored securely with row-level security policies. Role-based access ensures doctors and staff only see data relevant to their role.</p>
          <h2 className="text-xl font-bold text-brand-800 dark:text-white">Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting our privacy office.</p>
        </div>
      </section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" image="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1600" />
      <section className="container-page py-16">
        <div className="prose max-w-none text-gray-600 dark:text-gray-300">
          <p>By using SmartCare Health Systems' website and portal, you agree to the following terms.</p>
          <h2 className="text-xl font-bold text-brand-800 dark:text-white">Appointment Bookings</h2>
          <p>Appointments are confirmed based on doctor availability. SmartCare reserves the right to reschedule or cancel appointments when necessary.</p>
          <h2 className="text-xl font-bold text-brand-800 dark:text-white">Medical Advice</h2>
          <p>Information on this website is for general purposes and does not replace professional medical consultation. Always consult a qualified doctor for diagnosis and treatment.</p>
          <h2 className="text-xl font-bold text-brand-800 dark:text-white">Portal Access</h2>
          <p>Access to dashboards is role-based. Unauthorized access to other users' data is prohibited.</p>
          <h2 className="text-xl font-bold text-brand-800 dark:text-white">Demo Data</h2>
          <p>Doctor profiles, testimonials, and dashboard statistics shown on this site are demonstration data for preview purposes.</p>
        </div>
      </section>
    </>
  );
}
