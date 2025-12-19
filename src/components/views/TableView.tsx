import React, { useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowUpDown, CheckCircle2, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { VeltCommentTool, VeltCommentBubble } from '@veltdev/react';

const priorityColors: Record<TaskPriority, string> = {
  urgent: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-gray-100 text-gray-700 border-gray-200',
};

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
  blocked: 'Blocked',
};

const statusIcons: Record<TaskStatus, React.ReactNode> = {
  todo: <Circle className="w-4 h-4 text-gray-400" />,
  'in-progress': <Circle className="w-4 h-4 text-blue-500 fill-blue-500" />,
  done: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  blocked: <Circle className="w-4 h-4 text-red-500 fill-red-500" />,
};

export const TableView: React.FC = () => {
  const { tasks, setTasks, currentProject } = useApp();
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.projectId === currentProject?.id);
  }, [tasks, currentProject]);

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const updateTaskPriority = (taskId: string, newPriority: TaskPriority) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, priority: newPriority } : t)));
  };

  const columns = useMemo<ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const task = row.original;
          return (
            <Select
              value={task.status}
              onValueChange={(value) => updateTaskStatus(task.id, value as TaskStatus)}
            >
              <SelectTrigger className="w-[140px] h-8 border-0 hover:bg-muted/50">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {statusIcons[task.status]}
                    <span className="text-xs">{statusLabels[task.status]}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(statusLabels) as TaskStatus[]).map((status) => (
                  <SelectItem key={status} value={status}>
                    <div className="flex items-center gap-2">
                      {statusIcons[status]}
                      <span>{statusLabels[status]}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
      },
      {
        accessorKey: 'title',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1 hover:text-foreground"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Task Name
              <ArrowUpDown className="w-3 h-3" />
            </button>
          );
        },
        cell: ({ row }) => {
          const task = row.original;
          return (
            <div>
              <div className="font-medium text-sm">{task.title}</div>
              {task.description && (
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {task.description}
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => {
          const task = row.original;
          return (
            <Select
              value={task.priority}
              onValueChange={(value) => updateTaskPriority(task.id, value as TaskPriority)}
            >
              <SelectTrigger className="w-[100px] h-8 border-0 hover:bg-muted/50">
                <SelectValue>
                  <Badge variant="outline" className={`${priorityColors[task.priority]} text-xs capitalize`}>
                    {task.priority}
                  </Badge>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {(['urgent', 'high', 'medium', 'low'] as TaskPriority[]).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    <Badge variant="outline" className={`${priorityColors[priority]} capitalize`}>
                      {priority}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
      },
      {
        accessorKey: 'assignee',
        header: 'Assignee',
        cell: ({ row }) => {
          const assignee = row.original.assignee;
          if (!assignee) return <span className="text-xs text-muted-foreground">Unassigned</span>;
          return (
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={assignee.avatar} alt={assignee.name} />
                <AvatarFallback className="text-xs">{assignee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{assignee.name}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'dueDate',
        header: ({ column }) => {
          return (
            <button
              className="flex items-center gap-1 hover:text-foreground"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Due Date
              <ArrowUpDown className="w-3 h-3" />
            </button>
          );
        },
        cell: ({ row }) => {
          const dueDate = row.original.dueDate;
          if (!dueDate) return <span className="text-xs text-muted-foreground">No date</span>;
          return <span className="text-sm">{format(dueDate, 'MMM d, yyyy')}</span>;
        },
      },
      {
        accessorKey: 'tags',
        header: 'Tags',
        cell: ({ row }) => {
          const tags = row.original.tags;
          if (tags.length === 0) return null;
          return (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'subtasks',
        header: 'Progress',
        cell: ({ row }) => {
          const subtasks = row.original.subtasks;
          if (subtasks.length === 0) return null;
          const completed = subtasks.filter((st) => st.completed).length;
          const percentage = Math.round((completed / subtasks.length) * 100);
          return (
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {completed}/{subtasks.length}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'comments',
        header: 'Comments',
        cell: ({ row }) => {
          const task = row.original;
          return (
            <div 
              className="flex items-center gap-2"
              id={`task-card-${task.id}`}
              data-velt-target-comment-element-id={`task-card-${task.id}`}
            >
              <VeltCommentTool 
                targetElementId={`task-card-${task.id}`}
                context={{ 
                  taskId: task.id,
                  taskTitle: task.title,
                  projectId: task.projectId,
                  view: 'table'
                }}
              />
              <VeltCommentBubble 
                targetElementId={`task-card-${task.id}`}
                commentCountType="total"
              />
            </div>
          );
        },
      },
    ],
    [tasks]
  );

  const table = useReactTable({
    data: filteredTasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="h-full overflow-auto p-6">
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
