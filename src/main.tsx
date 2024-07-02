import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <NextUIProvider>
            <App />
        </NextUIProvider>
    </BrowserRouter>
);
