import { snakeCaseToTitleCase } from '@/utils';
import { Avatar } from '@nextui-org/react';

interface ProfileInfoCardProps {
    user: {
        firstName: string;
        lastName: string;
        image: string;
    };
    role: string;
}

export default function ProfileInfoCardId({ user, role }: ProfileInfoCardProps) {
    return (
        <div className="relative px-4 py-6 mb-4 bg-white rounded-lg">
            <div>
                <Avatar src={user.image} alt="Avatar" className="w-24 h-24 mb-4 rounded-full" />
                <h1 className="text-2xl font-semibold">
                    {user.firstName} {user.lastName}
                </h1>
                <span className="text-sm text-neutral-500 capitalize">
                    {snakeCaseToTitleCase(role)}
                </span>
            </div>
        </div>
    );
}
