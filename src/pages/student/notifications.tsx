import Notification from '@/components/cards/notification';
import Heading from '@/components/headings/main';
import { useState } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            mainTopic: 'Main Topic 1',
            issuedBy: 'Issued By 1',
            notificationBody:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentium aliquam dolore velit.'
        },
        {
            id: 2,
            mainTopic: 'Main Topic 2',
            issuedBy: 'Issued By 2',
            notificationBody:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentium aliquam dolore velit.'
        },
        {
            id: 3,
            mainTopic: 'Main Topic 3',
            issuedBy: 'Issued By 3',
            notificationBody:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentium aliquam dolore velit.'
        },
        {
            id: 4,
            mainTopic: 'Main Topic 4',
            issuedBy: 'Issued By 4',
            notificationBody:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentium aliquam dolore velit.'
        },
        {
            id: 5,
            mainTopic: 'Main Topic 5',
            issuedBy: 'Issued By 5',
            notificationBody:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentium aliquam dolore velit.'
        }
    ]);

    const handleClose = (id: number) => {
        setNotifications(notifications.filter((notification) => notification.id !== id));
    };

    return (
        <>
            <Heading>Notifications</Heading>
            <section className="p-4 flex flex-col gap-4">
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        mainTopic={notification.mainTopic}
                        issuedBy={notification.issuedBy}
                        notificationBody={notification.notificationBody}
                        onClose={() => handleClose(notification.id)}
                    />
                ))}
            </section>
        </>
    );
};

export default Notifications;
