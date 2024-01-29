import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faUtensils, faClipboardList, faUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './icons.css';
import './globals.css';
import ClientSideLayout from '@/components/ClientSideLayout';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

const BottomMenu = () => {
    return (
        <nav className="navbar fixed-bottom navbar-light bg-light p-0">
            <div className="w-100">
                <div className="bg-primary p-2 text-white d-flex justify-content-between align-items-center">
                    <div className="col-4 text-center position-relative">
                        <FontAwesomeIcon icon={faShoppingBag} size="lg" className="mr-2" />
                        <span className="ms-1 position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                            <small>5</small>
                        </span>
                    </div>
                    <div className="col-4 text-center d-flex flex-column justify-content-between">
  <span style={{ lineHeight: '1.2' }}>Sacola vazia</span>
  <span style={{ lineHeight: '1.2' }}><small>Adicione itens</small></span>
</div>


                    <div className="col-4 text-center ml-auto">R$38,90</div>
                </div>
            </div>


            <div className="container text-center">
                <a href="#" className="navbar-brand">
                    <FontAwesomeIcon icon={faUtensils} size="1x" />
                    <div className="small">Cardápio</div>
                </a>
                <a href="#" className="navbar-brand">
                    <FontAwesomeIcon icon={faClipboardList} size="1x" />
                    <div className="small">Pedidos</div>
                </a>
                <a href="#" className="navbar-brand">
                    <FontAwesomeIcon icon={faUser} size="1x" />
                    <div className="small">Perfil</div>
                </a>
            </div>
        </nav>
    );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Suspense fallback={<>Loading...</>}>
                    <ClientSideLayout />
                    {children}
                    <BottomMenu />
                </Suspense>
            </body>
        </html>
    );
}
