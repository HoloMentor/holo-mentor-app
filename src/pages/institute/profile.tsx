import ProfileInfoCard from '@/components/cards/profile';
import ProfileDetailsCard from '@/components/cards/profile-details';
import Heading from '@/components/headings/main';

export default function Profile() {
    return (
        <div className="flex flex-col gap-3">
            <Heading>Profile</Heading>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-lg:gap-0">
                <section className="w-full h-fit col-span-1">
                    <ProfileInfoCard />
                    <ProfileDetailsCard />
                </section>
            </div>
        </div>
    );
}
