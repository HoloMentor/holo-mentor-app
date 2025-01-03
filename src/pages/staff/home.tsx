import InfoCard from '@/components/cards/info';
import DoughnuChart from '@/components/charts/doughnut';
import useErrorHandler from '@/hooks/error-handler';
import { IRootState } from '@/redux';
import announcementServices from '@/redux/services/announcement.service';
import { useGetQuizCountQuery } from '@/redux/services/quiz.service';
import {
    useGetTeacherStaffCountQuery,
    useGetTeacherStaffQuery
} from '@/redux/services/staff.service';
import teacherServices from '@/redux/services/teacher.service';
import { useSelector } from 'react-redux';

function Home() {
    const { user } = useSelector((state: IRootState) => state.user);

    const instituteId = user.instituteId;
    const staffId = user?.userId?.toString();

    // Fetch staff data to derive userId
    const { data: staffData } = useGetTeacherStaffQuery({ userId: staffId, instituteId });
    const userId = staffData?.data?.staffTeacher?.[0]?.userId;

    console.log('User Id:', userId);

    // Skip dependent queries until userId is available
    const shouldSkipUserDependentQueries = !userId;

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

    const {
        data: teacherStats,
        isError: isTeacherStatsError,
        error: teacherStatsError,
        isLoading: isTeacherStatsLoading
    } = teacherServices.useGetTeacherStatsQuery(
        {
            id: userId
        },
        {
            skip: shouldSkipUserDependentQueries
        }
    );

    useErrorHandler(isTeacherStatsError, teacherStatsError);

    const {
        data: QuizStats,
        isError: isQuizStatsError,
        error: QuizStatsError,
        isLoading: isQuizStatsLoading
    } = useGetQuizCountQuery(
        { userId, instituteId },
        {
            skip: shouldSkipUserDependentQueries
        }
    );

    useErrorHandler(isQuizStatsError, QuizStatsError);

    const {
        data: StaffStats,
        isError: isStaffStatsError,
        error: StaffStatsError,
        isLoading: isStaffStatsLoading
    } = useGetTeacherStaffCountQuery(
        { userId, instituteId },
        {
            skip: shouldSkipUserDependentQueries
        }
    );

    useErrorHandler(isStaffStatsError, StaffStatsError);

    return (
        <div className="flex flex-col w-full bg-gray-100">
            <div className="flex flex-col items-center w-full">
                <img
                    src="/images/banner.png"
                    alt="Banner"
                    className="flex flex-auto w-full h-full"
                />
            </div>
            <div className="grid w-full h-full grid-cols-4 gap-5 px-5 py-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
                <InfoCard
                    isLoading={isTeacherStatsLoading}
                    number={teacherStats?.data?.studentCount}
                    label="Students">
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
                <InfoCard isLoading={isStaffStatsLoading} number={StaffStats?.data} label="Staff">
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
                <InfoCard isLoading={isQuizStatsLoading} number={QuizStats?.data} label="MCQ">
                    <svg
                        width="51"
                        height="51"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_13149)">
                            <path
                                d="M18.4113 41.7048C21.3545 44.0855 25.027 45.3813 28.8125 45.3751C31.3101 45.3751 33.6819 44.8219 35.8118 43.8282L43.3941 45.342C43.6613 45.3952 43.9375 45.3816 44.1982 45.3026C44.4589 45.2235 44.696 45.0814 44.8886 44.8887C45.0813 44.6961 45.2234 44.459 45.3025 44.1983C45.3815 43.9376 45.3951 43.6614 45.3419 43.3942L43.8281 35.8152C44.8218 33.6853 45.375 31.3102 45.375 28.8126C45.3805 25.0282 44.0846 21.357 41.7048 18.4147C42.179 20.8668 42.1869 23.3863 41.7279 25.8413C42.4265 28.8764 42.0336 32.0605 40.6183 34.8347C40.4481 35.1676 40.3956 35.5481 40.4692 35.9146L41.6087 41.6088L35.9112 40.4693C35.5458 40.3965 35.1665 40.449 34.8346 40.6184C32.0594 42.0345 28.874 42.4274 25.8379 41.728C23.3829 42.187 20.8633 42.1791 18.4113 41.7048ZM5.625 22.1876C5.62635 18.6036 6.79024 15.1167 8.94191 12.2505C11.0936 9.38421 14.117 7.29325 17.5581 6.29148C20.9993 5.28972 24.6726 5.43121 28.0265 6.69472C31.3804 7.95823 34.2339 10.2756 36.1587 13.2989C38.0836 16.3221 38.9758 19.8882 38.7014 23.4617C38.427 27.0352 37.0009 30.4233 34.6372 33.1173C32.2734 35.8113 29.0996 37.6659 25.5921 38.4026C22.0846 39.1394 18.4328 38.7185 15.1849 37.2032L7.60588 38.717C7.3387 38.7702 7.06254 38.7566 6.80184 38.6776C6.54115 38.5985 6.30398 38.4564 6.11136 38.2637C5.91873 38.0711 5.77659 37.834 5.69753 37.5733C5.61847 37.3126 5.60494 37.0364 5.65813 36.7692L7.17194 29.1869C6.15154 26.9947 5.62353 24.6057 5.625 22.1876ZM22.1875 28.4151C21.6384 28.4151 21.1118 28.6332 20.7236 29.0215C20.3353 29.4097 20.1172 29.9363 20.1172 30.4854C20.1172 31.0345 20.3353 31.5611 20.7236 31.9493C21.1118 32.3376 21.6384 32.5557 22.1875 32.5557C22.7366 32.5557 23.2632 32.3376 23.6514 31.9493C24.0397 31.5611 24.2578 31.0345 24.2578 30.4854C24.2578 29.9363 24.0397 29.4097 23.6514 29.0215C23.2632 28.6332 22.7366 28.4151 22.1875 28.4151ZM22.1875 12.26C18.716 12.26 16.013 14.9697 16.0494 18.736C16.0538 19.1752 16.2325 19.5948 16.5463 19.9023C16.86 20.2098 17.283 20.3801 17.7223 20.3757C18.1615 20.3713 18.581 20.1926 18.8885 19.8789C19.196 19.5651 19.3663 19.1421 19.3619 18.7029C19.3421 16.7849 20.5544 15.5725 22.1875 15.5725C23.751 15.5725 25.0131 16.871 25.0131 18.7194C25.0131 19.3885 24.7812 19.7629 23.8206 20.5214L22.903 21.2336C21.2269 22.5719 20.5313 23.6087 20.5313 25.5001C20.5305 25.914 20.6847 26.3132 20.9636 26.619C21.2424 26.9249 21.6257 27.1152 22.0378 27.1526C22.45 27.19 22.8613 27.0717 23.1906 26.8211C23.52 26.5704 23.7435 26.2055 23.8173 25.7982L23.8537 25.2815C23.91 24.7912 24.1849 24.4401 24.9998 23.7975L25.9174 23.0853C27.6167 21.7272 28.3256 20.6605 28.3256 18.7194C28.3256 15.0624 25.6027 12.26 22.1875 12.26Z"
                                fill="#023430"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_13149">
                                <rect
                                    width="50"
                                    height="50"
                                    fill="white"
                                    transform="translate(0.5 0.5)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </InfoCard>
                <InfoCard
                    isLoading={isTeacherStatsLoading}
                    number={teacherStats?.data?.classCount}
                    label="Classes">
                    <svg
                        width="51"
                        height="51"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_141_12903)">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11.5565 2.56067L32.6636 2.54996V10.775L11.5565 10.7857C10.6031 10.7868 9.67448 10.4826 8.90647 9.91782L5.48504 7.39281C5.37279 7.30979 5.28157 7.2016 5.21871 7.07693C5.15585 6.95226 5.12311 6.81458 5.12311 6.67496C5.12311 6.53534 5.15585 6.39766 5.21871 6.27299C5.28157 6.14832 5.37279 6.04012 5.48504 5.9571L8.91004 3.42853C9.67565 2.86389 10.6016 2.55857 11.5529 2.5571L11.5565 2.56067ZM41.3529 10.7678L37.1279 10.7714V2.54639H41.3672C43.6315 2.5821 45.3636 4.59282 45.3636 6.65353C45.3636 8.71782 43.6315 10.7321 41.3672 10.7678H41.3529ZM20.1708 19.0178C21.3672 19.4964 22.385 20.0214 23.2672 20.5428V50.5C21.9062 49.4772 20.4174 48.6368 18.8386 48C16.2136 46.95 12.4279 46.0821 6.6529 46.0821C6.1793 46.0821 5.7251 45.894 5.39021 45.5591C5.05532 45.2242 4.86719 44.77 4.86719 44.2964V18.625C4.86719 18.1514 5.05532 17.6972 5.39021 17.3623C5.7251 17.0274 6.1793 16.8392 6.6529 16.8392C12.7958 16.8392 17.0458 17.7642 20.1708 19.0178ZM32.1565 48C30.2279 48.775 28.8743 49.6642 27.7279 50.4964V20.5428C28.61 20.0214 29.6315 19.4964 30.8279 19.0178C33.9529 17.7642 38.2029 16.8392 44.3458 16.8392C44.8194 16.8392 45.2736 17.0274 45.6084 17.3623C45.9433 17.6972 46.1315 18.1514 46.1315 18.625V44.2964C46.1315 44.77 45.9433 45.2242 45.6084 45.5591C45.2736 45.894 44.8194 46.0821 44.3458 46.0821C38.5708 46.0821 34.785 46.9464 32.1565 48Z"
                                fill="#023430"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_141_12903">
                                <rect
                                    width="50"
                                    height="50"
                                    fill="white"
                                    transform="translate(0.5 0.5)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </InfoCard>
            </div>

            <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-3 ">
                <section className="w-full col-span-3 p-4 bg-white rounded-lg h-fit">
                    <h1 className="pl-4 text-2xl font-semibold text-dark-green mb-7">
                        Notification
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

                <section className="w-full h-full col-span-2 p-2 bg-white rounded-s-lg max-xl:col-span-3">
                    <section className="w-full p-2 bg-white rounded-s-lg h-fit">
                        <div className="flex flex-col gap-8 mt-5">
                            {/* <h1 className="text-2xl font-bold leading-7 text-dark-green">
                                Top Performance
                            </h1> */}
                            {/* <div className="flex flex-col gap-4 p-4 border rounded-md border-light-border">
                                <h1 className="justify-center mb-2 ml-2 text-xl font-semibold text-dark-green">
                                    Best Contributor
                                </h1>
                                <div className="flex flex-col gap-5">
                                    {bestContributors.map((_, i) => {
                                        return (
                                            <li
                                                key={`contributor-${i}`}
                                                className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <p className="font-semibold">{i + 1}</p>
                                                    <img
                                                        className="border-2 rounded-full size-11"
                                                        src={_.avatar}
                                                        alt="Avatar"
                                                    />
                                                    <p className="font-semibold text-black text-medium">
                                                        {_.name}
                                                    </p>
                                                </div>
                                                <img src={_.medal} alt="Medal" />
                                            </li>
                                        );
                                    })}
                                </div>
                            </div> */}
                            <h1 className="text-2xl font-bold leading-7 text-dark-green ">
                                Students
                            </h1>
                            <div className="items-center justify-center w-full felx">
                                <DoughnuChart id={userId} />
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    );
}

export default Home;
