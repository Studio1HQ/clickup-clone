import React, { useMemo } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { useApp } from '@/contexts/AppContext';

export const DocumentView: React.FC = () => {
  const { currentProject } = useApp();

  const initialContent = useMemo(
    () => [
      {
        type: 'heading',
        content: `${currentProject?.name || 'Project'} Documentation`,
      },
      {
        type: 'paragraph',
        content: 'Welcome to your project documentation. Start writing here...',
      },
      {
        type: 'heading',
        props: {
          level: 2,
        },
        content: 'Project Overview',
      },
      {
        type: 'paragraph',
        content:
          'This is a Notion-style document editor where you can create comprehensive documentation for your project.',
      },
      {
        type: 'heading',
        props: {
          level: 2,
        },
        content: 'Features',
      },
      {
        type: 'bulletListItem',
        content: 'Block-based editing with slash commands',
      },
      {
        type: 'bulletListItem',
        content: 'Drag and drop blocks to reorder',
      },
      {
        type: 'bulletListItem',
        content: 'Rich text formatting (bold, italic, underline)',
      },
      {
        type: 'bulletListItem',
        content: 'Multiple heading levels',
      },
      {
        type: 'bulletListItem',
        content: 'Code blocks for technical documentation',
      },
      {
        type: 'heading',
        props: {
          level: 2,
        },
        content: 'Getting Started',
      },
      {
        type: 'numberedListItem',
        content: 'Type / to see available block types',
      },
      {
        type: 'numberedListItem',
        content: 'Use the formatting toolbar for text styling',
      },
      {
        type: 'numberedListItem',
        content: 'Drag the handle on the left to reorder blocks',
      },
      {
        type: 'paragraph',
        content: '',
      },
      {
        type: 'paragraph',
        content: 'Try typing "/" to see all available block types!',
      },
    ],
    [currentProject]
  );

  const editor = useCreateBlockNote({
    initialContent: initialContent as any,
  });

  return (
    <div className="h-full overflow-auto bg-white">
      <div className="max-w-4xl mx-auto py-8 px-6">
        <BlockNoteView editor={editor} theme="light" />
      </div>
    </div>
  );
};
