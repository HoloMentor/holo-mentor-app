interface ModelContainerActionProps {
    size?: 'sm' | 'md' | 'lg' | 'full' | 'xs' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    [key: string | symbol]: any;
}

interface ModelContainerProps extends ModelContainerActionProps {
    onClose: () => void;
}

interface ModelContainerWrap extends ModalProps {
    children: React.ReactElement<ModelContainerProps>;
}

interface ModelContainer {
    model: React.ComponentType<ModelContainerProps>;
    props?: ModelContainerActionProps;
}

interface ModelContainers {
    [key: string | symbol]: ModelContainer;
}
