export default function Content({ children, className, ...props }: DivElementProps) {
    return (
        <div
            className={`bg-white px-9 py-5 rounded-ss-md rounded-es-md ${
                className ? className : ''
            }`}
            {...props}>
            {children}
        </div>
    );
}
