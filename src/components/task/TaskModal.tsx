import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Flag,
  MessageSquare,
  Plus,
  Tag,
  User,
  X,
} from 'lucide-react';
import { format } from 'date-fns';
import { VeltInlineCommentsSection } from '@veltdev/react';

interface TaskModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
  blocked: 'Blocked',
};

const priorityColors: Record<TaskPriority, string> = {
  urgent: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-gray-100 text-gray-700',
};

export const TaskModal: React.FC<TaskModalProps> = ({ task, open, onClose }) => {
  const [newSubtask, setNewSubtask] = useState('');

  if (!task) return null;

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    // In a real app, this would update the task
    setNewSubtask('');
  };

  const completedSubtasks = task.subtasks.filter((st) => st.completed).length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-[1400px] w-[55vw] max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        {/* Header */}
        <DialogHeader className="pr-8">
          <div className="flex items-start gap-3">
            <Circle className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl break-words">{task.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {task.projectId}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Created {format(task.createdAt, 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            {/* Description */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Description
              </label>
              <p className="text-sm text-foreground">{task.description}</p>
            </div>

            {/* Subtasks */}
            <div className="min-w-0">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Subtasks ({completedSubtasks}/{task.subtasks.length})
                </label>
              </div>

              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      className="w-4 h-4 rounded border-gray-300 shrink-0"
                      readOnly
                    />
                    <span
                      className={`text-sm flex-1 min-w-0 break-words ${
                        subtask.completed ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </div>
                ))}

                {/* Add Subtask */}
                <div className="flex items-center gap-2 mt-3">
                  <Input
                    placeholder="Add a subtask..."
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                    className="text-sm flex-1 min-w-0"
                  />
                  <Button size="sm" onClick={handleAddSubtask} className="shrink-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments - Velt Inline Comments */}
            <div id={`task-comments-${task.id}`} className="min-w-0">
              <label className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 shrink-0" />
                Comments
              </label>

              <div className="bg-muted/30 rounded-lg p-4 min-h-[150px] overflow-hidden">
                <VeltInlineCommentsSection
                  targetElementId={`task-card-${task.id}`}
                  multiThread={true}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Properties */}
          <div className="space-y-4 order-1 lg:order-2 lg:border-l lg:border-border lg:pl-6">
            {/* Status */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                STATUS
              </label>
              <Select value={task.status}>
                <SelectTrigger>
                  <SelectValue>{statusLabels[task.status]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(statusLabels) as TaskStatus[]).map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusLabels[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block flex items-center gap-1">
                <Flag className="w-3 h-3" />
                PRIORITY
              </label>
              <Select value={task.priority}>
                <SelectTrigger>
                  <SelectValue>
                    <Badge className={`${priorityColors[task.priority]} capitalize`}>
                      {task.priority}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {(['urgent', 'high', 'medium', 'low'] as TaskPriority[]).map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      <Badge className={`${priorityColors[priority]} capitalize`}>
                        {priority}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assignee */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block flex items-center gap-1">
                <User className="w-3 h-3" />
                ASSIGNEE
              </label>
              {task.assignee ? (
                <div className="flex items-center gap-2 p-2 border border-border rounded-lg">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                    <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm flex-1">{task.assignee.name}</span>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full">
                  Assign
                </Button>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                DUE DATE
              </label>
              {task.dueDate ? (
                <div className="p-2 border border-border rounded-lg text-sm">
                  {format(task.dueDate, 'MMM d, yyyy')}
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full">
                  Set Date
                </Button>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block flex items-center gap-1">
                <Tag className="w-3 h-3 shrink-0" />
                TAGS
              </label>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <X className="w-3 h-3 ml-1 cursor-pointer hover:text-destructive shrink-0" />
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-6 px-2 shrink-0">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Created {format(task.createdAt, 'MMM d, yyyy')}</div>
                <div>Updated {format(task.updatedAt, 'MMM d, yyyy')}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
