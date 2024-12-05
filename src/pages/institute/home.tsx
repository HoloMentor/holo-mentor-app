import InfoCard from '@/components/cards/info';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Button from '@/components/button.tsx';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer.ts';
import { useDispatch } from 'react-redux';
import announcementServices from '@/redux/services/announcement.service';
import { useSelector } from 'react-redux';
import { IRootState } from '@/redux';
import teacherServices from '@/redux/services/teacher.service';
import classServices from '@/redux/services/class/class.service';
import useErrorHandler from '@/hooks/error-handler.tsx';

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(120, 120, 120)';
Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.plugins.legend.title.display = true;

const data = {
    labels: ['Donall Samart', 'Irwin Havvock', 'Bear Kestin'],
    datasets: [
        {
            data: [400, 300, 250],
            backgroundColor: ['rgb(25, 69, 69)', 'rgb(0, 164, 124)', 'rgb(45, 143, 143)'],
            borderWidth: 2,
            radius: '60%'
        }
    ]
};

function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);

    const announcements = announcementServices.useGetQuery(
        {
            id: user.instituteId
        },
        {
            skip: !user.instituteId
        }
    );

    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const {
        data: instituteTeachers,
        isError: isTeacherError,
        error: teacherError
    } = teacherServices.useGetInstituteTeachersQuery(
        {
            instituteId: user.instituteId,
            search: searchParams.get('search') || '',
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !user.instituteId
        }
    );
    useErrorHandler(isTeacherError, teacherError);

    const teacherCount = instituteTeachers?.data?.data?.length || 0;

    const {
        data: instituteClasses,
        isError: isClassesError,
        error: classesError
    } = classServices.useGetInstituteClassesQuery(
        {
            instituteId: user.instituteId,
            search: searchParams.get('search') || '',
            page: searchParams.get('search') ? 1 : searchParams.get('page') || 1
        },
        {
            skip: !user.instituteId
        }
    );
    useErrorHandler(isClassesError, classesError);
    const classCount = instituteClasses?.data?.data?.length || 0;

    return (
        <div className="flex flex-col w-full bg-gray-100">
            <div className="flex flex-col items-center w-full">
                <img
                    src="/images/banner.png"
                    alt="Banner"
                    className="flex flex-auto w-full h-full"
                />
                <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-5 px-5 py-4 h-full w-full">
                    <InfoCard number={teacherCount} label="Teachers">
                        <svg
                            width="43"
                            height="49"
                            viewBox="0 0 43 49"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_13_8598)">
                                <path
                                    d="M9.5 12.5C9.5 15.6826 10.7643 18.7348 13.0147 20.9853C15.2652 23.2357 18.3174 24.5 21.5 24.5C24.6826 24.5 27.7348 23.2357 29.9853 20.9853C32.2357 18.7348 33.5 15.6826 33.5 12.5C33.5 9.3174 32.2357 6.26516 29.9853 4.01472C27.7348 1.76428 24.6826 0.5 21.5 0.5C18.3174 0.5 15.2652 1.76428 13.0147 4.01472C10.7643 6.26516 9.5 9.3174 9.5 12.5ZM18.3594 31.2688L20.1031 34.175L16.9813 45.7906L13.6063 32.0188C13.4188 31.2594 12.6875 30.7625 11.9281 30.9594C5.36563 32.6 0.5 38.5438 0.5 45.6219C0.5 47.2156 1.79375 48.5 3.37813 48.5H39.6219C41.2156 48.5 42.5 47.2063 42.5 45.6219C42.5 38.5438 37.6344 32.6 31.0719 30.9594C30.3125 30.7719 29.5813 31.2688 29.3938 32.0188L26.0188 45.7906L22.8969 34.175L24.6406 31.2688C25.2406 30.2656 24.5188 29 23.3563 29H19.6531C18.4906 29 17.7688 30.275 18.3688 31.2688H18.3594Z"
                                    fill="#023430"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_13_8598">
                                    <rect
                                        width="42"
                                        height="48"
                                        fill="white"
                                        transform="translate(0.5 0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </InfoCard>

                    <InfoCard number={classCount} label="Classes">
                        <svg
                            width="63"
                            height="51"
                            viewBox="0 0 63 51"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_13_8581)">
                                <path
                                    d="M20.6502 34.6C20.4186 34.6 20.1871 34.6339 19.9662 34.7056C18.7107 35.1134 17.3903 35.375 16.0002 35.375C14.61 35.375 13.2896 35.1134 12.0331 34.7056C11.8123 34.6339 11.5817 34.6 11.3502 34.6C5.33809 34.6 0.468188 39.4902 0.500156 45.5101C0.513719 48.054 2.60525 50.1 5.15016 50.1H26.8502C29.3951 50.1 31.4866 48.054 31.5002 45.5101C31.5321 39.4902 26.6622 34.6 20.6502 34.6ZM16.0002 31.5C21.1365 31.5 25.3002 27.3363 25.3002 22.2C25.3002 17.0637 21.1365 12.9 16.0002 12.9C10.8638 12.9 6.70016 17.0637 6.70016 22.2C6.70016 27.3363 10.8638 31.5 16.0002 31.5ZM57.8502 0.5H20.6502C18.0859 0.5 16.0002 2.65547 16.0002 5.30403V9.8C18.269 9.8 20.3692 10.4568 22.2002 11.5244V6.7H56.3002V34.6H50.1002V28.4H37.7002V34.6H30.3144C32.1647 36.2168 33.5229 38.352 34.1594 40.8H57.8502C60.4144 40.8 62.5002 38.6445 62.5002 35.996V5.30403C62.5002 2.65547 60.4144 0.5 57.8502 0.5Z"
                                    fill="#023430"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_13_8581">
                                    <rect
                                        width="62"
                                        height="49.6"
                                        fill="white"
                                        transform="translate(0.5 0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </InfoCard>

                    <InfoCard number={3} label="Students">
                        <svg
                            width="51"
                            height="51"
                            viewBox="0 0 51 51"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M33.3124 13C33.3124 15.072 32.4893 17.0592 31.0242 18.5243C29.559 19.9894 27.5719 20.8125 25.4999 20.8125C23.4279 20.8125 21.4407 19.9894 19.9756 18.5243C18.5105 17.0592 17.6874 15.072 17.6874 13C17.6874 10.928 18.5105 8.94086 19.9756 7.47573C21.4407 6.0106 23.4279 5.1875 25.4999 5.1875C27.5719 5.1875 29.559 6.0106 31.0242 7.47573C32.4893 8.94086 33.3124 10.928 33.3124 13ZM9.87695 42.4125C9.9439 38.3133 11.6193 34.4045 14.5419 31.5293C17.4645 28.654 21.4001 27.0427 25.4999 27.0427C29.5997 27.0427 33.5353 28.654 36.4579 31.5293C39.3804 34.4045 41.0559 38.3133 41.1228 42.4125C36.2215 44.66 30.8919 45.8198 25.4999 45.8125C19.9249 45.8125 14.6332 44.5959 9.87695 42.4125Z"
                                fill="#023430"
                                stroke="#023430"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </InfoCard>

                    <InfoCard number={5} label="Staff">
                        <svg
                            width="51"
                            height="50"
                            viewBox="0 0 51 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M32.2482 40.35C34.0252 40.8659 35.8665 41.1269 37.7169 41.125C40.6928 41.1293 43.6299 40.4508 46.3023 39.1417C46.3814 37.2744 45.8495 35.4322 44.7873 33.8944C43.7252 32.3566 42.1906 31.207 40.4163 30.6198C38.642 30.0326 36.7246 30.0398 34.9548 30.6404C33.1849 31.241 31.6591 32.4021 30.6086 33.9479M32.2482 40.35V40.3437C32.2482 38.025 31.6523 35.8437 30.6086 33.9479M32.2482 40.35V40.5708C28.2388 42.9856 23.6453 44.2579 18.9648 44.25C14.1086 44.25 9.56485 42.9062 5.68568 40.5708L5.6836 40.3437C5.682 37.3947 6.66196 34.529 8.46898 32.1985C10.276 29.8679 12.8073 28.2051 15.6638 27.4721C18.5203 26.7391 21.5395 26.9777 24.2454 28.1502C26.9513 29.3227 29.19 31.3625 30.6086 33.9479M25.9982 13.7812C25.9982 15.6461 25.2574 17.4345 23.9388 18.7531C22.6202 20.0717 20.8317 20.8125 18.9669 20.8125C17.1021 20.8125 15.3137 20.0717 13.9951 18.7531C12.6765 17.4345 11.9357 15.6461 11.9357 13.7812C11.9357 11.9164 12.6765 10.128 13.9951 8.80941C15.3137 7.49079 17.1021 6.75 18.9669 6.75C20.8317 6.75 22.6202 7.49079 23.9388 8.80941C25.2574 10.128 25.9982 11.9164 25.9982 13.7812ZM43.1857 18.4687C43.1857 19.9192 42.6095 21.3101 41.5839 22.3357C40.5583 23.3613 39.1673 23.9375 37.7169 23.9375C36.2665 23.9375 34.8755 23.3613 33.8499 22.3357C32.8243 21.3101 32.2482 19.9192 32.2482 18.4687C32.2482 17.0183 32.8243 15.6273 33.8499 14.6018C34.8755 13.5762 36.2665 13 37.7169 13C39.1673 13 40.5583 13.5762 41.5839 14.6018C42.6095 15.6273 43.1857 17.0183 43.1857 18.4687Z"
                                fill="#023430"
                            />
                            <path
                                d="M32.2482 40.35C34.0252 40.8659 35.8665 41.1269 37.7169 41.125C40.6928 41.1293 43.6299 40.4508 46.3023 39.1417C46.3814 37.2744 45.8495 35.4322 44.7873 33.8944C43.7252 32.3566 42.1906 31.207 40.4163 30.6198C38.642 30.0326 36.7246 30.0398 34.9548 30.6404C33.1849 31.241 31.6591 32.4021 30.6086 33.9479M32.2482 40.35V40.3437C32.2482 38.025 31.6523 35.8437 30.6086 33.9479M32.2482 40.35V40.5708C28.2388 42.9856 23.6453 44.2579 18.9648 44.25C14.1086 44.25 9.56485 42.9062 5.68568 40.5708L5.6836 40.3437C5.682 37.3947 6.66196 34.529 8.46898 32.1985C10.276 29.8679 12.8073 28.2051 15.6638 27.4721C18.5203 26.7391 21.5395 26.9777 24.2454 28.1502C26.9513 29.3227 29.19 31.3625 30.6086 33.9479M25.9982 13.7812C25.9982 15.6461 25.2574 17.4345 23.9388 18.7531C22.6202 20.0717 20.8317 20.8125 18.9669 20.8125C17.1021 20.8125 15.3137 20.0717 13.9951 18.7531C12.6765 17.4345 11.9357 15.6461 11.9357 13.7812C11.9357 11.9164 12.6765 10.128 13.9951 8.80941C15.3137 7.49079 17.1021 6.75 18.9669 6.75C20.8317 6.75 22.6202 7.49079 23.9388 8.80941C25.2574 10.128 25.9982 11.9164 25.9982 13.7812ZM43.1857 18.4687C43.1857 19.9192 42.6095 21.3101 41.5839 22.3357C40.5583 23.3613 39.1673 23.9375 37.7169 23.9375C36.2665 23.9375 34.8755 23.3613 33.8499 22.3357C32.8243 21.3101 32.2482 19.9192 32.2482 18.4687C32.2482 17.0183 32.8243 15.6273 33.8499 14.6018C34.8755 13.5762 36.2665 13 37.7169 13C39.1673 13 40.5583 13.5762 41.5839 14.6018C42.6095 15.6273 43.1857 17.0183 43.1857 18.4687Z"
                                stroke="#023430"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </InfoCard>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-3 ">
                <section className="w-full bg-white rounded-lg p-4 h-fit col-span-3">
                    <h1 className="pl-4 text-3xl font-semibold text-dark-green mb-7 flex flex-row justify-between">
                        <span>Announcement</span>
                        <Button
                            onClick={() =>
                                dispatch(
                                    modelActions.show({
                                        name: modelNames.ADD_ANNOUNCEMENT
                                    })
                                )
                            }
                            endContent={
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6">
                                        <path
                                            fillRule="evenodd"
                                            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            }>
                            Add New
                        </Button>
                    </h1>

                    <div className="flex flex-col gap-3">
                        {announcements.data?.data.map(
                            (announcement: { title: string; announcement: string }) => (
                                <div className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col justify-start">
                                            <h1 className="text-lg font-semibold text-black">
                                                {announcement.title}
                                            </h1>
                                        </div>
                                        <p className="text-base text-neutral-500">
                                            {announcement.announcement}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
