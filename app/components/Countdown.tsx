'use client';

import { useEffect, useState } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date('2026-01-02T18:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-16 bg-linear-to-b from-purple-50 to-white bg-[url('/pattern.png')] bg-repeat">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-serif text-purple-900 mb-8">
          Faltan
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-purple-100">
            <div className="text-4xl md:text-5xl font-bold text-purple-700 mb-2">
              {timeLeft.days}
            </div>
            <div className="text-sm md:text-base text-purple-900 uppercase tracking-wider">
              Días
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-purple-100">
            <div className="text-4xl md:text-5xl font-bold text-purple-700 mb-2">
              {timeLeft.hours}
            </div>
            <div className="text-sm md:text-base text-purple-900 uppercase tracking-wider">
              Horas
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-purple-100">
            <div className="text-4xl md:text-5xl font-bold text-purple-700 mb-2">
              {timeLeft.minutes}
            </div>
            <div className="text-sm md:text-base text-purple-900 uppercase tracking-wider">
              Minutos
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-purple-100">
            <div className="text-4xl md:text-5xl font-bold text-purple-700 mb-2">
              {timeLeft.seconds}
            </div>
            <div className="text-sm md:text-base text-purple-900 uppercase tracking-wider">
              Segundos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
