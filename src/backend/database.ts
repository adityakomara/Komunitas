// Database simulation using localStorage
// This acts as our "backend" data layer

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  expertise: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  maxParticipants: number;
  currentParticipants: number;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: 'planning' | 'development' | 'testing' | 'completed';
  team: string[];
  startDate: string;
  endDate: string;
}

export interface Newsletter {
  id: string;
  email: string;
  subscribedAt: string;
}

// Simulated delay to mimic network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize default data if empty
function initializeData() {
  if (!localStorage.getItem('technusa_members')) {
    const defaultMembers: Member[] = [
      {
        id: '1',
        name: 'Ahmad Rizki',
        email: 'ahmad@technusa.id',
        phone: '081234567890',
        expertise: 'Full-Stack Developer',
        joinDate: '2020-01-15',
        status: 'active',
        role: 'Ketua Umum',
      },
      {
        id: '2',
        name: 'Sari Dewi',
        email: 'sari@technusa.id',
        phone: '081234567891',
        expertise: 'Data Scientist',
        joinDate: '2020-03-20',
        status: 'active',
        role: 'Wakil Ketua',
      },
      {
        id: '3',
        name: 'Budi Santoso',
        email: 'budi@technusa.id',
        phone: '081234567892',
        expertise: 'Cloud Architect',
        joinDate: '2020-05-10',
        status: 'active',
        role: 'Sekretaris',
      },
      {
        id: '4',
        name: 'Maya Putri',
        email: 'maya@technusa.id',
        phone: '081234567893',
        expertise: 'UI/UX Designer',
        joinDate: '2021-01-08',
        status: 'active',
        role: 'Bendahara',
      },
      {
        id: '5',
        name: 'Dimas Pratama',
        email: 'dimas@technusa.id',
        phone: '081234567894',
        expertise: 'Mobile Developer',
        joinDate: '2021-06-15',
        status: 'active',
        role: 'Koordinator Dev',
      },
      {
        id: '6',
        name: 'Rina Amelia',
        email: 'rina@technusa.id',
        phone: '081234567895',
        expertise: 'Project Manager',
        joinDate: '2022-02-01',
        status: 'active',
        role: 'Koordinator Event',
      },
    ];
    localStorage.setItem('technusa_members', JSON.stringify(defaultMembers));
  }

  if (!localStorage.getItem('technusa_events')) {
    const defaultEvents: Event[] = [
      {
        id: '1',
        title: 'Tech Talk: AI & Machine Learning',
        description: 'Diskusi tentang implementasi AI dalam industri Indonesia dengan pembicara dari Google dan Tokopedia.',
        date: '2025-01-15',
        type: 'Seminar',
        status: 'completed',
        maxParticipants: 100,
        currentParticipants: 87,
        location: 'Jakarta Convention Center',
      },
      {
        id: '2',
        title: 'Hackathon: Smart City Challenge',
        description: 'Kompetisi 48 jam untuk menciptakan solusi teknologi bagi permasalahan kota pintar.',
        date: '2025-02-20',
        type: 'Hackathon',
        status: 'completed',
        maxParticipants: 50,
        currentParticipants: 48,
        location: 'Co-Working Space Sudirman',
      },
      {
        id: '3',
        title: 'Workshop: Cloud Native Development',
        description: 'Pelatihan intensif menggunakan Kubernetes, Docker, dan microservices architecture.',
        date: '2025-03-10',
        type: 'Workshop',
        status: 'ongoing',
        maxParticipants: 30,
        currentParticipants: 25,
        location: 'TechNusa Office',
      },
      {
        id: '4',
        title: 'TechNusa Annual Meetup 2025',
        description: 'Pertemuan tahunan seluruh anggota dengan networking session dan sharing knowledge.',
        date: '2025-04-25',
        type: 'Meetup',
        status: 'upcoming',
        maxParticipants: 200,
        currentParticipants: 120,
        location: 'Hotel Mulia Jakarta',
      },
    ];
    localStorage.setItem('technusa_events', JSON.stringify(defaultEvents));
  }

  if (!localStorage.getItem('technusa_contacts')) {
    localStorage.setItem('technusa_contacts', JSON.stringify([]));
  }

  if (!localStorage.getItem('technusa_projects')) {
    const defaultProjects: Project[] = [
      {
        id: '1',
        title: 'Platform E-Learning',
        description: 'Sistem pembelajaran online untuk anggota TechNusa',
        techStack: ['React', 'Node.js', 'PostgreSQL'],
        status: 'completed',
        team: ['Ahmad Rizki', 'Sari Dewi'],
        startDate: '2024-06-01',
        endDate: '2024-12-15',
      },
      {
        id: '2',
        title: 'Smart Dashboard Analytics',
        description: 'Dashboard monitoring untuk event dan kegiatan organisasi',
        techStack: ['Vue.js', 'Python', 'MongoDB'],
        status: 'development',
        team: ['Dimas Pratama', 'Maya Putri'],
        startDate: '2025-01-10',
        endDate: '2025-06-30',
      },
      {
        id: '3',
        title: 'Mobile App TechNusa',
        description: 'Aplikasi mobile untuk memudahkan komunikasi antar anggota',
        techStack: ['React Native', 'Firebase', 'TypeScript'],
        status: 'testing',
        team: ['Dimas Pratama', 'Budi Santoso'],
        startDate: '2024-09-01',
        endDate: '2025-03-30',
      },
    ];
    localStorage.setItem('technusa_projects', JSON.stringify(defaultProjects));
  }

  if (!localStorage.getItem('technusa_newsletter')) {
    localStorage.setItem('technusa_newsletter', JSON.stringify([]));
  }
}

// Initialize on import
initializeData();

// Generic CRUD operations
class Database<T extends { id: string }> {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  async getAll(): Promise<T[]> {
    await delay(300);
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async getById(id: string): Promise<T | null> {
    await delay(200);
    const data = localStorage.getItem(this.storageKey);
    if (!data) return null;
    const items: T[] = JSON.parse(data);
    return items.find(item => item.id === id) || null;
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    await delay(400);
    const data = localStorage.getItem(this.storageKey);
    const items: T[] = data ? JSON.parse(data) : [];
    const newItem = { ...item, id: Date.now().toString() } as T;
    items.push(newItem);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return newItem;
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    await delay(300);
    const data = localStorage.getItem(this.storageKey);
    if (!data) return null;
    const items: T[] = JSON.parse(data);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    return items[index];
  }

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const data = localStorage.getItem(this.storageKey);
    if (!data) return false;
    const items: T[] = JSON.parse(data);
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
    return true;
  }

  async count(): Promise<number> {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return 0;
    const items: T[] = JSON.parse(data);
    return items.length;
  }
}

// Database instances
export const membersDB = new Database<Member>('technusa_members');
export const contactsDB = new Database<ContactMessage>('technusa_contacts');
export const eventsDB = new Database<Event>('technusa_events');
export const projectsDB = new Database<Project>('technusa_projects');
export const newsletterDB = new Database<Newsletter>('technusa_newsletter');
