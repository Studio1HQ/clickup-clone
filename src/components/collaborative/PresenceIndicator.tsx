import React from 'react';
import { User } from '@/types';
import { Eye } from 'lucide-react';

interface PresenceIndicatorProps {
  users: User[];
}

export const PresenceIndicator: React.FC<PresenceIndicatorProps> = ({ users }) => {
  const activeUsers = users.filter(u => u.status === 'active');

  if (activeUsers.length === 0) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full">
      <Eye className="w-3.5 h-3.5" />
      <div className="flex -space-x-1 mr-1">
        {activeUsers.slice(0, 3).map((user) => (
          <div
            key={user.id}
            className="w-2 h-2 rounded-full border border-white"
            style={{ backgroundColor: user.color }}
          />
        ))}
      </div>
      <span className="text-xs">
        {activeUsers.length === 1
          ? `${activeUsers[0].name} is viewing`
          : `${activeUsers.length} people viewing`}
      </span>
    </div>
  );
};
