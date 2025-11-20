import { useState } from 'react';
import { Task } from '@/types';

export const useTaskModal = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openTask = (task: Task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const closeTask = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedTask(null), 200);
  };

  return {
    selectedTask,
    isOpen,
    openTask,
    closeTask,
  };
};
