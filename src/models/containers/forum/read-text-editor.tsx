import Editor, { EditorProps } from '@/components/editor';
import { PartialBlock } from '@blocknote/core';
import React from 'react';

interface ClassNamesProps {
    mainWrapper?: string;
    innerWrapper?: string;
}

interface FormEditorReadProps extends EditorProps {
    label?: string;
    value: PartialBlock[] | undefined;
    classNames?: ClassNamesProps;
    isRequired?: boolean;
}

export default function FormEditorRead({
    value,
    label,
    classNames,
    isRequired,
    ...props
}: FormEditorReadProps) {
    const [initialContent, setInitialContent] = React.useState<PartialBlock[] | undefined | 'loading'>('loading');

    React.useEffect(() => {
        if (initialContent === 'loading' && value) {
            setInitialContent(value);
        }
    }, [value, initialContent]);

    return (
        <div
            className={`flex flex-col gap-1 h-full ${
                classNames?.mainWrapper ? classNames?.mainWrapper : ''
            }`}
        >
            <div
                className={`flex flex-col gap-2 h-full ${
                    classNames?.innerWrapper ? classNames.innerWrapper : ''
                }`}
            >
                {label && (
                    <span
                        className={`pointer-events-none text-foreground text-sm ${
                            isRequired ? "after:content-['*'] after:ml-0.5 after:text-danger" : ''
                        }`}
                    >
                        {label}
                    </span>
                )}

                {initialContent === 'loading' ? (
                    <p>Loading content...</p>
                ) : (
                    <Editor editable={false} {...props} />
                )}
            </div>
        </div>
    );
}
