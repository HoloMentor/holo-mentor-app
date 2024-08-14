import { Avatar } from '@nextui-org/react';

export function renderInstituteName({ data }: CustomTableCellData) {
    return (
        <div className="flex flex-raw">
            <Avatar
                showFallback
                fallback={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-default-500 size-6">
                        <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                }
                src={data?.logo}
                alt="avatar"
                isBordered
                className="relative size-8 !rounded-full object-cover object-center"
            />
            <span className="text-left ml-5 mt-2">{data?.name}</span>
        </div>
    );
}
