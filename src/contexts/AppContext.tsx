import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppContextType, ViewType, Project, Task } from '@/types';
import { VeltUser } from '@/types/veltUser';
import { mockProjects, mockTasks, activeUsers } from '@/data/mockData';

interface ExtendedAppContextType extends AppContextType {
  currentVeltUser: VeltUser;
  staticVeltUsers: VeltUser[];
  onSwitchVeltUser: (user: VeltUser) => void;
}

const AppContext = createContext<ExtendedAppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  currentUser: VeltUser;
  staticUsers: VeltUser[];
  onSwitchUser: (user: VeltUser) => void;
}

export const AppProvider: React.FC<AppProviderProps> = ({ 
  children, 
  currentUser, 
  staticUsers, 
  onSwitchUser 
}) => {
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [currentProject, setCurrentProject] = useState<Project | null>(mockProjects[0]);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [projects] = useState<Project[]>(mockProjects);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentProject,
        setCurrentProject,
        tasks,
        setTasks,
        projects,
        activeUsers,
        currentVeltUser: currentUser,
        staticVeltUsers: staticUsers,
        onSwitchVeltUser: onSwitchUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
