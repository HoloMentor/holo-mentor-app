export default function Heading({ children }: ElementProps) {
    return (
        <div className="px-9 py-3 bg-white rounded-ss-md rounded-es-md">
            <h1 className="text-dark-green font-bold text-3xl">{children}</h1>
        </div>
    );
}
