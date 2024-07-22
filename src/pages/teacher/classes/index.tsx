import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Classes() {

    interface Institute {
        name: string;
        town: string;
    }

    const navigate = useNavigate();

    const Institutes = [
        {
            name: 'Sasip Institute',
            town: 'Colombo'
        },
        {
            name: 'Royal Institute',
            town: 'Kandy'
        },
        {
            name: 'Horizon College',
            town: 'Galle'
        },
        {
            name: 'Lyceum College',
            town: 'Negombo'
        }
    ];

    const transformedUrl = (name:string) => {
        return name.replace(/\s+/g, '-');
    }

    const handleDropDownAction = (key:string,institute:Institute) => {
        const transformedName = transformedUrl(institute.name);
        const routes:{[key:string]:string} = {
            '2024T': `/${transformedName}/2024-Al-theory`,
            '2025T': `/${transformedName}/2025-Al-theory`,
            '2026T': `/${transformedName}/2026-Al-theory`,
            '2024R': `/${transformedName}/2024-Al-revision`
        };

        navigate(routes[key]);
    };

    return (
        <div className="grid justify-between grid-cols-4 gap-5 pr-4 m-3 max-xl:grid-cols-2 max-sm:grid-cols-1 max-xl:m-0">
            {Institutes.map((institute,i) => {
                return (
                    <div key={`${i}`} className="w-full p-4 m-4 bg-white rounded-md shadow-md h-72">
                        <div className="flex flex-col items-center">
                            <img src="/images/institute.png" className="self-center m-4 mt-8" />
                            <Dropdown>
                                <DropdownTrigger>
                                    <div className="p-2 mt-10 border-t-1">
                                        <p className="flex text-2xl font-semibold">{institute.name}</p>
                                        <p className="flex text-xl">{institute.town}</p>
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Action event example"
                                    onAction={(key) => handleDropDownAction(key as string, institute)}>
                                    <DropdownItem key="2024T">2024 AL Theory</DropdownItem>
                                    <DropdownItem key="2025T">2025 AL Theory</DropdownItem>
                                    <DropdownItem key="2026T">2026 AL Theory</DropdownItem>
                                    <DropdownItem key="2024R">2024 AL Revision</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
