import Button from '@/components/button';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import Content from '@/components/content';
import { FormikValues } from 'formik';
import { Input } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/react';

interface ModelContainerProps {
    onClose: () => void;
}

export default function AddNewTopic({ onClose }: ModelContainerProps) {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };

    return (
        <div className="w-6xl">
            <ModalHeader className="flex flex-col gap-1 text-xl text-dark-green w-6xl">
                Add New Topic
            </ModalHeader>
            <ModalBody>
                <Content>
                    <Card>
                        <CardBody>
                            <p>Sasip 2023</p>
                        </CardBody>
                    </Card>

                    <Input
                        placeholder="Enter Topic"
                        style={{ border: 'none', boxShadow: 'none' }}
                    />
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
