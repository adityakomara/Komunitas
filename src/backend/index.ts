// Backend Module - Exports
// This module provides a complete backend simulation for the TechNusa website

// Database Layer
export {
  membersDB,
  contactsDB,
  eventsDB,
  projectsDB,
  newsletterDB,
} from './database';

// Types
export type {
  Member,
  ContactMessage,
  Event,
  Project,
  Newsletter,
} from './database';

// API Layer
export {
  MembersAPI,
  ContactsAPI,
  EventsAPI,
  ProjectsAPI,
  NewsletterAPI,
  DashboardAPI,
} from './api';
