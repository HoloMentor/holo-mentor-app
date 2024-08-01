'use client';
import React, { useCallback } from 'react';

export interface UploadProps {
    label?: string;
    name?: string;
    value?: string;
    onChange?: (x: React.ChangeEvent<HTMLInputElement>) => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | string;
    className?: string;
    labelClassName?: string;
    accept?: string;
    text?: string;
}

export default function Upload({
    label,
    onChange,
    value,
    name,
    text = 'PNG, JPG Only',
    size = 'sm',
    accept,
    className,
    labelClassName
}: UploadProps) {
    const [initialValue, setInitialValue] = React.useState('loading');
    const dropZoneContainerRef = React.useRef<HTMLDivElement>(null);
    const dropZoneRef = React.useRef<HTMLDivElement>(null);
    const previewRef = React.useRef<HTMLImageElement>(null);

    const _className = React.useMemo(() => {
        let cl = `flex flex-col justify-center items-center w-full max-w-full relative border-2 border-border border-dashed rounded-lg p-2 `;

        if (className) cl += ' ' + className;

        return cl;
    }, [className, size]);

    const getHeight = useCallback(() => {
        switch (size) {
            case 'xl':
                return '24rem';
            case 'lg':
                return '18rem';
            case 'md':
                return '15rem';
            case 'sm':
                return '10rem';

            default:
                return `${size}`;
        }
    }, [size]);

    React.useEffect(() => {
        if (value && initialValue === 'loading' && previewRef?.current) {
            setInitialValue(value);

            previewRef.current.classList.remove('hidden');
            if (dropZoneRef.current) dropZoneRef.current?.classList.add('hidden');
        }
    }, [value, previewRef, dropZoneRef, initialValue]);

    React.useEffect(() => {
        if (dropZoneContainerRef?.current) {
            dropZoneContainerRef.current?.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZoneContainerRef.current?.classList.add('border-pink');
            });

            dropZoneContainerRef.current?.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZoneContainerRef.current?.classList.remove('border-pink');
            });

            dropZoneContainerRef.current?.addEventListener('drop', (e: DragEvent) => {
                e.preventDefault();

                dropZoneContainerRef.current?.classList.remove('border-pink');
                var file = e?.dataTransfer?.files[0];

                displayPreview(file);
            });
        }
    }, [dropZoneContainerRef, dropZoneRef, previewRef]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        var file = e?.target?.files?.[0];

        if (file) {
            displayPreview(file);
        }
        if (onChange) onChange(e);
    };

    const displayPreview = (file: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            if (previewRef?.current) {
                previewRef.current.src = reader.result as string;
                previewRef.current.classList.remove('hidden');

                if (dropZoneRef.current) dropZoneRef.current?.classList.add('hidden');
            }
        };
    };

    return (
        <label className={`flex flex-col gap-2 ` + labelClassName}>
            {label && <span className="text-dark-gray font-normal">{label}</span>}

            <div
                ref={dropZoneContainerRef}
                style={{ minHeight: getHeight() }}
                className={_className}>
                <input
                    hidden
                    value={''}
                    name={name}
                    accept={accept}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 z-50"
                    onChange={onInputChange}
                />
                <div
                    ref={dropZoneRef}
                    style={{ display: value ? 'none' : 'flex' }}
                    className="flex flex-col gap-3 justify-center items-center text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-10 text-light-gray">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                    </svg>

                    <h3 className="text-sm font-medium text-gray-900 relative cursor-pointer">
                        <span>Drag and drop</span>
                        <span className="text-pink"> or browse </span>
                        <span>to upload</span>
                    </h3>
                    <p className="text-xs text-gray-500">{text}</p>
                </div>

                <img
                    src={value}
                    style={{ display: value ? 'block' : 'none' }}
                    className="mx-auto max-h-64 hidden"
                    ref={previewRef}
                />
            </div>
        </label>
    );
}
