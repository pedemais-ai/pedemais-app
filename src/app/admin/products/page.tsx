// AdminProducts.tsx
/* eslint-disable @next/next/no-async-client-component */
"use client";

import React, {useState} from "react";
import {Button, Card, Container, Dropdown, FormControl, Modal, Tab, Tabs} from "react-bootstrap";
import {faEllipsisV, faSearch} from "@fortawesome/free-solid-svg-icons";
import CategoriaCard from "@/components/admin/manage/CategoriaCard";
import AppIcon from "@/components/app/AppIcon";

interface Categoria {
    id: string;
    nome: string;
    itens: { nome: string; descricao: string; preco: number }[];
}

const Categorias: Categoria[] = [
    {
        id: "categoria-1",
        nome: "Bebidas",
        itens: [
            {nome: "Coca Cola", descricao: "Refrigerante de cola", preco: 3.5},
            {nome: "Pepsi", descricao: "Refrigerante de cola", preco: 3.0},
            {nome: "Suco de Laranja", descricao: "Suco natural de laranja", preco: 4.0},
        ],
    },
    {
        id: "categoria-2",
        nome: "Lanches",
        itens: [
            {nome: "Hambúrguer", descricao: "Hambúrguer simples", preco: 8.0},
            {nome: "Sanduíche", descricao: "Sanduíche de frango", preco: 6.5},
            {nome: "Batata Frita", descricao: "Porção de batata frita", preco: 5.0},
        ],
    },
    {
        id: "categoria-3",
        nome: "Batatas",
        itens: [
            {nome: "Batata Assada", descricao: "Batata assada com ervas", preco: 7.0},
            {nome: "Batata Frita", descricao: "Porção de batata frita", preco: 5.0},
            {nome: "Batata Rústica", descricao: "Batata rústica temperada", preco: 6.0},
        ],
    },
];

export default function Admin() {
    const [categorias, setCategorias] = useState(Categorias);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [expandedCategoria, setExpandedCategoria] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        categoria: Categoria,
        index: number
    ) => {
        setDraggedIndex(index);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/html", "");
    };

    const handleDragEnter = (index: number) => {
        setDragOverIndex(index);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragLeave = () => {
        // Se desejar adicionar lógica específica ao sair do card, pode ser feito aqui
    };

    const handleDragEnd = () => {
        if (dragOverIndex !== null && draggedIndex !== null) {
            const updatedCategorias = [...categorias];
            const [removed] = updatedCategorias.splice(draggedIndex, 1);
            updatedCategorias.splice(dragOverIndex, 0, removed);

            setCategorias(updatedCategorias);
            setDraggedIndex(null);
            setDragOverIndex(null);
        }
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleToggleCategoria = (categoriaId: string) => {
        setExpandedCategoria((prev) => (prev === categoriaId ? null : categoriaId));
    };

    const handleMoveUp = (index: number) => {
        if (index > 0) {
            const updatedCategorias = [...categorias];
            const temp = updatedCategorias[index];
            updatedCategorias[index] = updatedCategorias[index - 1];
            updatedCategorias[index - 1] = temp;

            setCategorias(updatedCategorias);
        }
    };

    const handleMoveDown = (index: number) => {
        if (index < categorias.length - 1) {
            const updatedCategorias = [...categorias];
            const temp = updatedCategorias[index];
            updatedCategorias[index] = updatedCategorias[index + 1];
            updatedCategorias[index + 1] = temp;

            setCategorias(updatedCategorias);
        }
    };

    const filteredCategorias = categorias.filter((categoria) =>
        categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                    <div>
                                        {filteredCategorias.map((categoria, index) => (
                                            <CategoriaCard
                                                key={categoria.id}
                                                categoria={categoria}
                                                index={index}
                                                onDragStart={handleDragStart}
                                                onDragEnter={handleDragEnter}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDragEnd={handleDragEnd}
                                                onToggleCategoria={handleToggleCategoria}
                                                onMoveUp={() => handleMoveUp(index)}
                                                onMoveDown={() => handleMoveDown(index)}
                                                expandedCategoria={expandedCategoria}
                                            />
                                        ))}
                                    </div>
                                </Container>
                            </Card.Body></Card>
                    </Tab>
                    <Tab eventKey="images" title="Imagens do cardápio">
                        {/* Conteúdo da guia de imagens do cardápio */}
                        <Card className="border-top-0 rounded-top-0">
                            <Card.Body>
                                {/* Content for the "Mesas" tab */}
                            </Card.Body>
                        </Card>
                    </Tab>
                    <Tab eventKey="list" title="Lista de produtos">
                        {/* Conteúdo da guia de lista de produtos */}
                        <Card className="border-top-0 rounded-top-0">
                            <Card.Body>
                                {/* Content for the "Mesas" tab */}
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>

            </Container>

            {/* Modal para adicionar uma nova categoria */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Adicione os campos do formulário para a nova categoria, se necessário */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            // Adicione a lógica para adicionar uma nova categoria aqui
                            setShowModal(false);
                        }}
                    >
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
