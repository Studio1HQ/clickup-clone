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
  const [newComment, setNewComment] = useState('');

  if (!task) return null;

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    // In a real app, this would update the task
    setNewSubtask('');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    // In a real app, this would add a comment
    setNewComment('');
  };

  const completedSubtasks = task.subtasks.filter((st) => st.completed).length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader>
          <div className="flex items-start gap-3">
            <Circle className="w-5 h-5 text-muted-foreground mt-1" />
            <div className="flex-1">
              <DialogTitle className="text-xl">{task.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
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
        <div className="grid grid-cols-3 gap-6 mt-4">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Description */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Description
              </label>
              <p className="text-sm text-foreground">{task.description}</p>
            </div>

            {/* Subtasks */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Subtasks ({completedSubtasks}/{task.subtasks.length})
                </label>
              </div>

              <div className="space-y-2">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      className="w-4 h-4 rounded border-gray-300"
                      readOnly
                    />
                    <span
                      className={`text-sm flex-1 ${
                        subtask.completed ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </div>
                ))}

                {/* Add Subtask */}
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    placeholder="Add a subtask..."
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={handleAddSubtask}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Comments ({task.comments.length})
              </label>

              <div className="space-y-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(comment.timestamp, 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="ml-4 mt-2 space-y-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-muted/50 rounded-lg p-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium">{reply.author.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {format(reply.timestamp, 'MMM d, h:mm a')}
                                  </span>
                                </div>
                                <p className="text-xs">{reply.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Comment */}
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                    <AvatarFallback>YU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <Button size="sm" onClick={handleAddComment}>
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Properties */}
          <div className="space-y-4">
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
                <Tag className="w-3 h-3" />
                TAGS
              </label>
              <div className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <X className="w-3 h-3 ml-1 cursor-pointer hover:text-destructive" />
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-6 px-2">
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
