import Button from '@/components/button';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react';
import Content from '@/components/content';
import { FormikValues } from 'formik';
interface ModelContainerProps {
    onClose: () => void;
}

export default function UploadMarks({ onClose }: ModelContainerProps) {
    const onSubmit = (v: FormikValues) => {
        console.log(v);
    };

    return (
        <div className="w-6xl">
            <ModalHeader className="flex flex-col gap-1 text-xl text-dark-green w-6xl">
                Upload Student Marks
            </ModalHeader>
            <ModalBody>
                <Content>
                    <div className="flex justify-end">
                        <Button
                            variant="bordered"
                            className="border-2 text-dark-green border-dark-green">
                            Download MarkSheet
                        </Button>
                    </div>

                    <div className="p-4 rounded-md outline-dashed outline-slate-300">
                        <div className="flex justify-center p-4">
                            <img src="/images/teacher/upload-csv.svg"></img>
                        </div>
                        <p className="flex justify-center text-slate-500">Students-Marks.csv</p>
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
