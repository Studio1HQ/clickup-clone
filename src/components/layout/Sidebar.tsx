import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutList,
  KanbanSquare,
  Table2,
  FileText,
  ChevronDown,
  Plus,
  Star,
  Settings,
  LogOut,
} from 'lucide-react';
import { ViewType } from '@/types';

export const Sidebar: React.FC = () => {
  const { currentProject, setCurrentProject, projects, currentView, setCurrentView } = useApp();

  const views: { type: ViewType; icon: React.ReactNode; label: string }[] = [
    { type: 'list', icon: <LayoutList className="w-4 h-4" />, label: 'List' },
    { type: 'board', icon: <KanbanSquare className="w-4 h-4" />, label: 'Board' },
    { type: 'table', icon: <Table2 className="w-4 h-4" />, label: 'Table' },
    { type: 'document', icon: <FileText className="w-4 h-4" />, label: 'Docs' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-border dark:border-gray-700 flex flex-col h-screen">
      {/* Workspace Selector */}
      <div className="p-4 border-b border-border dark:border-gray-700">
        <button className="flex items-center justify-between w-full hover:bg-muted/50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
              W
            </div>
            <span className="font-semibold text-sm dark:text-white">My Workspace</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
        </button>
      </div>

      {/* Views */}
      <div className="p-3">
        <div className="text-xs font-semibold text-muted-foreground dark:text-gray-400 mb-2 px-2">VIEWS</div>
        <div className="space-y-1">
          {views.map((view) => (
            <button
              key={view.type}
              onClick={() => setCurrentView(view.type)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                currentView === view.type
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted/50 dark:hover:bg-gray-700 text-foreground dark:text-gray-200'
              }`}
            >
              {view.icon}
              <span>{view.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="p-3 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-2 px-2">
          <span className="text-xs font-semibold text-muted-foreground dark:text-gray-400">PROJECTS</span>
          <button className="hover:bg-muted/50 dark:hover:bg-gray-700 p-1 rounded transition-colors">
            <Plus className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
          </button>
        </div>
        <div className="space-y-1">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setCurrentProject(project)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors group ${
                currentProject?.id === project.id
                  ? 'bg-muted dark:bg-gray-700 text-foreground dark:text-white'
                  : 'hover:bg-muted/50 dark:hover:bg-gray-700 text-foreground dark:text-gray-200'
              }`}
            >
              <span className="text-lg">{project.icon}</span>
              <span className="flex-1 text-left truncate">{project.name}</span>
              {project.isFavorite && (
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate dark:text-white">You</div>
            <div className="text-xs text-muted-foreground dark:text-gray-400">you@example.com</div>
          </div>
          <div className="flex gap-1">
            <button className="hover:bg-muted/50 dark:hover:bg-gray-700 p-1.5 rounded transition-colors">
              <Settings className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
            </button>
            <button className="hover:bg-muted/50 dark:hover:bg-gray-700 p-1.5 rounded transition-colors">
              <LogOut className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
