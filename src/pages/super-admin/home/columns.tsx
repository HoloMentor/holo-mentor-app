export function renderInstituteName({ data }: CustomTableCellData) {
    return (
        <div className="flex flex-raw">
            <img
                src={data?.image}
                alt="avatar"
                className="relative inline-block h-8 w-8 !rounded-full  object-cover object-center border-2 border-dark-green"
            />
            <span className="text-left ml-5 mt-2">{data?.name}</span>
        </div>
    );
}
