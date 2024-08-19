import { ChangeEvent } from 'react';
import Input, { InputProps as NextInputProps } from './input';
import { useLocation, useNavigate } from 'react-router-dom';

interface InputProps extends NextInputProps {
    paramName?: string;
}

export default function SearchInput({ paramName = 'search', ...props }: InputProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            searchParams.delete(paramName);
        } else {
            searchParams.set(paramName, event.target.value);
        }

        navigate(`${pathname}?${searchParams.toString()}`);
    };

    return (
        <Input
            defaultValue={searchParams.get(paramName)}
            startContent={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6">
                    <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clipRule="evenodd"
                    />
                </svg>
            }
            placeholder="Search"
            onChange={onSearch}
            {...props}
        />
    );
}
