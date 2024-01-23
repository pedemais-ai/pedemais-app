/* AdminDelivery.tsx */

"use client";

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import OrderCard from '@/components/admin/order/OrderCard'; // Verifique o caminho de importação
import OrderModal from '@/components/admin/order/OrderModal'; // Verifique o caminho de importação
import styles from './styles.module.css';

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

const AdminDelivery: React.FC = () => {
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
          <Col className={`m-2 p-0 ${styles['custom-col']}`} key={columnIndex}>
            <div className={`${styles['custom-card-title']} ${styles[column.toLowerCase()]}`}>
              {column}
            </div>
            <div className={`${styles['custom-order-card-details']} ${styles[column.toLowerCase()]}`}>
              {ordersData.map((order) => order.column === column && (
                <div key={order.orderNumber} onClick={() => openModal(order)} className={`${styles['custom-order-card-container']} ${styles[column.toLowerCase()]}`}>
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

export default AdminDelivery;
