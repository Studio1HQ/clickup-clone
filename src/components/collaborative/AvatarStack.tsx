import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';

interface AvatarStackProps {
  users: User[];
  max?: number;
}

export const AvatarStack: React.FC<AvatarStackProps> = ({ users, max = 5 }) => {
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className="flex -space-x-2">
      {displayUsers.map((user) => (
        <div key={user.id} className="relative group">
          <Avatar className="w-8 h-8 border-2 border-white hover:z-10 transition-all cursor-pointer">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {user.status === 'active' && (
            <div
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
              style={{ backgroundColor: user.color }}
            />
          )}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {user.name}
          </div>
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="w-8 h-8 rounded-full bg-muted border-2 border-white flex items-center justify-center text-xs font-medium text-muted-foreground">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
