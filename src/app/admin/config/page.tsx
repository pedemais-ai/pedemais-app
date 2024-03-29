/* AdminConfig.tsx */
"use client";

import React, { useState } from 'react';
import { Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

const AdminDelivery: React.FC = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="menu"
        className="mb-0 mt-3"
      >
        <Tab eventKey="menu" title="Cardápio Digital">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Delivery" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="orders" title="Pedidos">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Delivery" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="bot" title="Robô">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Mesas" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="paymentmethod" title="Formas de Pagamento">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Mesas" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="printer" title="Impressora">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Mesas" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="about" title="Estabelecimento">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Delivery" tab */}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDelivery;
