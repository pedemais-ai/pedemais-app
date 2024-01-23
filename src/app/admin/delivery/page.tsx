"use client";

// AdminProducts.tsx

import { Container, Row, Col, Card, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill, faMapMarker, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import OrderModal from './order-components/OrderModal'; // Ajuste do caminho de importação

import './styles.css';

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

const OrderCard: React.FC<{ order: Order; onMoveOrder: (orderNumber: number) => void; onCardClick: () => void }> = ({ order, onMoveOrder, onCardClick }) => {
  const {
    orderNumber,
    time,
    paymentType,
    amount,
    customerName,
    deliveryType,
    column,
    paid,
  } = order;

  const handleMoveOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Impede que o evento de clique se propague para o card
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
    <Card className="custom-order-card" onClick={onCardClick}>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Card.Title>{`#${orderNumber}`} <small>{customerName}</small></Card.Title>
          </div>
          <div className="" style={{ backgroundColor: '#add8e6', padding: '5px', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
            <small><FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }} /> {time}</small>
          </div>
        </div>
        <Card.Text style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <strong><FontAwesomeIcon icon={faMoneyBill} style={{ marginRight: '5px' }} /></strong>
            <span style={{ marginLeft: '5px' }}>{paymentType}</span>
            {paid ? <span style={{ marginLeft: '5px', color: 'green' }}><small>Pago</small></span> : <span style={{ marginLeft: '5px', color: 'red' }}><small>Não identificado</small></span>}
          </div>
          <div>
            <strong>{amount}</strong>
          </div>
        </Card.Text>
        <Card.Text>
          <strong><FontAwesomeIcon icon={faMapMarker} style={{ marginRight: '5px' }} /> </strong> {deliveryType}
        </Card.Text>
        {column !== 'Prontos para Entrega' && (
          <OverlayTrigger
            placement="bottom"
            delay={1250}
            overlay={<Tooltip id={`tooltip-${orderNumber}`}>{tooltipText}</Tooltip>}
          >
<div className="custom-move-button-container">
  <Button variant="primary" className="custom-move-button" style={{ width: '100%' }} onClick={handleMoveOrder}>
    Mover <FontAwesomeIcon icon={faArrowRight} />
  </Button>
</div>

          </OverlayTrigger>
        )}
      </Card.Body>
    </Card>
  );
};

const AdminProducts: React.FC = () => {
  const columns = ['Em Análise', 'Em Produção', 'Prontos para Entrega'];

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [ordersData, setOrdersData] = useState<Order[]>([
    { orderNumber: 1, time: '12:30 PM', paymentType: 'Cartão de Crédito', amount: 'R$25,00', customerName: 'João da Silva', deliveryType: 'Rua Cento e Trinta, 03, Timoteo', column: 'Em Análise', paid: true },
    { orderNumber: 2, time: '1:45 PM', paymentType: 'Dinheiro', amount: 'R$18,50', customerName: 'Maria Oliveira', deliveryType: 'Retirada no local', column: 'Em Produção', paid: false },
    { orderNumber: 3, time: '3:00 PM', paymentType: 'Transferência Bancária', amount: 'R$35,20', customerName: 'Carlos Santos', deliveryType: 'Rua Cento e Trinta, 03, Timoteo', column: 'Em Análise', paid: true },
    { orderNumber: 4, time: '4:30 PM', paymentType: 'Cartão de Débito', amount: 'R$22,50', customerName: 'Fernanda Costa', deliveryType: 'Retirada no local', column: 'Prontos para Entrega', paid: false },
    { orderNumber: 5, time: '5:45 PM', paymentType: 'Mesa', amount: 'R$40,00', customerName: 'Amanda Souza', deliveryType: 'Mesa 05', column: 'Em Produção', paid: false },
  ]);

  const handleMoveOrder = (orderNumber: number) => {
    const updatedOrdersData = ordersData.map(order => {
      if (order.orderNumber === orderNumber) {
        const currentColumnIndex = columns.findIndex(col => col === order.column);
        const nextColumnIndex = (currentColumnIndex + 1) % columns.length;
        order.column = columns[nextColumnIndex];
      }
      return order;
    });

    setOrdersData(updatedOrdersData);
  };

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setModalShow(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalShow(false);
  };

  return (
<Container fluid>
  <Row>
    {columns.map((column, columnIndex) => (
      <Col
        className="m-2 p-0"
        key={columnIndex}
      >
        <div
          className={`custom-card-title ${columnIndex === 1 ? 'h2-producao' : (columnIndex === 2 ? 'h2-entrega' : 'h2-analise')}`}
        >
          {column}
        </div>
        <div className={`custom-order-card-details ${columnIndex === 1 ? 'h2-producao' : (columnIndex === 2 ? 'h2-entrega' : 'h2-analise')}`}>
          {ordersData.map((order) => order.column === column && (
            <div key={order.orderNumber} onClick={() => openModal(order)} className={`custom-order-card-container ${columnIndex === 1 ? 'h2-producao' : (columnIndex === 2 ? 'h2-entrega' : 'h2-analise')}`}>
              <OrderCard order={order} onMoveOrder={handleMoveOrder} onCardClick={() => {}} />
            </div>
          ))}
        </div>
      </Col>
    ))}
  </Row>

  {selectedOrder && (
    <OrderModal order={selectedOrder} onClose={closeModal} />
  )}
</Container>



  );
};

export default AdminProducts;
