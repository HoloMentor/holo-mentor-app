import { Textarea as NextTextarea, TextAreaProps as NextTextAreaProps } from '@nextui-org/react';

export interface TextareaProps extends NextTextAreaProps {}

export default function Textarea({
    className,
    labelPlacement = 'outside',
    variant = 'bordered',
    ...props
}: TextareaProps) {
    return (
        <NextTextarea
            className={`block w-full text-md ${className ? className : ''}`}
            classNames={{
                inputWrapper: [
                    'shadow-none border-2 border-[#0000001A] rounded-md',
                    'data-[focus=true]:!border-dark-green',
                    props.type === 'file' ? '!p-0' : ''
                ],
                input: 'focus:outline-none border-transparent focus:border-transparent focus:ring-0 file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500'
            }}
            labelPlacement={labelPlacement}
            variant={variant}
            {...props}
        />
    );
}
