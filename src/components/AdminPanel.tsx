import { useState, useEffect } from 'react';
import { DashboardAPI, MembersAPI, ContactsAPI, EventsAPI, ProjectsAPI } from '../backend/api';
import type { Member, ContactMessage, Event, Project } from '../backend/database';

type Tab = 'dashboard' | 'members' | 'contacts' | 'events' | 'projects';

interface Stats {
  totalMembers: number;
  activeMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  totalProjects: number;
  activeProjects: number;
  totalMessages: number;
  unreadMessages: number;
  totalSubscribers: number;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [stats, setStats] = useState<Stats | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Show notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Load data based on active tab
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const statsRes = await DashboardAPI.getStats();
        if (statsRes.success && statsRes.data) setStats(statsRes.data);

        if (activeTab === 'members') {
          const res = await MembersAPI.getAll();
          if (res.success && res.data) setMembers(res.data);
        } else if (activeTab === 'contacts') {
          const res = await ContactsAPI.getAll();
          if (res.success && res.data) setContacts(res.data);
        } else if (activeTab === 'events') {
          const res = await EventsAPI.getAll();
          if (res.success && res.data) setEvents(res.data);
        } else if (activeTab === 'projects') {
          const res = await ProjectsAPI.getAll();
          if (res.success && res.data) setProjects(res.data);
        }
      } catch (error) {
        showNotification('error', 'Failed to load data');
      }
      setLoading(false);
    };
    loadData();
  }, [activeTab]);

  // Delete member
  const handleDeleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    const res = await MembersAPI.delete(id);
    if (res.success) {
      setMembers(prev => prev.filter(m => m.id !== id));
      showNotification('success', 'Member deleted successfully');
    } else {
      showNotification('error', res.error || 'Failed to delete member');
    }
  };

  // Delete contact
  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    const res = await ContactsAPI.delete(id);
    if (res.success) {
      setContacts(prev => prev.filter(c => c.id !== id));
      showNotification('success', 'Message deleted');
    }
  };

  // Delete event
  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const res = await EventsAPI.delete(id);
    if (res.success) {
      setEvents(prev => prev.filter(e => e.id !== id));
      showNotification('success', 'Event deleted');
    }
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const res = await ProjectsAPI.delete(id);
    if (res.success) {
      setProjects(prev => prev.filter(p => p.id !== id));
      showNotification('success', 'Project deleted');
    }
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'members', label: 'Anggota', icon: '👥' },
    { id: 'contacts', label: 'Pesan', icon: '✉️' },
    { id: 'events', label: 'Event', icon: '📅' },
    { id: 'projects', label: 'Project', icon: '🚀' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TN</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">TechNusa Management System</p>
              </div>
            </div>
            <a href="/" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              ← Kembali ke Website
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm mb-6 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && stats && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatCard title="Total Anggota" value={stats.totalMembers} subtitle={`${stats.activeMembers} aktif`} color="blue" />
                  <StatCard title="Total Event" value={stats.totalEvents} subtitle={`${stats.upcomingEvents} akan datang`} color="purple" />
                  <StatCard title="Total Project" value={stats.totalProjects} subtitle={`${stats.activeProjects} berjalan`} color="green" />
                  <StatCard title="Pesan Masuk" value={stats.totalMessages} subtitle={`${stats.unreadMessages} belum dibaca`} color="orange" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <StatCard title="Newsletter Subscribers" value={stats.totalSubscribers} subtitle="Total subscribers" color="cyan" />
                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <button onClick={() => setActiveTab('members')} className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium">
                        👥 Kelola Anggota
                      </button>
                      <button onClick={() => setActiveTab('contacts')} className="w-full text-left px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm font-medium">
                        ✉️ Lihat Pesan Masuk
                      </button>
                      <button onClick={() => setActiveTab('events')} className="w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium">
                        📅 Kelola Event
                      </button>
                      <button onClick={() => setActiveTab('projects')} className="w-full text-left px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 text-sm font-medium">
                        🚀 Kelola Project
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Data Anggota</h2>
                  <span className="text-sm text-gray-500">{members.length} anggota</span>
                </div>
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {members.map(member => (
                          <tr key={member.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="font-medium text-gray-900 text-sm">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.expertise}</div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{member.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{member.role}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                member.status === 'active' ? 'bg-green-100 text-green-700' :
                                member.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {member.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleDeleteMember(member.id)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Pesan Masuk</h2>
                  <span className="text-sm text-gray-500">{contacts.length} pesan</span>
                </div>
                {contacts.length === 0 ? (
                  <div className="bg-white rounded-xl p-12 text-center shadow-sm border">
                    <span className="text-4xl mb-4 block">📭</span>
                    <p className="text-gray-500">Belum ada pesan masuk</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map(contact => (
                      <div key={contact.id} className={`bg-white rounded-xl p-6 shadow-sm border ${
                        contact.status === 'unread' ? 'border-blue-200 bg-blue-50/30' : ''
                      }`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                              {contact.status === 'unread' && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{contact.email}</p>
                            <p className="text-sm font-medium text-gray-700 mb-1">Subject: {contact.subject}</p>
                            <p className="text-sm text-gray-600">{contact.message}</p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(contact.createdAt).toLocaleDateString('id-ID', { 
                                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                              })}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteContact(contact.id)}
                            className="text-red-400 hover:text-red-600 text-sm"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Data Event</h2>
                  <span className="text-sm text-gray-500">{events.length} event</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {events.map(event => (
                    <div key={event.id} className="bg-white rounded-xl p-6 shadow-sm border">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                          event.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {event.status}
                        </span>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-400 hover:text-red-600 text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>📅 {event.date}</span>
                        <span>👥 {event.currentParticipants}/{event.maxParticipants}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">📍 {event.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Data Project</h2>
                  <span className="text-sm text-gray-500">{projects.length} project</span>
                </div>
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id} className="bg-white rounded-xl p-6 shadow-sm border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{project.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-400 hover:text-red-600 text-sm"
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          project.status === 'planning' ? 'bg-yellow-100 text-yellow-700' :
                          project.status === 'development' ? 'bg-blue-100 text-blue-700' :
                          project.status === 'testing' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          Team: {project.team.join(', ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, subtitle, color }: { title: string; value: number; subtitle: string; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    cyan: 'from-cyan-500 to-cyan-600',
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center mb-3`}>
        <span className="text-white text-lg font-bold">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}
