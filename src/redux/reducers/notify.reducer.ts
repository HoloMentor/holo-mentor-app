import { createSlice } from '@reduxjs/toolkit';

interface actionsProps {
    payload: {
        type: 'success' | 'info' | 'warning' | 'error' | string;
        message: string;
        format?: boolean;
    };
}

interface NotifyStateProps {
    notifyTypes: (string | number)[];
    notifyProps: {
        [key: string]: any;
        [key: symbol]: any;
    };
}

const initialState: NotifyStateProps = {
    notifyTypes: [],
    notifyProps: {}
};

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        open(state, { payload }: actionsProps) {
            const id = new Date().getTime();
            state.notifyTypes.push(id);

            if (payload.type === 'failed') payload.type = 'error';

            state.notifyProps[id] = {
                id: id,
                type: payload.type,
                message: payload?.message || '',
                format: payload.format !== false ? true : payload.format
            };
        },
        close(state, { payload }) {
            const id = state.notifyTypes.pop();

            if (id) state.notifyProps[id] = null;
            if (payload) state.notifyProps[payload] = null;
        }
    }
});

export const notifyActions = notifySlice.actions;

export default notifySlice.reducer;
