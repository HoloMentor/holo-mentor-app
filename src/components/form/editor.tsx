import Editor, { BlockNoteBlockProps, EditorProps } from '@/components/editor';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import React from 'react';

interface FormEditorProps extends EditorProps {
    label?: string;
    name: string;
}

export default function FormEditor({ name, label, onChange, ...props }: FormEditorProps) {
    const [field] = useField(name);
    const [initialContent, setInitialContent] = React.useState<
        PartialBlock[] | undefined | 'loading'
    >('loading');
    const { setFieldValue } = useFormikContext();

    const handleChange = (jsonBlocks: BlockNoteBlockProps[]) => {
        setFieldValue(name, jsonBlocks);
        if (onChange) onChange(jsonBlocks);
    };

    React.useEffect(() => {
        if (initialContent === 'loading') {
            if (field.value) {
                setInitialContent(field.value);
            }
        }
    }, [field]);

    const editor: any = React.useMemo(() => {
        if (initialContent === 'loading') {
            return undefined;
        }

        return BlockNoteEditor.create({ initialContent });
    }, [initialContent]);

    return (
        <div className="flex flex-col gap-1 h-full">
            <div className="flex flex-col gap-2 h-full">
                {label && <span className="text-dark-gray font-normal">{label}</span>}
                <Editor editor={editor} onChange={handleChange} {...props} />
            </div>
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
