/* AdminConfig.tsx */
"use client";

import React, { useState } from 'react';
import { Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

const AdminDelivery: React.FC = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="tables"
        className="mb-0 mt-3"
      >
        <Tab eventKey="tables" title="Delivery">
          <Card className="border-top-0 rounded-top-0">
            <Card.Body>
              {/* Content for the "Delivery" tab */}
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="delivery" title="Mesas">
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
