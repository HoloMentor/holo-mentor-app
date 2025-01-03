import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import {
    Block,
    BlockNoteEditor,
    BlockSchema,
    InlineContentSchema,
    StyleSchema
} from '@blocknote/core';
export type BlockNoteBlockProps = Block<BlockSchema, InlineContentSchema, StyleSchema>;

export type BlockNoteEditorProps = BlockNoteEditor<BlockSchema, InlineContentSchema, StyleSchema>;

export type BlockNoteViewEditorProps = React.ComponentProps<typeof BlockNoteView>;

interface EditorOnChangeProps extends Omit<BlockNoteViewEditorProps, 'onChange'> {
    onChange?: (e: BlockNoteBlockProps[]) => void;
}

interface ClassNamesProps {
    mainWrapper?: string;
}

export interface EditorProps extends Omit<EditorOnChangeProps, 'editor'> {
    editor?: BlockNoteEditorProps;
    classNames?: ClassNamesProps;
}

export default function Editor({
    editor = useCreateBlockNote(),
    onChange,
    className,
    classNames,
    ...props
}: EditorProps) {
    const handleOnChange = () => {
        if (onChange) onChange(editor.document);
    };

    return (
        <div
            className={`border border-[#0000001A] rounded-md h-full ${
                classNames?.mainWrapper ? classNames?.mainWrapper : ''
            }`}>
            <BlockNoteView
                data-color-scheme="light"
                editor={editor}
                onChange={handleOnChange}
                className={className}
                {...props}
            />
        </div>
    );
}
