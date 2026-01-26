import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Search, Share2, Bell, ChevronDown, Moon, Sun } from 'lucide-react';
import { VeltPresence } from '@veltdev/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const HeaderBar: React.FC = () => {
  const { currentProject, currentView, currentVeltUser, staticVeltUsers, onSwitchVeltUser, isDarkMode, toggleTheme } = useApp();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  const viewLabels: Record<string, string> = {
    list: 'List View',
    board: 'Board View',
    table: 'Table View',
    document: 'Document View',
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-border dark:border-gray-700">
      {/* Project Header */}
      <div className="px-6 py-4 border-b border-border dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentProject && (
              <>
                <span className="text-2xl">{currentProject.icon}</span>
                <div>
                  <h1 className="text-xl font-semibold dark:text-white">{currentProject.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {viewLabels[currentView]}
                    </Badge>
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
              {/* Velt Presence */}
              <VeltPresence />
              
              {/* User Switcher */}
              <div ref={userDropdownRef} className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <img
                    src={currentVeltUser.photoUrl}
                    alt={currentVeltUser.name}
                    className="w-7 h-7 rounded-full"
                  />
                  <span className="text-sm font-medium dark:text-white">{currentVeltUser.name}</span>
                  <ChevronDown className="w-4 h-4 dark:text-gray-300" />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Switch User</p>
                    </div>
                    {staticVeltUsers.map((user) => (
                      <button
                        key={user.userId}
                        onClick={() => {
                          onSwitchVeltUser(user);
                          setShowUserDropdown(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          user.userId === currentVeltUser.userId ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''
                        }`}
                      >
                        <img
                          src={user.photoUrl}
                          alt={user.name}
                          className="w-9 h-9 rounded-full"
                        />
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                        {user.userId === currentVeltUser.userId && (
                          <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
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
