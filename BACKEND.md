# TechNusa Backend Documentation

## Overview

Backend TechNusa adalah simulasi REST API yang berjalan sepenuhnya di client-side menggunakan `localStorage` sebagai database. Arsitektur ini memungkinkan website berfungsi layaknya memiliki backend sungguhan tanpa memerlukan server terpisah.

## Architecture

```
src/backend/
├── index.ts          # Exports utama
├── database.ts       # Database layer (localStorage CRUD)
└── api.ts           # API service layer (REST API simulation)
```

## Data Models

### Member
```typescript
interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  expertise: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
}
```

### ContactMessage
```typescript
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
}
```

### Event
```typescript
interface Event {
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
```

### Project
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: 'planning' | 'development' | 'testing' | 'completed';
  team: string[];
  startDate: string;
  endDate: string;
}
```

### Newsletter
```typescript
interface Newsletter {
  id: string;
  email: string;
  subscribedAt: string;
}
```

## API Endpoints

### Members API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/members | Get all members |
| GET | /api/members/:id | Get member by ID |
| POST | /api/members | Create new member |
| PUT | /api/members/:id | Update member |
| DELETE | /api/members/:id | Delete member |
| GET | /api/members/stats | Get member statistics |

### Contacts API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/contacts | Get all messages |
| POST | /api/contacts | Send new message |
| PUT | /api/contacts/:id/read | Mark as read |
| DELETE | /api/contacts/:id | Delete message |
| GET | /api/contacts/unread-count | Get unread count |

### Events API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/events | Get all events |
| GET | /api/events/:id | Get event by ID |
| POST | /api/events | Create new event |
| POST | /api/events/:id/register | Register for event |
| DELETE | /api/events/:id | Delete event |

### Projects API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/projects | Get all projects |
| GET | /api/projects/:id | Get project by ID |
| POST | /api/projects | Create new project |
| PUT | /api/projects/:id/status | Update project status |
| DELETE | /api/projects/:id | Delete project |

### Newsletter API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/newsletter/subscribe | Subscribe to newsletter |
| GET | /api/newsletter | Get all subscribers |

### Dashboard API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/dashboard/stats | Get dashboard statistics |

## Usage Example

```typescript
import { MembersAPI, ContactsAPI, EventsAPI } from './backend/api';

// Get all members
const members = await MembersAPI.getAll();

// Create a new contact message
const result = await ContactsAPI.create({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'membership',
  message: 'I want to join TechNusa'
});

// Register for an event
const event = await EventsAPI.registerParticipant('1');
```

## Admin Panel

Admin panel dapat diakses melalui hash route `#/admin`. Panel ini menyediakan:
- Dashboard overview dengan statistik
- Manajemen anggota (CRUD)
- Manajemen pesan masuk
- Manajemen event
- Manajemen project

## Storage Keys

Data disimpan di localStorage dengan prefix `technusa_`:
- `technusa_members` - Data anggota
- `technusa_contacts` - Pesan kontak
- `technusa_events` - Data event
- `technusa_projects` - Data project
- `technusa_newsletter` - Subscriber newsletter

## Notes

- Semua operasi database memiliki simulated delay (200-400ms) untuk meniru network latency
- Data persisten di localStorage (tidak hilang saat refresh)
- Validasi data dilakukan di API layer sebelum menyimpan ke database
- Response menggunakan format standar `{ success, data?, message?, error? }`
