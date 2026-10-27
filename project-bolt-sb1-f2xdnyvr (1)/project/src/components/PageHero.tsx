interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}

export function PageHero({ eyebrow, title, subtitle, image }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-800/60" />
      <div className="container-page relative py-20 sm:py-28">
        <div className="max-w-2xl text-white">
          {eyebrow && <span className="text-sm font-semibold uppercase tracking-wider text-emerald-400">{eyebrow}</span>}
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 text-lg text-brand-100">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
