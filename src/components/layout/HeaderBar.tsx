import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Search, Share2, Bell, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AvatarStack } from '@/components/collaborative/AvatarStack';
import { PresenceIndicator } from '@/components/collaborative/PresenceIndicator';
import { Badge } from '@/components/ui/badge';

export const HeaderBar: React.FC = () => {
  const { currentProject, activeUsers, currentView } = useApp();

  const viewLabels: Record<string, string> = {
    list: 'List View',
    board: 'Board View',
    table: 'Table View',
    document: 'Document View',
  };

  return (
    <div className="bg-white border-b border-border">
      {/* Project Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentProject && (
              <>
                <span className="text-2xl">{currentProject.icon}</span>
                <div>
                  <h1 className="text-xl font-semibold">{currentProject.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {viewLabels[currentView]}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {activeUsers.filter(u => u.status === 'active').length} active
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tasks..."
                className="pl-9 w-64"
              />
            </div>

            {/* Collaborative UI */}
            <div className="flex items-center gap-3 border-l border-border pl-3">
              <PresenceIndicator users={activeUsers} />
              <AvatarStack users={activeUsers} max={5} />
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="default" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
