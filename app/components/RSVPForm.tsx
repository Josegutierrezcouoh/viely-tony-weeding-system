'use client';

import { useState } from 'react';

export default function RSVPForm() {
  const [guestName, setGuestName] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí irá la lógica de backend más adelante
    console.log({ guestName, numberOfGuests, attending });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-block bg-green-50 border-2 border-green-200 rounded-lg p-8">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-2xl font-serif text-rose-900 mb-2">¡Gracias por confirmar!</h3>
          <p className="text-gray-600">Hemos recibido tu respuesta.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <div>
        <label htmlFor="guestName" className="block text-sm font-medium text-rose-900 mb-2">
          Nombre del invitado
        </label>
        <input
          type="text"
          id="guestName"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent"
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-rose-900 mb-3">
          ¿Confirmas tu asistencia?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              attending === true
                ? 'bg-rose-600 text-white shadow-lg'
                : 'bg-white border border-rose-200 text-rose-900 hover:bg-rose-50'
            }`}
          >
            Sí, asistiré
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              attending === false
                ? 'bg-gray-600 text-white shadow-lg'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            No podré asistir
          </button>
        </div>
      </div>

      {attending === true && (
        <div>
          <label htmlFor="numberOfGuests" className="block text-sm font-medium text-rose-900 mb-2">
            Número de asistentes
          </label>
          <input
            type="number"
            id="numberOfGuests"
            min="1"
            max="10"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
            required
            className="w-full px-4 py-3 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-300 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-2">
            Indica el número total de personas que asistirán
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={attending === null}
        className="w-full bg-rose-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-rose-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
      >
        Enviar confirmación
      </button>
    </form>
  );
}
