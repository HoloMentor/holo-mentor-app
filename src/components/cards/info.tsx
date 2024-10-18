import React from 'react';
import ReactCountUp from 'react-countup';

interface InfoCardProps {
    isLoading?: boolean;
    svgCode?: string;
    number: number;
    label: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
    isLoading = false,
    svgCode,
    number = 0,
    label,
    children,
    ...props
}) => {
    return (
        <div className="info-card" {...props}>
            <section className="flex flex-row items-center justify-center w-full gap-8 bg-white rounded-lg shadow-md cursor-pointer h-28 sm:w-full">
                {svgCode ? <div dangerouslySetInnerHTML={{ __html: svgCode }} /> : children}
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-semibold min-w-16 text-center">
                        <ReactCountUp end={number} duration={3} />
                    </span>
                    <span>{label}</span>
                </div>
            </section>
        </div>
    );
};

export default InfoCard;
