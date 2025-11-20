import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppContextType, ViewType, Project, Task } from '@/types';
import { mockProjects, mockTasks, activeUsers } from '@/data/mockData';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
