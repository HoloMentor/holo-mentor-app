import { IRootState } from '@/redux';
import { useSelector } from 'react-redux';
import { modelContainers } from '.';
import ModelWrap from './model';

export default function ModelContainer() {
    const { modelTypes, modelProps } = useSelector((state: IRootState) => state.model);

    return modelTypes.map((type: string, idx: number) => {
        const { model: Container, props: containerProps } = modelContainers[type];
        const extraProps: any = modelProps[type];

        const props = { ...containerProps, ...extraProps };

        return (
            <ModelWrap
                key={`model-${idx}`}
                size={props?.size || 'md'}
                placement={props?.placement || 'center'}>
                <Container {...props} />
            </ModelWrap>
        );
    });
}
