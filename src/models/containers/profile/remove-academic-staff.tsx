import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';

export default function AddAcademicStaff({}: ModelContainerProps) {
    return (
        <div>
            <ModalHeader className="flex flex-col gap-1 text-dark-green text-xl"></ModalHeader>
            <ModalBody>
                <div className="flex items-center justify-center">
                    <svg
                        width="108"
                        height="108"
                        viewBox="0 0 108 108"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M45.1375 16.4655C48.9895 9.49947 59.002 9.49947 62.854 16.4655L97.711 79.47C101.446 86.22 96.5635 94.5 88.8505 94.5H19.1455C11.428 94.5 6.54552 86.22 10.2805 79.47L45.1375 16.4655ZM58.489 76.5C58.5081 75.898 58.406 75.2982 58.1887 74.7364C57.9715 74.1747 57.6436 73.6622 57.2245 73.2296C56.8053 72.7971 56.3036 72.4531 55.7489 72.2182C55.1943 71.9833 54.5981 71.8623 53.9958 71.8623C53.3934 71.8623 52.7973 71.9833 52.2426 72.2182C51.688 72.4531 51.1862 72.7971 50.7671 73.2296C50.348 73.6622 50.0201 74.1747 49.8028 74.7364C49.5856 75.2982 49.4835 75.898 49.5025 76.5C49.5395 77.6671 50.029 78.774 50.8677 79.5865C51.7063 80.3989 52.8281 80.8533 53.9958 80.8533C55.1634 80.8533 56.2853 80.3989 57.1239 79.5865C57.9625 78.774 58.4521 77.6671 58.489 76.5ZM57.3235 41.1615C57.2069 40.314 56.7728 39.5424 56.109 39.0027C55.4452 38.463 54.6012 38.1956 53.7477 38.2545C52.8943 38.3134 52.095 38.6942 51.5116 39.3199C50.9282 39.9456 50.6041 40.7695 50.605 41.625L50.623 61.8795L50.6545 62.3385C50.7711 63.186 51.2052 63.9576 51.869 64.4973C52.5329 65.0369 53.3768 65.3043 54.2303 65.2455C55.0838 65.1866 55.883 64.8058 56.4665 64.1801C57.0499 63.5544 57.3739 62.7305 57.373 61.875L57.355 41.616L57.3235 41.1615Z"
                            fill="#F60D00"
                        />
                    </svg>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-center font-semibold text-2xl">Are you sure ?</div>
                    <div className="flex justify-center font-md text-md">
                        This will remove the user from the academic staff
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="bg-white py-2  px-4 rounded hover:bg-light-gray cursor-pointer select-none inline-flex items-center gap-2 border-0 py-2 px-7 transition-all duration-200 rounded max-w-max font-semibold text-sm">
                    Cancel
                </button>
                <button className="bg-orange outline-none cursor-pointer select-none hover:bg-red-500 inline-flex items-center gap-2 border-0 text-white py-2 px-7 transition-all duration-200 rounded max-w-max font-semibold text-sm">
                    Delete
                </button>
            </ModalFooter>
        </div>
    );
}
