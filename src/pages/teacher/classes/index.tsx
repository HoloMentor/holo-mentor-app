import { Link } from 'react-router-dom';

export default function Classes() {
    const Institutes = [
        {
            name: '2024-AL-Theory',
            subject: 'Physics'
        },
        {
            name: '2024-AL-Theory',
            subject: 'Physics'
        },
        {
            name: 'Lyceum College',
            town: 'Negombo'
        }
    ];

    return (
        <div className="grid justify-between grid-cols-4 gap-5 pr-4 m-3 max-xl:grid-cols-2 max-sm:grid-cols-1 max-xl:m-0">
            {Institutes.map((institute, i) => {
                return (
                    <div key={`${i}`} className="w-full p-4 m-4 bg-white rounded-md shadow-md h-72">
                        <div className="flex flex-col items-center">
                            <img src="/images/institute.png" className="self-center m-4 mt-8" />
                            <Link title={'Class-Name'} key={`classes-${i}`} to={`/classes/${i}`}>
                                <div className="p-2 mt-10 transition-all duration-200 ease-in-out cursor-pointer border-t-1 hover:bg-gray-200 hover:shadow-md active:bg-gray-300 active:shadow-sm hover:scale-90 hover:px-4 hover:rounded-md ">
                                    <p className="flex text-xl font-semibold text-black">
                                        {institute.name}
                                    </p>
                                    <p className="flex text-black text-medium">
                                        {institute.subject}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
