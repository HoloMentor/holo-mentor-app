import './index.scss';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import reduxStore from '@/redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={reduxStore}>
            <NextUIProvider>
                <App />
            </NextUIProvider>
        </Provider>
    </BrowserRouter>
);
