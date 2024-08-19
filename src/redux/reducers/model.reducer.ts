import { createSlice } from '@reduxjs/toolkit';

interface actionsProps {
    payload: {
        name: string;
        props?: ModelContainerActionProps;
    };
}

interface ModelStateProps {
    modelTypes: string[];
    modelProps: {
        [key: string | symbol]: ModelContainerActionProps;
    };
}

const initialState: ModelStateProps = {
    modelTypes: [],
    modelProps: {}
};

const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        show(state, { payload }: actionsProps) {
            state.modelTypes.push(payload.name);

            if (payload.props) state.modelProps[payload.name] = payload.props;
        },
        hide(state) {
            state.modelTypes.pop();
        },
        update(state, { payload }: actionsProps) {
            if (payload.props) state.modelProps[payload.name] = payload.props;
        }
    }
});

export const modelActions = modelSlice.actions;

export default modelSlice.reducer;
