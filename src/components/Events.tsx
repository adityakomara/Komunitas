import { useState, useEffect } from 'react';
import { EventsAPI } from '../backend/api';
import type { Event } from '../backend/database';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [registerStatus, setRegisterStatus] = useState<{ id: string; message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const response = await EventsAPI.getAll();
      if (response.success && response.data) {
        setEvents(response.data);
      }
      setLoading(false);
    };
    loadEvents();
  }, []);

  const handleRegister = async (eventId: string) => {
    setRegisteringId(eventId);
    const response = await EventsAPI.registerParticipant(eventId);
    
    if (response.success) {
      setRegisterStatus({ id: eventId, message: 'Berhasil mendaftar!', type: 'success' });
      // Update local state
      setEvents(prev => prev.map(e => 
        e.id === eventId ? { ...e, currentParticipants: e.currentParticipants + 1 } : e
      ));
    } else {
      setRegisterStatus({ id: eventId, message: response.error || 'Gagal mendaftar', type: 'error' });
    }
    
    setRegisteringId(null);
    setTimeout(() => setRegisterStatus(null), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gray-100 text-gray-600';
      case 'ongoing': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Selesai';
      case 'ongoing': return 'Berlangsung';
      case 'upcoming': return 'Akan Datang';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Seminar': return 'bg-blue-500';
      case 'Hackathon': return 'bg-purple-500';
      case 'Workshop': return 'bg-green-500';
      case 'Meetup': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <section id="kegiatan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
              Kegiatan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Event & Kegiatan Terbaru
            </h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="kegiatan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
            Kegiatan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Event & Kegiatan Terbaru
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai kegiatan rutin dan event spesial yang kami selenggarakan untuk mengembangkan kompetensi dan memperluas jaringan anggota.
          </p>
        </div>

        {/* Events Timeline */}
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Date */}
                <div className="flex-shrink-0">
                  <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                    <div className="text-sm font-bold text-gray-900">
                      {new Date(event.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`${getTypeColor(event.type)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                      {event.type}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(event.status)}`}>
                      {getStatusLabel(event.status)}
                    </span>
                    <span className="text-xs text-gray-400">
                      👥 {event.currentParticipants}/{event.maxParticipants} peserta
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                  <p className="text-xs text-gray-400 mt-1">📍 {event.location}</p>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  {event.status === 'upcoming' || event.status === 'ongoing' ? (
                    <button
                      onClick={() => handleRegister(event.id)}
                      disabled={registeringId === event.id || event.currentParticipants >= event.maxParticipants}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {registeringId === event.id ? (
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Mendaftar...
                        </span>
                      ) : event.currentParticipants >= event.maxParticipants ? (
                        'Penuh'
                      ) : (
                        'Daftar'
                      )}
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">Event selesai</span>
                  )}
                  
                  {/* Registration Status */}
                  {registerStatus && registerStatus.id === event.id && (
                    <div className={`mt-2 text-xs ${registerStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {registerStatus.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Data event diambil dari database • {events.length} event tersedia
          </p>
        </div>
      </div>
    </section>
  );
}
