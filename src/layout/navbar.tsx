export default function Navbar() {
    return (
        <div className="flex items-center justify-end w-full h-16 gap-8 px-5 py-2 bg-white rounded-es-lg">
            <div className="relative">
                <div className="block bg-white size-3 rounded-full absolute top-[-2px] right-0 p-[2px]">
                    <div className="block w-full h-full rounded-full bg-orange"></div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-dark-gray">
                    <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            <div className="flex items-center gap-4 cursor-pointer">
                <span className="font-medium">Senura Edmons</span>
                <img
                    src="https://picsum.photos/400"
                    alt="avatar"
                    className="relative inline-block h-10 w-10 !rounded-full  object-cover object-center border-4 border-dark-green"
                />
            </div>
        </div>
    );
}
