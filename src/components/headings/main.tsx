import { Skeleton } from '@nextui-org/react';

interface HeadingProps extends ElementProps {
    isLoading?: boolean;
}

export default function Heading({ children, isLoading = false }: HeadingProps) {
    return (
        <div className="px-9 py-3 bg-white rounded-ss-md rounded-es-md">
            {isLoading ? (
                <Skeleton className="max-w-[300px] rounded-lg h-8" isLoaded={false}></Skeleton>
            ) : (
                <h1 className="text-dark-green font-bold text-3xl">{children}</h1>
            )}
        </div>
    );
}
