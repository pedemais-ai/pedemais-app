"use client";

import React, {useState} from "react";
import {Card, Container, Form, ProgressBar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faList, faStar, faUtensils} from "@fortawesome/free-solid-svg-icons";

const ProductsAdd: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [passo, setPasso] = useState(1);

  const passos = [
    { numero: 1, nome: "Item" },
    { numero: 2, nome: "Adicionais" },
    { numero: 3, nome: "Classificações" },
    { numero: 4, nome: "Disponibilidade" },
  ];

  const handleAvancar = () => {
    if (passo < 4) {
      setPasso(passo + 1);
    }
  };

  const handleVoltar = () => {
    if (passo > 1) {
      setPasso(passo - 1);
    }
  };

  const getIcon = (step: number) => {
    switch (step) {
      case 1:
        return faUtensils;
      case 2:
        return faList;
      case 3:
        return faStar;
      case 4:
        return faClock;
      default:
        return faUtensils;
    }
  };

  return (
    <Container>
      <Card className="mt-3" style={{ marginBottom: "100px" }}>
        <Card.Header>
          <h2 className="mt-2">Adicionar produto</h2>
        </Card.Header>
        <Card.Body>
          <ProgressBar now={passo * 25} />

          <div className="d-flex justify-content-between align-items-center mt-4">
            {passos.map((item) => (
              <div key={item.numero} className={`text-center ${item.numero <= passo ? "text-success" : ""} col-md-3`}>
                <FontAwesomeIcon icon={getIcon(item.numero)} size="1x" />
                <p className="m-0"><small>{item.nome}</small></p>
              </div>
            ))}
          </div>

          {passo === 1 && (
            <div className="row mt-5">
              <div className="col-md-6">
                <Form>
                  <Form.Group controlId="formCategoria">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Categoria1">Categoria1</option>
                      <option value="Categoria2">Categoria2</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Ex: Pizza 4 Queijos, X-Bacon, Batata com Cheddar, etc" />
                  </Form.Group>
                  <Form.Group controlId="formDescricao">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Ex: Pão brioche com fatias crocantes de bacon e queijo mussarela"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPreco">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Preço do item"
                      value={preco}
                      onChange={(e) => setPreco(Number(e.target.value))}
                    />
                  </Form.Group>
                </Form>
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                <div
                  style={{
                    border: "2px dashed #ddd",
                    borderRadius: "5px",
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "1.5em",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUtensils}
                    size="3x"
                    style={{ marginBottom: "10px" }}
                  />
                  <p>
                    Escolha a foto <br />
                    <small>
                      Clique aqui ou arraste uma foto
                    </small>
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <small>
                    Formatos: .jpg, .png, .jpeg, .webp <br />
                    Peso máximo: 1mb <br />
                    Resolução mínima: 200px
                  </small>
                </div>
              </div>
            </div>
          )}

          <div className="fixed-bottom bg-white p-3 d-flex justify-content-center">
            <div className="row w-100 justify-content-center">
              <div className="col-6 col-md-3 d-md-flex">
                {passo > 1 && (
                  <button className="btn btn-secondary btn-lg w-100" onClick={handleVoltar}>
                    Voltar
                  </button>
                )}
              </div>
              <div className="col-6 col-md-3 text-end">
                {passo < 4 && (
                  <button className="btn btn-primary btn-lg w-100" onClick={handleAvancar}>
                    Avançar
                  </button>
                )}
                {passo === 4 && (
                  <button className="btn btn-success btn-lg w-100">
                    Concluir
                  </button>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductsAdd;
