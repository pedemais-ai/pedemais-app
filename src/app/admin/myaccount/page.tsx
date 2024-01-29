/* AdminConfig.tsx */
"use client";

import React, { useState } from 'react';
import { Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

const AdminDelivery: React.FC = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="info"
        className="mb-0 mt-3"
      >
        <Tab eventKey="info" title="Geral">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Delivery" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="account" title="Meus dados">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Delivery" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="payment" title="Pagamento do Plano">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Mesas" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="plans" title="Planos">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Delivery" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="invoice" title="Faturas">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Mesas" tab */}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminDelivery;
