import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Link } from 'react-router-dom';

interface InstituteClass {
    name: string;
    subject: string;
    town?: string;
}

export default function Classes() {
    const instituteClasses: InstituteClass[] = [
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
            subject: 'Physics',
            town: 'Negombo'
        }
    ];

    return (
        <div className="grid justify-between grid-cols-4 gap-5 pr-4 m-3 max-xl:grid-cols-2 max-sm:grid-cols-1 max-xl:m-0">
            {instituteClasses.map((instituteClass, i: number) => {
                return (
                    <Link key={`class-${i}`} to={`/classes/${i}`}>
                        <Card className="py-4 cursor-pointer hover:scale-[.97]">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                {/* <p className="text-tiny uppercase font-bold"></p> */}
                                <small className="text-default-500">{instituteClass.subject}</small>
                                <h4 className="font-bold text-large">{instituteClass.name}</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible items-center py-2">
                                <img
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src="/images/institute.png"
                                    width={270}
                                />
                            </CardBody>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
