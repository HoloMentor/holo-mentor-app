'use client';
import React, { useCallback } from 'react';

export interface UploadProps {
    label?: string;
    name?: string;
    value?: File;
    onChange?: (file: File) => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | string;
    className?: string;
    labelClassName?: string;
    accept?: string;
    text?: string;
    preview?: 'image' | 'name';
}

export default function Upload({
    label,
    onChange,
    value,
    name,
    preview = 'image',
    text = 'PNG, JPG Only',
    size = 'sm',
    accept,
    className,
    labelClassName
}: UploadProps) {
    const [initialValue, setInitialValue] = React.useState(null);
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
        if (value && initialValue === null && previewRef?.current) {
            setInitialValue(value);

            previewRef.current.classList.remove('hidden');
            if (dropZoneRef.current) dropZoneRef.current?.classList.add('hidden');
        }
    }, [value, previewRef, dropZoneRef, initialValue]);

    React.useEffect(() => {
        if (dropZoneContainerRef?.current) {
            dropZoneContainerRef.current?.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZoneContainerRef.current?.classList.add('border-success');
            });

            dropZoneContainerRef.current?.addEventListener('dragleave', (e) => {
                e.preventDefault();
                dropZoneContainerRef.current?.classList.remove('border-success');
            });

            dropZoneContainerRef.current?.addEventListener('drop', (e: DragEvent) => {
                e.preventDefault();

                dropZoneContainerRef.current?.classList.remove('border-success');
                var file = e?.dataTransfer?.files[0];

                displayPreview(file);

                if (onChange) onChange(file);
            });
        }
    }, [dropZoneContainerRef, dropZoneRef, previewRef, onChange]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        var file = e?.target?.files?.[0];

        if (file) {
            displayPreview(file);
        }
        if (onChange) onChange(file);
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
                        className="size-16 text-gray-400">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                    </svg>

                    <h3 className="text-sm font-medium text-gray-900 relative cursor-pointer">
                        <span>Drag and drop or</span>
                        <span className="text-blue-500"> browse </span>
                        <span>to upload</span>
                    </h3>
                    <p className="text-xs text-gray-500">{text}</p>
                </div>

                {value?.name ? (
                    preview === 'image' ? (
                        <img
                            src={value?.name}
                            style={{ display: value ? 'block' : 'none' }}
                            className="mx-auto max-h-64 hidden"
                            ref={previewRef}
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-16 text-success">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                                />
                            </svg>

                            <p>{value?.name}</p>
                        </div>
                    )
                ) : null}
            </div>
        </label>
    );
}
