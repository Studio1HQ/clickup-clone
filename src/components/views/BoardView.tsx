import React, { useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, MoreVertical, Calendar, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { VeltCommentBubble } from '@veltdev/react';

const statusColumns: { id: TaskStatus; label: string; color: string }[] = [
  { id: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-blue-100' },
  { id: 'done', label: 'Done', color: 'bg-green-100' },
  { id: 'blocked', label: 'Blocked', color: 'bg-red-100' },
];

const priorityColors: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-gray-400',
};

export const BoardView: React.FC = () => {
  const { tasks, setTasks, currentProject } = useApp();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.projectId === currentProject?.id);
  }, [tasks, currentProject]);

  const columnTasks = useMemo(() => {
    const columns: Record<TaskStatus, Task[]> = {
      todo: [],
      'in-progress': [],
      done: [],
      blocked: [],
    };

    filteredTasks.forEach((task) => {
      columns[task.status].push(task);
    });

    return columns;
  }, [filteredTasks]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    const updatedTasks = tasks.map((task) =>
      task.id === draggableId ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);
  };

  return (
    <div className="h-full overflow-x-auto p-6 bg-gray-50 dark:bg-gray-900">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 min-w-max">
          {statusColumns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              {/* Column Header */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm dark:text-white">{column.label}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {columnTasks[column.id].length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Droppable Column */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[500px] rounded-lg p-2 transition-colors ${
                      snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/30' : `${column.color} dark:bg-gray-800`
                    }`}
                  >
                    <div className="space-y-2">
                      {columnTasks[column.id].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              id={`task-card-${task.id}`}
                              data-velt-target-comment-element-id={`task-card-${task.id}`}
                              className={`bg-white dark:bg-gray-700 rounded-lg border border-border dark:border-gray-600 p-3 cursor-pointer hover:shadow-md transition-shadow relative ${
                                snapshot.isDragging ? 'shadow-lg rotate-2' : ''
                              }`}
                            >
                              {/* Comment Bubble - single visual for card/board views */}
                              {/* <div
                                className="absolute top-2 right-2 z-10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <VeltCommentBubble
                                  targetElementId={`task-card-${task.id}`}
                                  commentCountType="total"
                                />
                              </div> */}
                              
                              {/* Priority Indicator */}
                              <div className="flex items-start gap-2 mb-2">
                                <div
                                  className={`w-1 h-12 rounded-full ${
                                    priorityColors[task.priority]
                                  }`}
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm text-foreground dark:text-white mb-1">
                                    {task.title}
                                  </h4>
                                  {task.description && (
                                    <p className="text-xs text-muted-foreground dark:text-gray-300 line-clamp-2 mb-2">
                                      {task.description}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Tags */}
                              {task.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {task.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {task.tags.length > 2 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{task.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}

                              {/* Footer */}
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  {task.subtasks.length > 0 && (
                                    <span className="flex items-center gap-1 text-muted-foreground dark:text-gray-300">
                                      <CheckCircle2 className="w-3 h-3" />
                                      {task.subtasks.filter((st) => st.completed).length}/
                                      {task.subtasks.length}
                                    </span>
                                  )}
                                  {/* Comment tool intentionally omitted on board cards to avoid duplicate visuals */}
                                  {task.dueDate && (
                                    <span className="flex items-center gap-1 text-muted-foreground dark:text-gray-300">
                                      <Calendar className="w-3 h-3" />
                                      {format(task.dueDate, 'MMM d')}
                                    </span>
                                  )}
                                </div>

                                {task.assignee && (
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage
                                      src={task.assignee.avatar}
                                      alt={task.assignee.name}
                                    />
                                    <AvatarFallback className="text-xs">
                                      {task.assignee.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>

                    {/* Add Task Button */}
                    <Button variant="ghost" size="sm" className="w-full mt-2 gap-1">
                      <Plus className="w-4 h-4" />
                      Add Task
                    </Button>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
