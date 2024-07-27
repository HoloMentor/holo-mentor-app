import { useState } from 'react';
import InstituteForm from './institute';
import LoginForm from './signin';

export default function Login() {
    const [tab, setTab] = useState(0);

    return (
        <div className="relative grid grid-cols-2 min-h-screen items-center justify-center justify-items-center px-[10%] py-6 max-lg:flex max-lg:flex-col">
            <div className="max-w-[800px] max-h-[800px] h-[80vw] w-[80vw] z-[-1] absolute top-[-120px] left-[-150px] bg-light-gray border rounded-full min-w-[400px] min-h-[400px]"></div>
            <div className="absolute bottom-0 right-0 overflow-hidden h-[120px] w-[400px] z-[-1]">
                <div className="w-[600px] h-[600px] bg-light-gray border rounded-full"></div>
            </div>

            <section className="flex justify-center w-full max-lg:hidden">
                <img src="/images/login.png" alt="Login" className="w-full" />
            </section>

            <section className="flex flex-col items-center gap-9 justify-center w-full">
                <img src="/images/logo.svg" alt="Logo" className="w-full max-w-80" />

                {tab === 0 ? <LoginForm onSuccess={setTab} /> : <InstituteForm />}
            </section>
        </div>
    );
}
