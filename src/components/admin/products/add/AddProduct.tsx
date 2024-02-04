"use client";

import React, {useEffect, useRef, useState} from "react";
import {Button, Card, Col, Container, Form, ProgressBar, Row} from "react-bootstrap";
import AppIcon from "@/components/app/AppIcon";
import {faHeart, faUtensils} from "@fortawesome/free-solid-svg-icons";
import {useCategory} from "@/core/hooks/useCategory";
import {Prisma} from "@/core/types/prisma";
import {SubmitHandler, useForm} from "react-hook-form";
import {AddProductInputs, AddProductInputsSchema} from "@/core/types/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {formatFileSize} from "@/core/functions";

export default function AddProduct() {
    const categoryState = useCategory();

    const [step, setStep] = useState(1);
    const [categories, setCategories] = useState<Prisma.Category[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [fileErrors, setFileErrors] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = function () {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        },
        setError
    } = useForm<AddProductInputs>({
        resolver: zodResolver(AddProductInputsSchema),
    });

    const validateImageResolution = function (file: File): Promise<string[]> {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const image = new Image();
                image.src = event.target?.result as string;

                image.onload = () => {
                    const resolutionErrors: string[] = [];

                    if (image.width < 200 || image.height < 200) {
                        resolutionErrors.push("Minimum image resolution should be 200x200 pixels.");
                    }

                    resolve(resolutionErrors);
                };
            };

            reader.readAsDataURL(file);
        });
    };

    const validateFile = async function (file: File): Promise<string[]> {
        const errors: string[] = [];

        // Check file extension
        const acceptedFormats = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
        if (!acceptedFormats.includes(file.type)) {
            errors.push("Please select a file in .jpg, .png, .jpeg, or .webp format.");
        }

        // Check file size
        const maxSize = 1024 * 1024; // 1MB in bytes

        if (file.size > maxSize) {
            errors.push("File size exceeds the maximum limit of 1MB.");
        }

        // Check file resolution
        const imageResolutionErrors = await validateImageResolution(file);
        errors.push(...imageResolutionErrors);

        return errors;
    };


    const handleFileSelection = async function (e: React.ChangeEvent<HTMLInputElement>) {
        setFileErrors([]);
        setIsDragging(false);

        if (e.target.files && e.target.files.length > 0) {

            let file = e.target.files[0];
            const errors = await validateFile(file);

            if (errors.length === 0) {
                setSelectedFile(file);
            } else {
                setFileErrors(errors);
            }
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();

        setFileErrors([]);
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        const errors = await validateFile(droppedFile);

        if (errors.length === 0) {
            setSelectedFile(droppedFile);
        } else {
            setFileErrors(errors);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();

        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();

        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
        }
    };

    const onSubmit: SubmitHandler<AddProductInputs> = async function (data) {
        try {

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', String(data.price));
            formData.append('category_id', String(data.category_id));

            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            const response = await fetch('/api/product', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();

                console.log(responseData);
            } else {
                const errorData = await response.json();

                if (errorData?.error?.issues) {
                    const {issues} = errorData.error;

                    issues.forEach((issue: { path: any[]; message: any; }) => {
                        const field = issue.path[0];
                        const errorMessage = issue.message;

                        setError(field, {
                            type: 'custom',
                            message: errorMessage,
                        });
                    });
                }
            }
        } catch (error) {
            console.error('Error adding a product:', error);
        }
    };

    useEffect(() => {
        if (categories.length === 0) {
            categoryState.findAll().then((p: Prisma.Category[]) => {
                setCategories(p);
            });
        }
    }, [categories.length, categoryState]);

    return (
        <Container>
            <Card className="mt-3" style={{marginBottom: "100px"}}>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>

                    <Card.Header>
                        <h2 className="mt-2">Adicionar produto</h2>
                    </Card.Header>
                    <Card.Body>
                        <ProgressBar now={step * 25}/>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <div className={`text-center col-md-3`}>
                                <AppIcon icon={faHeart} size="1x"/>
                                <p className="m-0"><small>Item</small></p>
                            </div>
                            <div className={`text-center col-md-3`}>
                                <AppIcon icon={faHeart} size="1x"/>
                                <p className="m-0"><small>Adicionais</small></p>
                            </div>
                            <div className={`text-center col-md-3`}>
                                <AppIcon icon={faHeart} size="1x"/>
                                <p className="m-0"><small>Classificações</small></p>
                            </div>
                            <div className={`text-center col-md-3`}>
                                <AppIcon icon={faHeart} size="1x"/>
                                <p className="m-0"><small>Disponibilidade</small></p>
                            </div>
                        </div>

                        <Row className="mt-5">
                            <Col md={5}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Control
                                        as="select"
                                        aria-label="Categoria do produto"
                                        aria-describedby="category_id"
                                        aria-invalid={errors.category_id ? "true" : "false"}
                                        {...register("category_id", {required: true})}
                                        isInvalid={!!errors.category_id}
                                    >
                                        <option value="">Selecione uma categoria</option>
                                        {categories.map((category: Prisma.Category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.category_id?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome do produto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Informe o nome"
                                        aria-label="Nome do produto"
                                        aria-describedby="name"
                                        aria-invalid={errors.name ? "true" : "false"}
                                        {...register("name", {required: true})}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descrição do produto</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Ex: Pão brioche com fatias crocantes de bacon e queijo mussarela"
                                        aria-label="Descrição do produto"
                                        aria-describedby="description"
                                        aria-invalid={errors.description ? "true" : "false"}
                                        {...register("description", {required: true})}
                                        isInvalid={!!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preço do produto</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Informe preço"
                                        aria-label="Preço do produto"
                                        aria-describedby="price"
                                        aria-invalid={errors.price ? "true" : "false"}
                                        {...register("price", {required: true})}
                                        isInvalid={!!errors.price}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
                                <div
                                    onClick={handleFileSelect}
                                    onDrop={handleDrop}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDragOver={handleDragOver}
                                    style={{
                                        border: isDragging ? "2px solid #000" : "2px dashed #ddd",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        textAlign: "center",
                                        fontSize: "1.5em",
                                        cursor: "pointer"
                                    }}
                                >
                                    <AppIcon icon={faUtensils} size="3x" style={{marginBottom: "10px"}}/>
                                    <p>Escolha a foto <br/><small>Clique aqui ou arraste uma foto</small></p>
                                </div>
                                <div style={{textAlign: "center"}}>
                                    <small>Formatos: .jpg, .png, .jpeg, .webp <br/> Peso máximo: 1mb <br/> Resolução mínima: 200px</small>
                                </div>

                                {fileErrors.length > 0 ? (
                                    <div className={"mt-4"}>
                                        <h4>Arquivo inválido:</h4>
                                        <ul>
                                            {fileErrors.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : selectedFile && (
                                    <div className={"mt-4"}>
                                        <h4>File Uploaded:</h4>
                                        <p>Name: {selectedFile.name}</p>
                                        <p>Size: {formatFileSize(selectedFile.size)}</p>
                                        <p>Type: {selectedFile.type}</p>
                                        <p>Last Modified: {(new Date(selectedFile.lastModified)).toLocaleString()}</p>
                                    </div>
                                )}
                            </Col>
                        </Row>

                        <div className="fixed-bottom bg-white p-3 d-flex justify-content-center">
                            <Button type={"submit"} variant="success" size="lg" className="w-100 mx-2">
                                Concluir
                            </Button>
                        </div>
                    </Card.Body>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{display: "none"}}
                        onChange={handleFileSelection}
                    />
                </Form>
            </Card>
        </Container>
    );
}
