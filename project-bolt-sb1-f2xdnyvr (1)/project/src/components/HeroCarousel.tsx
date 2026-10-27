import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroImages } from '@/lib/data';

const AUTO_INTERVAL = 5000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % heroImages.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + heroImages.length) % heroImages.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden bg-brand-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="SmartCare highlights"
    >
      <div className="relative h-[560px] w-full sm:h-[600px] lg:h-[640px]">
        {heroImages.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/60 to-brand-900/20" />
          </div>
        ))}

        {/* Content */}
        <div className="container-page relative flex h-full items-center">
          <div className="max-w-xl text-white">
            {heroImages.map((slide, i) => (
              <div key={i} className={`${i === index ? 'block animate-fade-in' : 'hidden'}`}>
                <span className="inline-flex rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                  SmartCare Health
                </span>
                <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.headline}
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-100 sm:text-lg">
                  {slide.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={slide.primary.to} className="btn-emerald">
                    {slide.primary.label}
                  </Link>
                  <Link to={slide.secondary.to} className="btn-outline border-white/30 bg-white/10 text-white hover:bg-white/20">
                    {slide.secondary.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur transition hover:bg-white/30"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-2.5 text-white backdrop-blur transition hover:bg-white/30"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
