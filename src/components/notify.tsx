import { IRootState } from '@/redux';
import { notifyActions } from '@/redux/reducers/notify.reducer';
import { useDispatch, useSelector } from 'react-redux';

//success
//error
//warning
//info

export function NotifyIcon({ type }: { type: string }) {
    switch (type) {
        case 'success':
            return (
                <span className="text-green-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </span>
            );
        case 'info':
            return (
                <span className="text-blue-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                        />
                    </svg>
                </span>
            );
        case 'warning':
            <span className="text-orange-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                </svg>
            </span>;
            break;

        default:
            return (
                <span className="text-red-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </span>
            );
    }
}

export default function NotifyContainer() {
    const offset = 25;

    const { notifyTypes, notifyProps } = useSelector((state: IRootState) => state.notify);
    const dispatch = useDispatch();

    const onClose = (id: any) => {
        dispatch(notifyActions.close(id));
    };

    const capitalizeTxt = (txt: string) => {
        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(); //or if you want lowercase the rest txt.slice(1).toLowerCase();
    };

    return notifyTypes.map((id: string, idx: number) => {
        const props: any = notifyProps[id];

        const options: any = {
            title: 'Error',
            type: 'error',
            message: ''
        };

        if (props?.type) options.type = props.type;
        if (props?.message && props.format) options.message = capitalizeTxt(props.message);

        switch (options.type) {
            case 'success':
                options.title = 'Success';
                break;
            case 'info':
                options.title = 'Info';
                break;
            case 'warning':
                options.title = 'Warning';
                break;

            default:
                options.title = 'Error';
                break;
        }

        /* auto hide after 8s */
        setTimeout(() => {
            onClose(id);
        }, 8000);

        return (
            <div
                key={`notify-${id}`}
                role="alert"
                style={{ top: `${idx * 95 + offset}px` }}
                className={`fixed z-[9999] rounded-xl border border-gray-100 bg-white p-4 right-7`}>
                <div className="flex items-start gap-4">
                    <NotifyIcon type={options.type} />

                    <div className="flex-1">
                        <strong className="block font-medium text-gray-900">{options.title}</strong>

                        <p className="mt-1 text-sm text-gray-700">{options.message}</p>
                    </div>

                    <button
                        onClick={() => onClose(id)}
                        className="text-gray-500 transition hover:text-gray-600">
                        <span className="sr-only">Dismiss popup</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        );
    });
}
