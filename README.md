# MentorConnect

A web application connecting college students (mentees) with experienced upperclassmen (mentors) for guidance and support.

## 📋 Overview

MentorConnect helps students find mentors in their field of study, enabling knowledge sharing and professional development within the campus community.

## ✨ Features

- 🔐 **User Authentication** - Secure login and account creation with Supabase
- 👥 **Role-Based Accounts** - Separate mentor and mentee user types
- 💼 **Career Tracking** - Users specify their major/career field
- 🔒 **Database Security** - Row Level Security (RLS) policies protect user data
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/ChaosShadoww/MentorConnect.git
   cd MentorConnect
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```env
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
   
   *Contact the team lead for actual credentials*

4. **Start the development server**
```bash
   npm run dev
```

5. **Open your browser**
   
   Navigate to `http://localhost:5173/`

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Database:** Supabase (PostgreSQL)
- **Routing:** React Router v6
- **Authentication:** Supabase Auth

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## 🗄️ Database Setup

The application uses Supabase with the following table structure:

**Users Table:**
- `id` (uuid) - Primary key
- `email` (text) - User email
- `password` (text) - User password
- `role` (text) - 'mentor' or 'mentee'
- `career` (text) - User's career/major
- `created_at` (timestamptz) - Account creation date

**RLS Policies:**
- Public account creation (INSERT)
- Public read access for login (SELECT)
- Users can update their own data (UPDATE)
- Users can delete their own account (DELETE)

## 👥 Team

- Elisha Jeanbaptiste/Diego Avalos - FrontEnd Development
- Nevaeh Wynn - UI/UX Design
- Jeffrey Arias/Sean Ramirez - Database Integration/BackEnd Development

## 🔒 Security Notes

- All passwords are stored as plain text (development only - use Supabase Auth for production)
- RLS policies protect user data at the database level


## 📄 License

This is a student project developed for educational purposes.

