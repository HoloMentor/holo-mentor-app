import React from 'react';

interface InfoCardProps {
    svgCode?: string;
    number: number;
    label: string;
    children?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ svgCode, number, label, children }) => {
    return (
        <section className="flex flex-row items-center justify-center w-full gap-8 my-2 bg-white rounded-lg shadow-md h-28 sm:w-full">
            {svgCode ? <div dangerouslySetInnerHTML={{ __html: svgCode }} /> : children}
            <div className="flex flex-col items-center">
                <span className="text-3xl font-semibold">{number}</span>
                <span>{label}</span>
            </div>
        </section>
    );
};

export default InfoCard;
