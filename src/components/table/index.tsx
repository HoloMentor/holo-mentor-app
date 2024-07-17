import Pagination from './pagination';

export default function Table({
    loading = false,
    columns = [],
    data = [],
    pagination = { enable: false, page: 0, limit: 10, pages: 1 },
    name = 'table'
}: TableProps) {
    const getAlignment = (length: number, i: number) => {
        switch (i) {
            case 0:
                return 'left';

            case length - 1:
                return 'right';

            default:
                return 'center';
        }
    };

    return (
        <div className="border rounded-lg border-border">
            <div className="overflow-x-auto overflow-y-hidden rounded-t-lg">
                <table className="min-w-full text-sm bg-white">
                    <thead className="bg-[#F9FAFB]">
                        <tr>
                            {columns.map((_, i) => {
                                return (
                                    <th
                                        align={getAlignment(columns.length, i)}
                                        key={_?.key || `${name}-head-${i}`}
                                        className="px-4 py-4 font-semibold whitespace-nowrap">
                                        {_.name}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody className="border-t-2 border-t-light-border">
                        {data.length === 0 ? (
                            <tr className="block px-4 py-2">No records.</tr>
                        ) : (
                            data.map((_data, i) => {
                                return (
                                    <tr key={`${name}-row-${i}`}>
                                        {columns?.map((_, j) => {
                                            const { value, props } = _;

                                            return (
                                                <td
                                                    key={`${name}-cell-${i}-${j}`}
                                                    align={getAlignment(columns.length, j)}
                                                    className="px-4 py-2 font-normal text-gray-900 whitespace-nowrap border-b-1"
                                                    {...props}>
                                                    {typeof value === 'string' ? (
                                                        _data[value]
                                                    ) : (
                                                        <value.render
                                                            rowIndex={i}
                                                            data={_data}
                                                            {...value.props}
                                                        />
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {pagination?.enable && <Pagination {...pagination} />}
        </div>
    );
}