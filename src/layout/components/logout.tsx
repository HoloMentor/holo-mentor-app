import { userActions } from '@/redux/reducers/user.reducer';
import { useDispatch } from 'react-redux';

export default function LogoutComponent() {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(userActions.remove());
    };

    return (
        <button
            onClick={onClick}
            className="flex gap-3 !text-black font-medium transition-all duration-75 hover:!text-dark-green group">
            <div className="flex gap-3 transition-all duration-1000 py-4 pl-6 pr-4 group-[.is-active]:pl-0 max-md:pl-0 max-md:pr-0 max-md:justify-center w-full">
                <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.1971 3.49182C16.499 3.49182 20.7971 7.78989 20.7971 13.0918C20.7971 18.3938 16.499 22.6918 11.1971 22.6918M8.79703 16.9318L4.95703 13.0918M4.95703 13.0918L8.79703 9.25182M4.95703 13.0918H16.957"
                        stroke="#2B2E48"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <span className="max-md:hidden">Logout</span>
            </div>
        </button>
    );
}
