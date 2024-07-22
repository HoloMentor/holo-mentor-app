interface ModelContainerProps {
    onClose: () => void;
    [key: string | symbol]: any;
}

interface ModelContainerWrap extends ModalProps {
    children: React.ReactElement<ModelContainerProps>;
}

interface ModelContainer {
    model: React.ComponentType<ModelContainerProps>;
    props?: ModelContainerProps;
}

interface ModelContainers {
    [key: string | symbol]: ModelContainer;
}
