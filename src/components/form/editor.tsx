import Editor, { BlockNoteBlockProps, EditorProps } from '@/components/editor';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import React from 'react';

interface ClassNamesProps {
    mainWrapper?: string;
    innerWrapper?: string;
}

interface FormEditorProps extends EditorProps {
    label?: string;
    name: string;
    classNames?: ClassNamesProps;
}

export default function FormEditor({
    name,
    label,
    onChange,
    classNames,
    ...props
}: FormEditorProps) {
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
    }, []);

    const editor: any = React.useMemo(() => {
        if (initialContent === 'loading') {
            return undefined;
        }

        return BlockNoteEditor.create({ initialContent });
    }, [initialContent]);

    return (
        <div
            className={`flex flex-col gap-1 h-full ${
                classNames?.mainWrapper ? classNames?.mainWrapper : ''
            }`}>
            <div
                className={`flex flex-col gap-2 h-full ${
                    classNames?.innerWrapper ? classNames.innerWrapper : ''
                }`}>
                {label && (
                    <span className="pointer-events-none text-foreground text-sm">{label}</span>
                )}
                <Editor editor={editor} onChange={handleChange} {...props} />
            </div>
            <ErrorMessage className="text-xs text-red-500" name={name} component="p" />
        </div>
    );
}
