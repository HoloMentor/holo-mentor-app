import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

export default function Classes() {
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

    return (
        <div className="grid justify-between grid-cols-4 gap-5 pr-4 m-3 max-xl:grid-cols-2 max-sm:grid-cols-1 max-xl:m-0">
            {Institutes.map((_, i) => {
                return (
                    <div key={`${i}`} className="w-full p-4 m-4 bg-white rounded-md shadow-md h-72">
                        <div className="flex flex-col items-center">
                            <img src="/images/institute.png" className="self-center m-4 mt-8" />
                            <Dropdown>
                                <DropdownTrigger>
                                        <div className="p-2 mt-10 border-t-1">
                                            <p className="flex text-2xl font-semibold">{_.name}</p>
                                            <p className="flex text-xl">{_.town}</p>
                                        </div>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Action event example"
                                    onAction={(key) => alert(key)}>
                                    <DropdownItem key="new">2024 AL Theory</DropdownItem>
                                    <DropdownItem key="copy">2025 AL Theory</DropdownItem>
                                    <DropdownItem key="edit">2026 AL Theory</DropdownItem>
                                    <DropdownItem key="edit">2024 AL Revision</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
