"use client";

import React, {useEffect, useState} from "react";
import {Button, Card, Col, Dropdown, FormControl, InputGroup, Stack} from "react-bootstrap";
import {faEllipsisV, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import AppIcon from "@/components/app/AppIcon";
import AddCategoryForm from "@/components/admin/products/category/AddCategoryForm";
import ProductCategoryList from "@/components/admin/products/category/ProductCategoryList";
import {useCategory} from "@/core/hooks/useCategory";
import {Prisma} from "@/core/types/prisma";

export default function Products() {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showModalAdd, setShowModalAdd] = useState(false);
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
                            onClick={() => setShowModalAdd(true)}
                            className="d-sm-flex align-items-center"
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


            <AddCategoryForm
                show={showModalAdd}
                setShow={setShowModalAdd}
            />
        </>
    );
}
