"use client";

import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddCategoryInputs, AddCategoryInputsSchema} from "@/components/admin/products/category/types";
import {Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import AppButton from "@/components/app/AppButton";

interface AppModalProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const AddCategoryForm: React.FC<AppModalProps> = (
    {
        show,
        setShow,
    }) => {

    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        },
        setError
    } = useForm<AddCategoryInputs>({
        resolver: zodResolver(AddCategoryInputsSchema),
    });

    const onSubmit: SubmitHandler<AddCategoryInputs> = async function (data) {
        try {
            const response = await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();

                console.log(responseData);

                setShow(false);
                setShowSuccessToast(true);
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
            console.error('Error adding a category:', error);
        }
    };

    return (
        <>
            <ToastContainer
                position={"top-end"}
                className="p-3"
            >
                <Toast
                    bg={"success"}
                    onClose={() => setShowSuccessToast(false)}
                    show={showSuccessToast}
                    delay={5000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Sucesso</strong>
                    </Toast.Header>
                    <Toast.Body>Categoria adicionada com sucesso</Toast.Body>
                </Toast>
            </ToastContainer>

            <Modal show={show} onHide={() => setShow(false)}>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nova categoria</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome da categoria</Form.Label>
                            <Form.Control
                                size={"lg"}
                                type="text"
                                placeholder="Informe o nome"
                                aria-label="Nome da categoria"
                                aria-describedby="name"
                                aria-invalid={errors.name ? "true" : "false"}
                                {...register("name", {required: true})}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <AppButton variant="secondary" onClick={() => setShow(false)}>
                            Fechar
                        </AppButton>
                        <AppButton variant="primary" type={"submit"}>
                            Salvar
                        </AppButton>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>
    );
}

export default AddCategoryForm;