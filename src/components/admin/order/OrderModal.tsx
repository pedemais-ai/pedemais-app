// Importações necessárias
import React from 'react';
import {Button, Col, Modal, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import {faEdit, faPrint, faTrash, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import AppIcon from "@/components/app/AppIcon";

// Definição da interface Order
interface Order {
    orderNumber: number;
    time: string;
    paymentType: string;
    amount: string;
    customerName: string;
    deliveryType: string;
    column: string;
    paid: boolean;
}

// Componente OrderModal
const OrderModal: React.FC<{ order: Order; onClose: () => void }> = ({order, onClose}) => {
    const getStatusBadgeVariant = () => {
        return order.paid ? 'success' : 'danger';
    };

    const renderTooltip = (text: string) => (
        <Tooltip id={`tooltip-${order.orderNumber}`}>{text}</Tooltip>
    );

    return (
        <Modal show={true} centered size="lg" onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{`Detalhes do Pedido #${order.orderNumber}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <p><strong>Cliente:</strong> {order.customerName}</p>
                        <p><strong>Tempo:</strong> {order.time}</p>
                        <p><strong>Forma de Pagamento:</strong> {order.paymentType}</p>
                        <p><strong>Tipo de Entrega:</strong> {order.deliveryType}</p>
                    </Col>
                    <Col md={6}>
                        <p><strong>Valor Total:</strong> {order.amount}</p>
                        <p>
                            <strong>Estado do Pagamento:</strong>
                            <span className={`badge badge-${getStatusBadgeVariant()}`}>
                {order.paid ? 'Pago' : 'Não pago'}
              </span>
                        </p>
                        <p><strong>Status do Pedido:</strong> {order.column}</p>
                    </Col>
                </Row>
                {/* ... Outras informações do pedido */}
            </Modal.Body>
            <Modal.Footer>
                <OverlayTrigger placement="top" overlay={renderTooltip('Cancelar Pedido')}>
                    <Button variant="danger" className="mr-2">
                        <AppIcon icon={faTrash}/>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={renderTooltip('Editar Pedido')}>
                    <Button variant="primary" className="mr-2">
                        <AppIcon icon={faEdit}/>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={renderTooltip('Imprimir Pedido')}>
                    <Button variant="info" className="mr-2">
                        <AppIcon icon={faPrint}/>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={renderTooltip('Fechar Mesa')}>
                    <Button variant="warning">
                        <AppIcon icon={faWindowClose}/>
                    </Button>
                </OverlayTrigger>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderModal;
