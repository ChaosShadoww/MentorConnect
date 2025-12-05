# MentorConnect

A web application connecting college students (mentees) with experienced upperclassmen (mentors) for guidance and support.

## Overview

MentorConnect helps students find mentors in their field of study, enabling knowledge sharing and professional development within the campus community.

## Features

- **User Authentication** - Secure login and account creation with Supabase
- **Role-Based Accounts** - Separate mentor and mentee user types
- **Mentor Discovery** - Mentees can browse and connect with mentors
- **Real-Time Messaging** - Direct chat functionality between mentors and mentees
- **Profile Management** - View and manage user profiles
- **Career Tracking** - Users specify their major/career field
- **Active Chat History** - Track and access ongoing conversations
- **Responsive Design** - Works on desktop and mobile devices

## Prerequisites

Before installing MentorConnect, ensure you have:
- **Node.js** version 16 or higher
- **Git** installed on your system
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection for database connectivity

To check your Node.js version, run:
```bash
node --version
```

## Installation

### Quick Start

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

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
   
   Click on the localhost link (usually `http://localhost:5173/`) and the MentorConnect page should appear on the screen.

## Getting Started

### Create an Account

New users must create a MentorConnect account before logging in:

1. Click on the **"Create Account"** button
2. Enter the following information:
   - Your name
   - Email address
   - A password of at least 8 characters
   - Confirm that password
   - Your career/major
3. Select your role: **Mentor** or **Mentee**
4. Click "Create Account" to complete registration

After your account has been successfully created, you will return to the login page. If you accidentally clicked "Create Account", clicking the cancel button will also return you to the login page.

### Logging In

1. Enter your email and password
2. Select the role that you chose when creating your account
3. Click "Login"

**Note:** Mentees will be redirected to the mentee home page, while mentors will be redirected to the mentor home page.

## Using MentorConnect

### Mentee Home Page

Mentees will be able to view several mentors on their home page. Available features:
- **View Profiles** - Click "Profile" to view a mentor's detailed information
- **Start Chat** - Click "Start Chat" to initiate a conversation with a mentor
- **My Account** - View your own profile information
- **Active Chats** - Access a list of ongoing conversations

Clicking on any active chat or "Start Chat" will take you to the chat screen where you can send messages or view previous messages. Click "Exit Chat" to return to the home page.

### Mentor Home Page

The mentor home page allows mentors to:
- **My Account** - View your own profile by clicking "My Account"
- **Active Chats** - View and access all active conversations

Clicking on any active chat will take you to the chat screen where you can send messages or view previous messages. Click "Exit Chat" to return to the home page.

### Messaging

In the chat screen:
- Type your message in the input box at the bottom
- Press **Enter** or click **"Send"** to send the message
- Your messages appear in green on the right side
- Messages from the other user appear in gray on the left side
- All messages display with timestamps
- Scroll up to view message history

### Logging Out

Click the **"Logout"** button on the top of the homepage to log out of your account. Logging out will redirect you back to the login screen.

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Database:** Supabase (PostgreSQL)
- **Routing:** React Router v6
- **Styling:** CSS

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests with Vitest |

## Troubleshooting

### Installation Issues

**Problem:** `npm install` fails or shows errors

**Solutions:**
- Ensure Node.js version 16 or higher is installed
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again
- Check your internet connection
- Try running with administrator/sudo privileges

**Problem:** Port already in use when running `npm run dev`

**Solutions:**
- Kill the process using the port (usually 5173)
- On Linux/Mac: `lsof -ti:5173 | xargs kill -9`
- On Windows: `netstat -ano | findstr :5173` then `taskkill /PID [PID] /F`
- Or modify `vite.config.ts` to use a different port

### Login & Account Issues

**Problem:** "Invalid email, password, or role" error

**Solutions:**
- Verify your email address is correct
- Ensure your password matches what you created
- Confirm you selected the same role (Mentor/Mentee) you registered with
- Passwords are case-sensitive

**Problem:** "Email already exists" when creating account

**Solutions:**
- Use a different email address
- If you already have an account, click "Cancel" and log in instead

**Problem:** "Password must be at least 8 characters" error

**Solutions:**
- Ensure your password is 8 or more characters long
- Both password fields must match exactly

**Problem:** "Passwords do not match" error

**Solutions:**
- Retype your password carefully in both fields
- Check for extra spaces or hidden characters
- Ensure Caps Lock is not accidentally enabled

### Application Issues

**Problem:** Blank screen or white page after logging in

**Solutions:**
- Refresh the page (F5 or Ctrl+R)
- Clear browser cache and cookies
- Ensure JavaScript is enabled in your browser
- Try a different browser

**Problem:** Chat messages not loading or displaying

**Solutions:**
- Check your internet connection
- Refresh the page
- Log out and log back in
- Ensure the chat was properly created

**Problem:** Cannot see mentors on mentee home page

**Solutions:**
- Ensure you're logged in as a Mentee (not Mentor)
- Refresh the page
- Check that mentors exist in the system
- Verify internet connection for database access

**Problem:** Session lost after refresh

**Solutions:**
- Check browser settings allow localStorage
- Disable private/incognito browsing mode
- Check browser extensions that might block storage

**Problem:** Cannot send messages in chat

**Solutions:**
- Ensure message is not empty (type at least one character)
- Check internet connection
- Verify you're in an active chat room
- Refresh the page and try again

### Browser Compatibility

**Supported Browsers:**
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Safari (latest version)
- Microsoft Edge (latest version)

**Not Supported:**
- Internet Explorer (any version)
- Very old browser versions

If you experience issues, try updating your browser to the latest version.

## Frequently Asked Questions (FAQ)

**Q: Can I change my role after creating an account?**  
A: No, roles are fixed upon account creation. You would need to create a new account with a different email.

**Q: Can mentors search for mentees?**  
A: Currently, only mentees can browse and initiate conversations with mentors.

**Q: Is my password encrypted?**  
A: Passwords are currently stored in plain text. Do not use passwords you use for other important accounts.

**Q: Can I have multiple conversations with the same mentor?**  
A: The system prevents duplicate chat rooms. Clicking "Start Chat" with a mentor you've already chatted with will open your existing conversation.

**Q: What happens to my messages when I log out?**  
A: All messages are saved in the database and will be available when you log back in.

**Q: Why can't I see the "Mentors" section on my home page?**  
A: The Mentors section is only visible to mentees. Mentors only see their active chats.

## System Requirements

**Operating Systems:**
- Windows 10 or higher
- macOS 10.15 (Catalina) or higher
- Linux (Ubuntu 18.04+ or equivalent)

**Hardware:**
- Minimum 4GB RAM
- Internet connection required
- Modern processor (Intel Core i3 or equivalent)

**Software:**
- Node.js v16.0.0 or higher
- npm v7.0.0 or higher
- Modern web browser with JavaScript enabled

## Database Setup

The application uses Supabase with the following table structure:

**Users Table:**
- `id` (uuid) - Primary key
- `name` (text) - User's full name
- `email` (text) - User email
- `password` (text) - User password
- `role` (text) - 'mentor' or 'mentee'
- `career` (text) - User's career/major
- `created_at` (timestamptz) - Account creation date

**Chats Table:**
- `id` (uuid) - Primary key
- `mentor_id` (uuid) - Foreign key to users
- `mentee_id` (uuid) - Foreign key to users
- `created_at` (timestamptz) - Chat creation date
- `updated_at` (timestamptz) - Last message timestamp

**Messages Table:**
- `id` (uuid) - Primary key
- `chat_id` (uuid) - Foreign key to chats
- `sender_id` (uuid) - Foreign key to users
- `message_text` (text) - Message content
- `created_at` (timestamptz) - Message timestamp

## Team

- Elisha Jeanbaptiste/Diego Avalos - FrontEnd Development
- Nevaeh Wynn - UI/UX Design
- Jeffrey Arias/Sean Ramirez - Database Integration/BackEnd Development

## Security Notes

- All passwords are stored as plain text (development only - use proper encryption for production)
- Use environment variables to protect sensitive credentials
- Never commit `.env` file to version control

## License

This is a student project developed for educational purposes.

