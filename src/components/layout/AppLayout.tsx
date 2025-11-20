import React from 'react';
import { Sidebar } from './Sidebar';
import { HeaderBar } from './HeaderBar';
import { useApp } from '@/contexts/AppContext';
import { ListView } from '@/components/views/ListView';
import { BoardView } from '@/components/views/BoardView';
import { TableView } from '@/components/views/TableView';
import { DocumentView } from '@/components/views/DocumentView';

export const AppLayout: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'list':
        return <ListView />;
      case 'board':
        return <BoardView />;
      case 'table':
        return <TableView />;
      case 'document':
        return <DocumentView />;
      default:
        return <ListView />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderBar />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};
