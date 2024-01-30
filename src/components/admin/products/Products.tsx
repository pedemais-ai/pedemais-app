"use client";

import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Dropdown, FormControl, InputGroup, Stack, Tab, Tabs} from "react-bootstrap";
import {faEllipsisV, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import AppIcon from "@/components/app/AppIcon";
import AddCategoryForm from "@/components/admin/products/category/AddCategoryForm";
import ProductCategoryList from "@/components/admin/products/category/ProductCategoryList";
import {useCategory} from "@/core/hooks/useCategory";
import {Prisma} from "@/core/types/prisma";

export default function Products() {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState<Prisma.Category[]>([])
    const [lastVersion, setLastVersion] = useState<number>()

    const categoryState = useCategory();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (categories.length === 0 || categoryState.version !== lastVersion) {
            categoryState.findAll().then((p: Prisma.Category[]) => {
                setCategories(p);
                setLastVersion(categoryState.version);
            });
        }
    }, [categories.length, categoryState, lastVersion]);


    return (
        <>
            <Container>
                <Tabs defaultActiveKey="manage" className="mb-0 mt-3">
                    <Tab eventKey="manage" title="Gestor">
                        <Card className="border-top-0 rounded-top-0">
                            <Card.Body>
                                <Stack direction="horizontal" gap={3} className={"mb-3"}>
                                    <Col lg={3}>
                                        <InputGroup>
                                            <FormControl
                                                type="text"
                                                placeholder="Buscar categoria"
                                                onChange={handleSearch}
                                                value={searchTerm}
                                            />
                                            <InputGroup.Text>
                                                <AppIcon icon={faSearch} className="ms-2"/>
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Col>

                                    <Dropdown className={"ms-auto"}>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                            <AppIcon icon={faEllipsisV}/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>Action 1</Dropdown.Item>
                                            <Dropdown.Item>Action 2</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Button
                                        variant="success"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <AppIcon icon={faPlus}/>
                                        <span className={"ms-1 d-none d-sm-block"}>Nova Categoria</span>
                                    </Button>
                                </Stack>

                                <ProductCategoryList
                                    categories={categories}
                                    searchTerm={searchTerm}
                                />

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
