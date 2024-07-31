export default function Content({ children, className, ...props }: DivElementProps) {
    return (
        <div
            className={`bg-white px-9 py-10 rounded-ss-md rounded-es-md flex flex-col gap-6 ${
                className ? className : ''
            }`}
            {...props}>
            {children}
        </div>
    );
}
