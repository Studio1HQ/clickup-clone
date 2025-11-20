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
