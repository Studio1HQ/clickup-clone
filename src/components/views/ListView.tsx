import React, { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { TaskCard } from '@/components/task/TaskCard';
import { TaskModal } from '@/components/task/TaskModal';
import { useTaskModal } from '@/hooks/useTaskModal';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { TaskStatus } from '@/types';

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
  blocked: 'Blocked',
};

const statusColors: Record<TaskStatus, string> = {
  todo: 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
  blocked: 'bg-red-100 text-red-700',
};

export const ListView: React.FC = () => {
  const { tasks, currentProject } = useApp();
  const [collapsedGroups, setCollapsedGroups] = useState<Set<TaskStatus>>(new Set());
  const { selectedTask, isOpen, openTask, closeTask } = useTaskModal();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.projectId === currentProject?.id);
  }, [tasks, currentProject]);

  const groupedTasks = useMemo(() => {
    const groups: Record<TaskStatus, typeof tasks> = {
      todo: [],
      'in-progress': [],
      done: [],
      blocked: [],
    };

    filteredTasks.forEach((task) => {
      groups[task.status].push(task);
    });

    return groups;
  }, [filteredTasks]);

  const toggleGroup = (status: TaskStatus) => {
    const newCollapsed = new Set(collapsedGroups);
    if (newCollapsed.has(status)) {
      newCollapsed.delete(status);
    } else {
      newCollapsed.add(status);
    }
    setCollapsedGroups(newCollapsed);
  };

  return (
    <>
      <div className="h-full overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {(Object.keys(groupedTasks) as TaskStatus[]).map((status) => {
            const tasksInGroup = groupedTasks[status];
            const isCollapsed = collapsedGroups.has(status);

            return (
              <div key={status} className="bg-gray-50 rounded-lg p-4">
                {/* Group Header */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => toggleGroup(status)}
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                  >
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-sm">{statusLabels[status]}</h2>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
                      >
                        {tasksInGroup.length}
                      </span>
                    </div>
                  </button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Plus className="w-4 h-4" />
                    Add Task
                  </Button>
                </div>

                {/* Tasks */}
                {!isCollapsed && (
                  <div className="space-y-2">
                    {tasksInGroup.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No tasks in this status
                      </div>
                    ) : (
                      tasksInGroup.map((task) => (
                        <TaskCard key={task.id} task={task} onClick={() => openTask(task)} />
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <TaskModal task={selectedTask} open={isOpen} onClose={closeTask} />
    </>
  );
};
