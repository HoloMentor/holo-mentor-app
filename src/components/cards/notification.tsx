import React from 'react';

interface NotificationCardProps {
    mainTopic: string;
    issuedBy: string;
    notificationBody: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationCardProps> = ({
    mainTopic,
    issuedBy,
    notificationBody,
    onClose
}) => {
    return (
        <div className="relative bg-white rounded-lg flex flex-row gap-8 w-full h-fit items-center justify-start shadow-md sm:w-full p-2 border-l-4 border-[#489F2D]">
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={onClose}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18 8.10786L16.8921 7L12.5 11.3921L8.10786 7L7 8.10786L11.3921 12.5L7 16.8921L8.10786 18L12.5 13.6079L16.8921 18L18 16.8921L13.6079 12.5L18 8.10786Z"
                        fill="#6A6A6A"
                    />
                </svg>
            </button>
            <div className="flex gap-3 p-4 rounded-lg ">
                <img src="/images/User.svg" alt="User" className="rounded-full size-11" />
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-start">
                        <h1 className="text-lg font-semibold text-black">{mainTopic}</h1>
                        <p className="text-base font-medium text-neutral-500">{issuedBy}</p>
                    </div>
                    <p>{notificationBody}</p>
                </div>
            </div>
        </div>
    );
};

export default Notification;
