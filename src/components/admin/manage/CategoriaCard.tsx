// components/admin/manage/CategoriaCard.tsx
import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faPlus,
  faCaretDown,
  faArrowUp,
  faArrowDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

interface CategoriaCardProps {
  categoria: {
    id: string;
    nome: string;
    itens: { nome: string; descricao: string; preco: number }[];
  };
  index: number;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    categoria: {
      id: string;
      nome: string;
      itens: { nome: string; descricao: string; preco: number }[];
    },
    index: number
  ) => void;
  onDragEnter: (index: number) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDragEnd: () => void;
  onToggleCategoria: (categoriaId: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  expandedCategoria: string | null;
}

const CategoriaCard: React.FC<CategoriaCardProps> = ({
  categoria,
  index,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDragEnd,
  onToggleCategoria,
  onMoveUp,
  onMoveDown,
  expandedCategoria,
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [passo, setPasso] = useState(1);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    onDragStart(event, categoria, index);
  };

  const handleDragEnter = () => {
    setIsDraggingOver(true);
    onDragEnter(index);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    onDragOver(event);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
    onDragLeave();
  };

  const handleDragEnd = () => {
    setIsDraggingOver(false);
    setIsDragging(false);
    onDragEnd();
  };

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

  const isDraggingStyle = isDragging
    ? "rgba(0,123,255,0.25)"
    : "";

  return (
    <div
      key={categoria.id}
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      style={{
        marginBottom: "1rem",
        width: "100%",
        cursor: "grab",
        transition:
          "background-color 0.3s, transform 0.3s, box-shadow 0.3s",
        backgroundColor: isDraggingOver
          ? "rgba(0,123,255,0.1)"
          : "",
        transform: isDragging
          ? "scale(1.05)"
          : "scale(1)",
        boxShadow: isDraggingOver
          ? "0px 0px 10px rgba(0,123,255,0.5)"
          : isDragging
          ? "0px 0px 10px rgba(0,123,255,0.5)"
          : "none",
        position: "relative",
      }}
    >
<Card>
  <Card.Body>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", // Adicionado para alinhar verticalmente os itens
      }}
    >
      <div className="d-flex justify-content-between align-items-center"> {/* Adicionado align-items-center */}
        <FontAwesomeIcon
          icon={faGripVertical}
          className="me-2"
        />
        <span className="fs-4">{categoria.nome}</span>
        <Button
          variant="link"
          onClick={() => onToggleCategoria(categoria.id)}
          style={{ visibility: "visible" }}
        >
          <FontAwesomeIcon
            icon={
              expandedCategoria === categoria.id
                ? faCaretUp
                : faCaretDown
            }
          />
        </Button>
      </div>
      <div>
        <Button
          variant="link"
          onClick={() => onMoveUp(index)}
          style={{ visibility: "visible" }}
          disabled={index === 0}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
        <Button
          variant="link"
          onClick={() => onMoveDown(index)}
          style={{ visibility: "visible" }}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </Button>
      </div>
    </div>
    <Collapse in={expandedCategoria === categoria.id}>
      <div>
        <ul>
          {categoria.itens.map((item, itemIndex) => (
            <li key={itemIndex}>
              {item.nome} - {item.descricao} - R${" "}
              {item.preco.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </Collapse>
    <Card.Link href="products/add">
      <FontAwesomeIcon icon={faPlus} className="me-2" />
      Adicionar Item
    </Card.Link>
  </Card.Body>
</Card>


      {/* Botão "Avançar" flutuante fora do modal */}
      {showModal && (
        <Button
          variant="primary"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
          onClick={handleAvancar}
        >
          Avançar
        </Button>
      )}
    </div>
  );
};

export default CategoriaCard;
