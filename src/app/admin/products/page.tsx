// AdminProducts.tsx
/* eslint-disable @next/next/no-async-client-component */
"use client";

import React, { useState } from "react";
import { Container, Tab, Tabs, Dropdown, FormControl, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons";
import CategoriaCard from "@/components/admin/manage/CategoriaCard";

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
      { nome: "Coca Cola", descricao: "Refrigerante de cola", preco: 3.5 },
      { nome: "Pepsi", descricao: "Refrigerante de cola", preco: 3.0 },
      { nome: "Suco de Laranja", descricao: "Suco natural de laranja", preco: 4.0 },
    ],
  },
  {
    id: "categoria-2",
    nome: "Lanches",
    itens: [
      { nome: "Hambúrguer", descricao: "Hambúrguer simples", preco: 8.0 },
      { nome: "Sanduíche", descricao: "Sanduíche de frango", preco: 6.5 },
      { nome: "Batata Frita", descricao: "Porção de batata frita", preco: 5.0 },
    ],
  },
  {
    id: "categoria-3",
    nome: "Batatas",
    itens: [
      { nome: "Batata Assada", descricao: "Batata assada com ervas", preco: 7.0 },
      { nome: "Batata Frita", descricao: "Porção de batata frita", preco: 5.0 },
      { nome: "Batata Rústica", descricao: "Batata rústica temperada", preco: 6.0 },
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

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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

  const filteredCategorias = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleCategoria = (categoriaId: string) => {
    setExpandedCategoria((prev) => (prev === categoriaId ? null : categoriaId));
  };

  return (
    <>
      <Container fluid>
        <Tabs defaultActiveKey="manage" className="mb-3">
          <Tab eventKey="manage" title="Gestor">
            <Container>
              <div className="d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <FormControl
                    type="text"
                    placeholder="Buscar categoria"
                    onChange={handleSearch}
                    value={searchTerm}
                  />
                  <FontAwesomeIcon icon={faSearch} className="ms-2" />
                </div>

                <div className="d-flex">
                  <Dropdown className="ms-auto">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      <FontAwesomeIcon icon={faEllipsisV} />
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
                    onDragEnd={handleDragEnd}
                    onToggleCategoria={handleToggleCategoria}
                    expandedCategoria={expandedCategoria}
                  />
                ))}
              </div>
            </Container>
          </Tab>
          <Tab eventKey="images" title="Imagens do cardápio">
            {/* Conteúdo da guia de imagens do cardápio */}
          </Tab>
          <Tab eventKey="list" title="Lista de produtos">
            {/* Conteúdo da guia de lista de produtos */}
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
