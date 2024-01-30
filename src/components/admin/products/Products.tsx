"use client";

import React, {useState} from "react";
import {Button, Card, Container, Dropdown, FormControl, Tab, Tabs} from "react-bootstrap";
import {faEllipsisV, faSearch} from "@fortawesome/free-solid-svg-icons";
import AppIcon from "@/components/app/AppIcon";
import AddCategoryForm from "@/components/admin/products/category/AddCategoryForm";
import ProductCategoryList from "@/components/admin/products/category/ProductCategoryList";

export default function Products() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showModal, setShowModal] = useState(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Container>
                <Tabs defaultActiveKey="manage" className="mb-0 mt-3">
                    <Tab eventKey="manage" title="Gestor">
                        <Card className="border-top-0 rounded-top-0">
                            <Card.Body>
                                <Container>
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="d-flex align-items-center">
                                            <FormControl
                                                type="text"
                                                placeholder="Buscar categoria"
                                                onChange={handleSearch}
                                                value={searchTerm}
                                            />
                                            <AppIcon icon={faSearch} className="ms-2"/>
                                        </div>

                                        <div className="d-flex">
                                            <Dropdown className="ms-auto">
                                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                                    <AppIcon icon={faEllipsisV}/>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Action 1</Dropdown.Item>
                                                    <Dropdown.Item>Action 2</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                            <Button variant="success" className="ms-2" onClick={() => setShowModal(true)}>
                                                + Nova Categoria
                                            </Button>
                                        </div>
                                    </div>

                                    <ProductCategoryList/>

                                </Container>
                            </Card.Body>
                        </Card>
                    </Tab>
                    <Tab eventKey="images" title="Imagens do cardápio">
                        <Card className="border-top-0 rounded-top-0">
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Tab>
                    <Tab eventKey="list" title="Lista de produtos">
                        <Card className="border-top-0 rounded-top-0">
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>

            </Container>

            <AddCategoryForm
                show={showModal}
                setShow={setShowModal}
            />
        </>
    );
}
