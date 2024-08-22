import Button from '@/components/button';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import Content from '@/components/content';
import { FormikValues } from 'formik';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Input } from '@nextui-org/react';

interface ModelContainerProps {
    onClose: () => void;
}

const topics = [
    { value: 'mechanics', label: 'Mechanics' },
    { value: 'electricity-and-magnetism', label: 'Electricity and Magnetism' },
    { value: 'waves', label: 'Waves' },
    { value: 'atomic-and-nuclear-physics', label: 'Atomic and Nuclear Physics' }
];

const types = [
    { value: 'pdf', label: 'Pdf' },
    { value: 'pdf', label: 'Pdf' },
    { value: 'pdf', label: 'Pdf' }
];

const subTopics = [
    { SubTopic: 'Kinematics' },
    { SubTopic: 'Dynamics' },
    { SubTopic: 'Circular Motion' },
    { SubTopic: 'Gravitational Fields' },
    { SubTopic: 'Thermal Physics' },
    { SubTopic: 'Electric Fields' },
    { SubTopic: 'Current Electricity' },
    { SubTopic: 'Electromagnetism' },
    { SubTopic: 'Electromagnetic Induction' },
    { SubTopic: 'Oscillations' },
    { SubTopic: 'Superposition' },
    { SubTopic: 'Interference' },
    { SubTopic: 'Diffraction' },
    { SubTopic: 'Doppler Effect' },
    { SubTopic: 'Atomic Structure' },
    { SubTopic: 'Nuclear Physics' },
    { SubTopic: 'Medical Physics' }
];

export default function AddMaterials({ onClose }: ModelContainerProps) {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };

    return (
        <div className="w-6xl">
            <ModalHeader className="flex flex-col gap-1 text-xl text-dark-green w-6xl">
                Add Study Materials
            </ModalHeader>
            <ModalBody>
                <Content>
                    <div className="flex w-full gap-4 ">
                        <Autocomplete
                            placeholder="Select a topic"
                            className="max-w-xs"
                            style={{ border: 'none', boxShadow: 'none' }}>
                            {topics.map((topic) => (
                                <AutocompleteItem key={topic.value} value={topic.value}>
                                    {topic.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <Autocomplete
                            placeholder="Select a sub-topic"
                            className="max-w-xs"
                            defaultItems={subTopics}
                            style={{ border: 'none', boxShadow: 'none' }}>
                            {(item) => (
                                <AutocompleteItem key={item.SubTopic}>
                                    {item.SubTopic}
                                </AutocompleteItem>
                            )}
                        </Autocomplete>
                    </div>
                    <div className="flex w-full gap-4 ">
                        <Autocomplete
                            placeholder="Select a type"
                            className="max-w-xs"
                            style={{ border: 'none', boxShadow: 'none' }}>
                            {types.map((topic) => (
                                <AutocompleteItem key={topic.value} value={topic.value}>
                                    {topic.label}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <Input
                            placeholder="Enter the URL"
                            style={{ border: 'none', boxShadow: 'none' }}
                        />
                    </div>
                </Content>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" form="form">
                    Upload
                </Button>
            </ModalFooter>
        </div>
    );
}
