// API Service Layer - Simulates REST API endpoints
// This is our "backend" that the frontend communicates with

import {
  membersDB,
  contactsDB,
  eventsDB,
  projectsDB,
  newsletterDB,
  type Member,
  type ContactMessage,
  type Event,
  type Project,
  type Newsletter,
} from './database';

// API Response wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ============ MEMBERS API ============
export const MembersAPI = {
  // GET /api/members
  async getAll(): Promise<ApiResponse<Member[]>> {
    try {
      const members = await membersDB.getAll();
      return { success: true, data: members };
    } catch (error) {
      return { success: false, error: 'Failed to fetch members' };
    }
  },

  // GET /api/members/:id
  async getById(id: string): Promise<ApiResponse<Member>> {
    try {
      const member = await membersDB.getById(id);
      if (!member) {
        return { success: false, error: 'Member not found' };
      }
      return { success: true, data: member };
    } catch (error) {
      return { success: false, error: 'Failed to fetch member' };
    }
  },

  // POST /api/members
  async create(data: {
    name: string;
    email: string;
    phone: string;
    expertise: string;
    role: string;
  }): Promise<ApiResponse<Member>> {
    try {
      // Validation
      if (!data.name || !data.email || !data.expertise) {
        return { success: false, error: 'Name, email, and expertise are required' };
      }

      // Check duplicate email
      const members = await membersDB.getAll();
      if (members.find(m => m.email === data.email)) {
        return { success: false, error: 'Email already registered' };
      }

      const member = await membersDB.create({
        ...data,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'pending',
      });

      return { success: true, data: member, message: 'Member registered successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to create member' };
    }
  },

  // PUT /api/members/:id
  async update(id: string, data: Partial<Member>): Promise<ApiResponse<Member>> {
    try {
      const member = await membersDB.update(id, data);
      if (!member) {
        return { success: false, error: 'Member not found' };
      }
      return { success: true, data: member, message: 'Member updated successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to update member' };
    }
  },

  // DELETE /api/members/:id
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const deleted = await membersDB.delete(id);
      if (!deleted) {
        return { success: false, error: 'Member not found' };
      }
      return { success: true, message: 'Member deleted successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to delete member' };
    }
  },

  // GET /api/members/stats
  async getStats(): Promise<ApiResponse<{ total: number; active: number; pending: number }>> {
    try {
      const members = await membersDB.getAll();
      return {
        success: true,
        data: {
          total: members.length,
          active: members.filter(m => m.status === 'active').length,
          pending: members.filter(m => m.status === 'pending').length,
        },
      };
    } catch (error) {
      return { success: false, error: 'Failed to fetch stats' };
    }
  },
};

// ============ CONTACTS API ============
export const ContactsAPI = {
  // GET /api/contacts
  async getAll(): Promise<ApiResponse<ContactMessage[]>> {
    try {
      const contacts = await contactsDB.getAll();
      return { success: true, data: contacts };
    } catch (error) {
      return { success: false, error: 'Failed to fetch contacts' };
    }
  },

  // POST /api/contacts
  async create(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<ApiResponse<ContactMessage>> {
    try {
      if (!data.name || !data.email || !data.message) {
        return { success: false, error: 'Name, email, and message are required' };
      }

      const contact = await contactsDB.create({
        ...data,
        createdAt: new Date().toISOString(),
        status: 'unread',
      });

      return { success: true, data: contact, message: 'Message sent successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to send message' };
    }
  },

  // PUT /api/contacts/:id/read
  async markAsRead(id: string): Promise<ApiResponse<ContactMessage>> {
    try {
      const contact = await contactsDB.update(id, { status: 'read' });
      if (!contact) {
        return { success: false, error: 'Contact not found' };
      }
      return { success: true, data: contact };
    } catch (error) {
      return { success: false, error: 'Failed to mark as read' };
    }
  },

  // DELETE /api/contacts/:id
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      await contactsDB.delete(id);
      return { success: true, message: 'Contact deleted' };
    } catch (error) {
      return { success: false, error: 'Failed to delete contact' };
    }
  },

  // GET /api/contacts/unread-count
  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    try {
      const contacts = await contactsDB.getAll();
      return {
        success: true,
        data: { count: contacts.filter(c => c.status === 'unread').length },
      };
    } catch (error) {
      return { success: false, error: 'Failed to fetch unread count' };
    }
  },
};

// ============ EVENTS API ============
export const EventsAPI = {
  // GET /api/events
  async getAll(): Promise<ApiResponse<Event[]>> {
    try {
      const events = await eventsDB.getAll();
      return { success: true, data: events };
    } catch (error) {
      return { success: false, error: 'Failed to fetch events' };
    }
  },

  // GET /api/events/:id
  async getById(id: string): Promise<ApiResponse<Event>> {
    try {
      const event = await eventsDB.getById(id);
      if (!event) {
        return { success: false, error: 'Event not found' };
      }
      return { success: true, data: event };
    } catch (error) {
      return { success: false, error: 'Failed to fetch event' };
    }
  },

  // POST /api/events
  async create(data: {
    title: string;
    description: string;
    date: string;
    type: string;
    maxParticipants: number;
    location: string;
  }): Promise<ApiResponse<Event>> {
    try {
      if (!data.title || !data.date || !data.location) {
        return { success: false, error: 'Title, date, and location are required' };
      }

      const event = await eventsDB.create({
        ...data,
        status: 'upcoming',
        currentParticipants: 0,
      });

      return { success: true, data: event, message: 'Event created successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to create event' };
    }
  },

  // POST /api/events/:id/register
  async registerParticipant(eventId: string): Promise<ApiResponse<Event>> {
    try {
      const event = await eventsDB.getById(eventId);
      if (!event) {
        return { success: false, error: 'Event not found' };
      }
      if (event.currentParticipants >= event.maxParticipants) {
        return { success: false, error: 'Event is full' };
      }

      const updated = await eventsDB.update(eventId, {
        currentParticipants: event.currentParticipants + 1,
      });

      return { success: true, data: updated!, message: 'Successfully registered for event' };
    } catch (error) {
      return { success: false, error: 'Failed to register for event' };
    }
  },

  // DELETE /api/events/:id
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      await eventsDB.delete(id);
      return { success: true, message: 'Event deleted' };
    } catch (error) {
      return { success: false, error: 'Failed to delete event' };
    }
  },
};

// ============ PROJECTS API ============
export const ProjectsAPI = {
  // GET /api/projects
  async getAll(): Promise<ApiResponse<Project[]>> {
    try {
      const projects = await projectsDB.getAll();
      return { success: true, data: projects };
    } catch (error) {
      return { success: false, error: 'Failed to fetch projects' };
    }
  },

  // GET /api/projects/:id
  async getById(id: string): Promise<ApiResponse<Project>> {
    try {
      const project = await projectsDB.getById(id);
      if (!project) {
        return { success: false, error: 'Project not found' };
      }
      return { success: true, data: project };
    } catch (error) {
      return { success: false, error: 'Failed to fetch project' };
    }
  },

  // POST /api/projects
  async create(data: {
    title: string;
    description: string;
    techStack: string[];
    team: string[];
    startDate: string;
    endDate: string;
  }): Promise<ApiResponse<Project>> {
    try {
      if (!data.title || !data.description) {
        return { success: false, error: 'Title and description are required' };
      }

      const project = await projectsDB.create({
        ...data,
        status: 'planning',
      });

      return { success: true, data: project, message: 'Project created successfully' };
    } catch (error) {
      return { success: false, error: 'Failed to create project' };
    }
  },

  // PUT /api/projects/:id/status
  async updateStatus(id: string, status: Project['status']): Promise<ApiResponse<Project>> {
    try {
      const project = await projectsDB.update(id, { status });
      if (!project) {
        return { success: false, error: 'Project not found' };
      }
      return { success: true, data: project, message: 'Project status updated' };
    } catch (error) {
      return { success: false, error: 'Failed to update project status' };
    }
  },

  // DELETE /api/projects/:id
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      await projectsDB.delete(id);
      return { success: true, message: 'Project deleted' };
    } catch (error) {
      return { success: false, error: 'Failed to delete project' };
    }
  },
};

// ============ NEWSLETTER API ============
export const NewsletterAPI = {
  // POST /api/newsletter/subscribe
  async subscribe(email: string): Promise<ApiResponse<Newsletter>> {
    try {
      if (!email || !email.includes('@')) {
        return { success: false, error: 'Valid email is required' };
      }

      // Check duplicate
      const existing = await newsletterDB.getAll();
      if (existing.find(n => n.email === email)) {
        return { success: false, error: 'Email already subscribed' };
      }

      const subscription = await newsletterDB.create({
        email,
        subscribedAt: new Date().toISOString(),
      });

      return { success: true, data: subscription, message: 'Successfully subscribed to newsletter' };
    } catch (error) {
      return { success: false, error: 'Failed to subscribe' };
    }
  },

  // GET /api/newsletter
  async getAll(): Promise<ApiResponse<Newsletter[]>> {
    try {
      const subscribers = await newsletterDB.getAll();
      return { success: true, data: subscribers };
    } catch (error) {
      return { success: false, error: 'Failed to fetch subscribers' };
    }
  },
};

// ============ DASHBOARD API ============
export const DashboardAPI = {
  // GET /api/dashboard/stats
  async getStats(): Promise<ApiResponse<{
    totalMembers: number;
    activeMembers: number;
    totalEvents: number;
    upcomingEvents: number;
    totalProjects: number;
    activeProjects: number;
    totalMessages: number;
    unreadMessages: number;
    totalSubscribers: number;
  }>> {
    try {
      const [members, events, projects, contacts, subscribers] = await Promise.all([
        membersDB.getAll(),
        eventsDB.getAll(),
        projectsDB.getAll(),
        contactsDB.getAll(),
        newsletterDB.getAll(),
      ]);

      return {
        success: true,
        data: {
          totalMembers: members.length,
          activeMembers: members.filter(m => m.status === 'active').length,
          totalEvents: events.length,
          upcomingEvents: events.filter(e => e.status === 'upcoming').length,
          totalProjects: projects.length,
          activeProjects: projects.filter(p => p.status === 'development' || p.status === 'testing').length,
          totalMessages: contacts.length,
          unreadMessages: contacts.filter(c => c.status === 'unread').length,
          totalSubscribers: subscribers.length,
        },
      };
    } catch (error) {
      return { success: false, error: 'Failed to fetch dashboard stats' };
    }
  },
};
