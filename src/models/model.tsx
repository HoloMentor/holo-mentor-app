import { Modal, ModalContent, ModalProps, useDisclosure } from '@nextui-org/react';
import { cloneElement, isValidElement, useEffect } from 'react';

interface Props extends ModelContainerWrap, Omit<ModalProps, 'children'> {}

export default function ModelWrap({ children, placement = 'center' }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        onOpen();
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement={placement}
            backdrop="blur"
            motionProps={{
                variants: {
                    enter: {
                        z: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: 'easeOut'
                        }
                    },
                    exit: {
                        z: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: 'easeIn'
                        }
                    }
                }
            }}>
            <ModalContent>
                {(onClose) =>
                    isValidElement(children) ? cloneElement(children, { onClose }) : children
                }
            </ModalContent>
        </Modal>
    );
}
