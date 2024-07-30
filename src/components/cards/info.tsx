import React from 'react';

interface InfoCardProps {
    svgCode?: string;
    number: number;
    label: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ svgCode, number, label, children, onClick }) => {
    return (
        <div className="info-card" onClick={onClick}>
            <section className="flex flex-row items-center justify-center w-full gap-8 bg-white rounded-lg shadow-md cursor-pointer h-28 sm:w-full">
            {svgCode ? <div dangerouslySetInnerHTML={{ __html: svgCode }} /> : children}
            <div className="flex flex-col items-center">
                <span className="text-3xl font-semibold">{number}</span>
                <span>{label}</span>
                
            </div>
        </section>
        </div>
        
    );
};

export default InfoCard;
