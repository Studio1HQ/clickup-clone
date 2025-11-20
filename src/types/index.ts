export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ViewType = 'list' | 'board' | 'table' | 'document';
export type UserStatus = 'active' | 'away' | 'offline';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  status: UserStatus;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: Date;
  replies: Comment[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: User | null;
  dueDate: Date | null;
  tags: string[];
  subtasks: Subtask[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  icon: string;
  color: string;
  isFavorite: boolean;
}

export interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  projects: Project[];
  activeUsers: User[];
}
