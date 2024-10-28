import FormEditor from '@/components/form/editor';
import FormInput from '@/components/form/input';

interface Props {
    index: number;
    id: string | number;
}

export default function TaskEditor({ index, id }: Props) {
    return (
        <div className="flex flex-col gap-3 border-2 border-gray-200 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-dark-green">Task {index + 1}</h4>
            <FormInput
                name={`tasks.${id}.name`}
                label="Task Title"
                placeholder="Task Title"
                isRequired
            />
            <FormEditor
                className=" min-h-72"
                name={`tasks.${id}.description`}
                label="Task Description"
                isRequired
            />
        </div>
    );
}
