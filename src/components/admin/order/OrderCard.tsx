// OrderCard.tsx
import React from 'react';
import {Button, Card, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {faArrowRight, faClock, faMapMarker, faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import styles from './order-card.module.css';

// Import the icon styles
import '@fortawesome/fontawesome-svg-core/styles.css';

// Use the library method to explicitly initialize
import {config} from '@fortawesome/fontawesome-svg-core';
import AppIcon from "@/components/app/AppIcon";

config.autoAddCss = false;

export interface Order {
    orderNumber: number;
    time: string;
    paymentType: string;
    amount: string;
    customerName: string;
    deliveryType: string;
    column: string;
    paid: boolean;
}

interface OrderCardProps {
    order: Order;
    onMoveOrder: (orderNumber: number) => void;
    onCardClick: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({order, onMoveOrder, onCardClick}) => {
    const {orderNumber, time, paymentType, amount, customerName, deliveryType, column, paid} = order;

    const handleMoveOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onMoveOrder(orderNumber);
    };

    const getNextColumnLabel = (): string => {
        switch (column) {
            case 'Em Análise':
                return 'Em Produção';
            case 'Em Produção':
                return 'Prontos para Entrega';
            default:
                return '';
        }
    };

    const tooltipText = `Mover para ${getNextColumnLabel()}`;

    return (
        <Card className={`${styles.customOrderCard} ${styles[column.toLowerCase()]}`} onClick={onCardClick}>
            <Card.Body>
                <div>
                    <Card.Title>{`#${orderNumber}`} <small>{customerName}</small></Card.Title>
                </div>
                <div className={styles.highlightedTime}>
                    <small><AppIcon icon={faClock} className="mr-1"/> {time}</small>
                </div>
                <Card.Text className="mt-3 d-flex justify-content-between">
                    <div>
                        <strong><AppIcon icon={faMoneyBill}/></strong>
                        <span>&nbsp;{paymentType}&nbsp;</span>
                        {paid ? <span className={styles.paidText}>Pago</span> : <span className={styles.unpaidText}>Não identificado</span>}
                    </div>
                    <div>
                        <strong>{amount}</strong>
                    </div>
                </Card.Text>
                <Card.Text>
                    <strong><AppIcon icon={faMapMarker} className="mr-1"/> </strong> {deliveryType}
                </Card.Text>
                {column !== 'Prontos para Entrega' && (
                    <OverlayTrigger
                        placement="bottom"
                        delay={1250}
                        overlay={<Tooltip id={`tooltip-${orderNumber}`}>{tooltipText}</Tooltip>}
                    >
                        <div className={styles.customMoveButtonContainer}>
                            <Button variant="primary" className={styles.customMoveButton} style={{width: '100%'}} onClick={handleMoveOrder}>
                                Mover <AppIcon icon={faArrowRight}/>
                            </Button>
                        </div>
                    </OverlayTrigger>
                )}
            </Card.Body>
        </Card>
    );
};

export default OrderCard;
