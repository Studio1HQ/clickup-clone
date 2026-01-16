import React from 'react';
import { Task } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { VeltCommentBubble } from '@veltdev/react';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const priorityColors: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-gray-100 text-gray-700 border-gray-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  todo: <Circle className="w-4 h-4 text-gray-400" />,
  'in-progress': <Circle className="w-4 h-4 text-blue-500 fill-blue-500" />,
  done: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  blocked: <Circle className="w-4 h-4 text-red-500 fill-red-500" />,
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const completedSubtasks = task.subtasks.filter((st) => st.completed).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <div
      onClick={onClick}
      id={`task-card-${task.id}`}
      data-velt-target-comment-element-id={`task-card-${task.id}`}
      className="bg-white border border-border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group relative"
    >
      {/* Comment Bubble - shows when task has comments (single visual) */}
      <div
        className="absolute top-2 right-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <VeltCommentBubble
          targetElementId={`task-card-${task.id}`}
          commentCountType="total"
        />
      </div>
      
      {/* Status & Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-0.5">{statusIcons[task.status]}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          {/* Priority */}
          <Badge
            variant="outline"
            className={`${priorityColors[task.priority]} text-xs capitalize`}
          >
            {task.priority}
          </Badge>

          {/* Subtasks */}
          {totalSubtasks > 0 && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <CheckCircle2 className="w-3 h-3" />
              {completedSubtasks}/{totalSubtasks}
            </span>
          )}

          {/* Note: only bubble is shown on card/list views to avoid duplicate visuals */}

          {/* Due Date */}
          {task.dueDate && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {format(task.dueDate, 'MMM d')}
            </span>
          )}
        </div>

        {/* Assignee */}
        {task.assignee && (
          <Avatar className="w-6 h-6">
            <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
            <AvatarFallback className="text-xs">
              {task.assignee.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};
