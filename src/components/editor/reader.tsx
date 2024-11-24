import Editor, { BlockNoteEditorProps, EditorProps } from '@/components/editor';
import { BlockNoteEditor } from '@blocknote/core';
import React from 'react';

interface ClassNamesProps {
    mainWrapper?: string;
    innerWrapper?: string;
}

interface ReaderProps extends EditorProps {
    value?: any;
}

export default function Reader({ value, ...props }: ReaderProps) {
    const [initialContent, setInitialContent] = React.useState<
        BlockNoteEditorProps | undefined | 'loading'
    >('loading');

    React.useEffect(() => {
        if (initialContent === 'loading' && value) {
            const editor = BlockNoteEditor.create({
                initialContent: value
            }) as BlockNoteEditorProps;
            setInitialContent(editor);
        }
    }, [value, initialContent]);

    return initialContent === 'loading' ? (
        <p>Loading content...</p>
    ) : (
        <Editor
            editable={false}
            contentEditable={false}
            editor={initialContent}
            className="[&_[aria-haspopup='listbox']]:p-0"
            classNames={{ mainWrapper: 'border-none' }}
            {...props}
        />
    );
}
