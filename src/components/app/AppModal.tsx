import React, {ReactNode} from 'react';
import {Modal} from 'react-bootstrap';
import AppButton from '@/components/app/AppButton';

interface AppModalProps {
    show: boolean;
    handleAction: () => void;
    handleClose: () => void;
    title: string;
    closeButtonLabel?: string;
    saveButtonLabel?: string;
    children: ReactNode;
}

const AppModal: React.FC<AppModalProps> = (
    {
        show,
        handleAction,
        handleClose,
        title,
        closeButtonLabel = 'Fechar',
        saveButtonLabel = 'Salvar',
        children,
    }) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <AppButton variant="secondary" onClick={handleClose}>
                    {closeButtonLabel}
                </AppButton>
                <AppButton variant="primary" onClick={handleAction}>
                    {saveButtonLabel}
                </AppButton>
            </Modal.Footer>
        </Modal>
    );
};

export default AppModal;
