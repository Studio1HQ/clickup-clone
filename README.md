# ClickUp Clone - Modern Project Management MVP

A beautiful, minimal ClickUp-inspired project management application built with React, TypeScript, and modern web technologies.

![ClickUp Clone](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Multiple View Types
- **List View** - Organized task groups with collapsible sections
- **Board View** - Kanban-style drag-and-drop task management
- **Table View** - Spreadsheet-like interface with sorting and inline editing
- **Document View** - Notion-style rich text editor with block-based editing

### Task Management
- Create, edit, and organize tasks
- Status tracking (To Do, In Progress, Done, Blocked)
- Priority levels (Urgent, High, Medium, Low)
- Assignee management
- Due dates
- Tags/Labels
- Subtasks with progress tracking
- Comments and discussions

### Collaborative UI (Mock Implementation)
- Avatar stack showing active users
- Presence indicators
- Real-time viewing status
- Comment threads with replies
- User profile management

### Modern Tech Stack
- **React 18** - Latest React features with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v4** - Modern utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **TanStack Table** - Powerful table management
- **BlockNote** - Notion-style editor
- **@hello-pangea/dnd** - Smooth drag-and-drop
- **date-fns** - Date formatting utilities
- **Lucide React** - Clean, minimal icons

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clickup-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── layout/           # Layout components (Sidebar, Header, etc.)
│   ├── views/            # View components (List, Board, Table, Document)
│   ├── task/             # Task-related components (TaskCard, TaskModal)
│   ├── collaborative/    # Collaborative UI (AvatarStack, PresenceIndicator)
│   └── ui/               # shadcn/ui components
├── contexts/             # React Context for state management
├── hooks/                # Custom React hooks
├── data/                 # Mock data
├── types/                # TypeScript types and interfaces
├── utils/                # Utility functions
├── App.tsx               # Main app component
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

## Key Features Explained

### List View
- Tasks grouped by status
- Collapsible sections
- Quick task creation
- Inline task details
- Click to open full task modal

### Board View
- Kanban-style columns
- Drag-and-drop between columns
- Visual priority indicators
- Compact card design
- Column-based organization

### Table View
- Sortable columns
- Inline editing for status and priority
- Progress visualization
- Assignee management
- Tag display
- Due date sorting

### Document View
- Block-based editing (like Notion)
- Slash commands for block types
- Drag to reorder blocks
- Rich text formatting
- Code blocks
- Lists and checkboxes

### Task Modal
- Comprehensive task details
- Status and priority management
- Assignee selection
- Due date picker
- Subtask management with checkboxes
- Comment threads with replies
- Tag management
- Creation/update timestamps

### Collaborative Features (UI Only)
- **Avatar Stack** - Shows up to 5 active users with overflow count
- **Presence Indicator** - Displays who's currently viewing
- **User Status** - Active, away, and offline states
- **Comments** - Threaded discussions with timestamps
- **Mock Data** - Realistic sample users and interactions

## Technology Highlights

### Tailwind CSS v4
The project uses the latest Tailwind CSS v4 with the new Vite plugin:
- `@import "tailwindcss"` syntax
- CSS variables with `@theme inline`
- Dark mode support ready
- shadcn/ui compatible

### shadcn/ui Integration
Beautiful, accessible components:
- Dialog/Modal
- Select dropdowns
- Buttons and inputs
- Badges
- Avatar components
- Calendar/date picker
- Toast notifications (Sonner)

### TanStack Table v8
Powerful table features:
- Column sorting
- Inline cell editing
- Custom cell renderers
- Type-safe API
- Flexible and performant

### BlockNote Editor
Rich editing experience:
- Slash commands
- Drag-and-drop blocks
- Multiple block types
- Clean, minimal UI
- Built on ProseMirror/Tiptap

### Drag-and-Drop
Two different libraries for optimal UX:
- **@hello-pangea/dnd** - Board view (column-to-column)
- **@dnd-kit** - List/Table views (row reordering)

## Mock Data

The application includes realistic mock data:
- 5 sample users with different statuses
- 4 projects with icons and colors
- 10+ tasks across different statuses
- Comments and replies
- Subtasks
- Various priorities and due dates

## Customization

### Adding New Projects
Edit `src/data/mockData.ts` and add to `mockProjects` array:
```typescript
{
  id: 'p5',
  name: 'Your Project',
  icon: '🎯',
  color: '#3B82F6',
  isFavorite: false,
}
```

### Adding New Tasks
Add to `mockTasks` array in `src/data/mockData.ts`:
```typescript
{
  id: 't11',
  title: 'Your task title',
  description: 'Task description',
  status: 'todo',
  priority: 'medium',
  // ... other properties
}
```

### Styling
- Global styles: `src/index.css`
- Theme colors: Tailwind CSS variables in `index.css`
- Component styles: Tailwind utility classes

## Future Enhancements

The MVP is ready for these additions:

### Backend Integration
- Connect to REST API or GraphQL
- Real-time updates with WebSockets
- User authentication
- Database persistence

### Real Collaboration
- Actual real-time sync (Liveblocks, Socket.io)
- Live cursors and selections
- Operational Transform or CRDT
- User presence tracking

### Additional Features
- Custom fields
- Time tracking
- File attachments
- Activity log
- Notifications
- Templates
- Recurring tasks
- Task dependencies
- Gantt chart view
- Calendar view
- Reports and analytics
- Team management
- Permissions system

### Performance
- Virtual scrolling for large lists
- Optimistic updates
- Offline support with service workers
- Progressive Web App (PWA)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Acknowledgments

- Inspired by [ClickUp](https://clickup.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Editor powered by [BlockNote](https://www.blocknotejs.org)

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

---

Built with ❤️ using React, TypeScript, and modern web technologies.

## Tools Used

- Claude Code for UI
- Velt

### Prompt Used for Claude Code

```txt

**Prompt for AI (React app development):**

I want you to help me build a **minimal, sleek project management web application** in **React** that functions like a **simplified, elegant version of ClickUp** focused on two main features:

1. **Project Tracker / Task Table**
2. **Document Editor Page (Notion-style editing)**

Below are the requirements and expectations:

---

**Core Concept and Inspiration**

ClickUp is an all-in-one project management platform that combines **task tracking, multiple views (list, table, board, Gantt, etc.), document creation/editing, collaboration, and workflow automation** into a unified workspace. It supports hierarchical organization, customizable tasks with statuses and fields, and real-time document editing. ([ClickUp][1])

Your task is **not to build every ClickUp feature**, but to **replicate the essential experience** of tracking projects and editing documents with great UI/UX.

---

**Feature Set**

**1. Project Tracker / Table View**

The app should include:

* A **project/task tracker component** that looks clean and minimal.
* A **table view** showing tasks with columns such as:

  * Task title
  * Status (e.g., To Do, In Progress, Done)
  * Priority
  * Due Date
  * Assignee(s)
  * Tags or custom fields
* The table should allow:

  * Sorting and filtering
  * Adding, editing, deleting tasks inline
  * Drag-and-drop reordering of rows
* Support custom field types (text, date, select).
* Visual distinction between statuses and priorities.
* The UI should resemble a modern project table (in ClickUp style) but simpler and more intuitive. ([ClickUp][2])

**2. Document Editor Page**

* A **rich-text document editor** similar to Notion but minimal:

  * Support for headings, paragraphs, bullet lists, checklists, code blocks, and tables.
  * Nested pages or sections.
  * Ability to **link tasks** to documents (e.g., highlight text and link to a task ID).
  * Real-time editing is ideal but basic save/auto-save is acceptable.
  * Keep the UI clean, distraction-free, and intuitive, similar to Notion or ClickUp Docs. ([ClickUp][3])

---

**Design Guidelines**

* Follow a **minimal design system** with modern UI components (e.g., similar to Notion/ClickUp aesthetic but simpler).
* Clean color palette, clear typography, responsive layout.
* Use reusable components (buttons, inputs, tables, modals).
* Focus on usability and performance.
* Smooth interactions (hover states, transitions).

---

**Technical Requirements**

* Use **React** with functional components and **hooks**.
* Use a UI library like **Tailwind CSS, Material UI, or similar**, but custom styling is fine if aligned with the minimal aesthetic.
* Use **React Router** for navigation between pages (e.g., Dashboard/Table view, Documents).
* Use **state management** with Context API or a lightweight state library (Recoil, Zustand, etc.).
* For the document editor, integrate a rich-text editor library such as **Slate.js, ProseMirror, TipTap, or Draft.js**.
* Persist data locally (local storage) or mock a backend (optional: provide REST API schema).
* Ensure the app is responsive and mobile-friendly.

---

**UX Workflow Examples**

* The main page opens to a **Project Tracker** showing a list of tasks in a table.
* Users can click a task row to open a side panel with **task details** and custom fields.
* Users can **create/edit documents** with a rich editor and link tasks in text.
* Users can switch between views like Table and Document using a sidebar.

---

**Deliverables**

1. **React project template** with folder structure and routing.
2. **Task management UI** with table view and data interaction.
3. **Document editing page** with rich-text editor and placeholder content.
4. Sample data and instructions to run locally (React + any mock API).
5. A brief UI/UX description of components and styling choices.

---
```

## Screenshots

### Initial Coding Phase

<img width="2940" height="1912" alt="1763642568232-SCR-20251120-pddt" src="https://github.com/user-attachments/assets/d0a5aba2-33e3-4160-91a3-e3d5919c9d7e" />

### During

<img width="2940" height="1912" alt="1763642568231-SCR-20251120-pdpk" src="https://github.com/user-attachments/assets/00fde421-aefc-4a50-95ad-ca13ede1799b" />

<img width="2940" height="1912" alt="SCR-20251120-rmni" src="https://github.com/user-attachments/assets/6dec26af-b64c-43f4-9f89-df4a27e14193" />



## Velt features added
- Presence
- Comments
  - Inline
  - Popover
