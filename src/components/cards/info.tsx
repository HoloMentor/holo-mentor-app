import React from 'react';

interface InfoCardProps {
    svgCode?: string;
    number: number;
    label: string;
    children?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ svgCode, number, label, children }) => {
    return (
        <section className="bg-white rounded-lg flex flex-row gap-8  w-full h-28 items-center  justify-center shadow-md sm:w-full">
            {svgCode ? <div dangerouslySetInnerHTML={{ __html: svgCode }} /> : children}
            <div className="flex flex-col items-center">
                <span className="text-3xl font-semibold">{number}</span>
                <span>{label}</span>
            </div>
        </section>
    );
};

export default InfoCard;
