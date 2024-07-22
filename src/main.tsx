import './index.scss';
import ReactDOM from 'react-dom/client';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import reduxStore from '@/redux';
import ModelContainer from './models/container';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={reduxStore}>
            <NextUIProvider>
                <App />

                <ModelContainer />
            </NextUIProvider>
        </Provider>
    </BrowserRouter>
);
