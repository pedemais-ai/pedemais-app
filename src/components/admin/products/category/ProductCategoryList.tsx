import React, {useState} from 'react';
import {Button, Card, Collapse, Form, OverlayTrigger, Stack, Toast, ToastContainer, Tooltip} from 'react-bootstrap';
import {faArrowDown, faArrowUp, faBan, faCalendar, faCaretDown, faCaretUp, faCheck, faClone, faEdit, faFeather, faGripVertical, faLink, faPlus, faPlusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useCategory} from "@/core/hooks/useCategory";
import {Prisma} from '@/core/types/prisma';
import {OverlayInjectedProps} from "react-bootstrap/Overlay";
import AppSpinner from "@/components/app/AppSpinner";
import AppIcon from '@/components/app/AppIcon';
import UpdateCategoryForm from "@/components/admin/products/category/UpdateCategoryForm";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "next/image";
import slugify from "slugify";

export default function ProductCategoryList({categories, searchTerm}: {
    categories?: Prisma.Category[],
    searchTerm: string
}) {
    const categoryState = useCategory();

    const [collapsedCategories, setCollapsedCategories] = useState<Record<number, boolean>>({});
    const [buttonDisabled, setButtonDisabled] = useState<Record<number, boolean>>({});
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastSuccessText, setToastSuccessText] = useState('');
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [category, setCategory] = useState<Prisma.Category>();

    const toggleCategoryCollapse = (categoryId: number) => {
        setCollapsedCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    const filteredCategories = categories?.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const enableCategory = async (id: number) => {
        try {
            setButtonDisabled(prevState => ({
                ...prevState,
                [id]: true
            }));

            await categoryState.update(id, {
                is_active: true
            })

            setToastSuccessText('Categoria ativada com sucesso');
            setShowSuccessToast(true);

            console.log(`Category ${id} enabled.`);
        } catch (error) {
            console.log(`Error setting category ${id} enabled.`, error);
        } finally {
            setButtonDisabled(prevState => ({
                ...prevState,
                [id]: false
            }));
        }
    };

    const disableCategory = async (id: number) => {
        try {
            setButtonDisabled(prevState => ({
                ...prevState,
                [id]: true
            }));

            await categoryState.update(id, {
                is_active: false
            })

            setToastSuccessText('Categoria desativada com sucesso');
            setShowSuccessToast(true);

            console.log(`Category ${id} disabled.`);
        } catch (error) {
            console.log(`Error setting category ${id} disabled.`, error);
        } finally {
            setButtonDisabled(prevState => ({
                ...prevState,
                [id]: false
            }));
        }
    };

    return (
        <>
            {filteredCategories?.map((category: Prisma.Category) => (
                <Card className="mb-2" key={category.id}>
                    <Card.Body>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div className="d-flex justify-content-between align-items-center">
                                <AppIcon icon={faGripVertical} className="me-2"/>
                                <span className="fs-6">{category.name}</span>
                                <span className="ms-1 fs-6">({category.products?.length})</span>
                                <Button variant="link" onClick={() => toggleCategoryCollapse(category.id)}>
                                    <AppIcon icon={collapsedCategories[category.id] ? faCaretUp : faCaretDown}/>
                                </Button>
                            </div>
                            <div>
                                {category.is_active ? <>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={(props: OverlayInjectedProps) => (
                                            <Tooltip id={`disableCategory${category.id}`} {...props}>Desativar categoria</Tooltip>
                                        )}
                                    >
                                        <Button
                                            variant="link"
                                            className={"text-danger"}
                                            disabled={buttonDisabled[category.id]}
                                            onClick={async () => await disableCategory(category.id)}
                                        >
                                            {buttonDisabled[category.id] ? <AppSpinner size={"sm"}/> : <AppIcon icon={faBan}/>}
                                        </Button>
                                    </OverlayTrigger>
                                </> : <>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={(props: OverlayInjectedProps) => (
                                            <Tooltip id={`enableCategory${category.id}`} {...props}>Ativar categoria</Tooltip>
                                        )}
                                    >
                                        <Button
                                            variant="link"
                                            className={"text-success"}
                                            disabled={buttonDisabled[category.id]}
                                            onClick={async () => await enableCategory(category.id)}
                                        >
                                            {buttonDisabled[category.id] ? <AppSpinner size={"sm"}/> : <AppIcon icon={faCheck}/>}
                                        </Button>
                                    </OverlayTrigger>
                                </>}
                                <OverlayTrigger
                                    placement="top"
                                    overlay={(props: OverlayInjectedProps) => (
                                        <Tooltip id={`moveUp${category.id}`} {...props}>Mover para cima</Tooltip>
                                    )}
                                >
                                    <Button variant="link">
                                        <AppIcon icon={faArrowUp}/>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={(props: OverlayInjectedProps) => (
                                        <Tooltip id={`moveDown${category.id}`} {...props}>Mover para baixo</Tooltip>
                                    )}
                                >
                                    <Button variant="link">
                                        <AppIcon icon={faArrowDown}/>
                                    </Button>
                                </OverlayTrigger>
                            </div>
                        </div>
                        <Collapse in={collapsedCategories[category.id]}>
                            <div>
                                {category.products?.map((product: Prisma.Product) => (
                                    <Stack className={"mb-1"} direction="horizontal" gap={3} key={product.id}>
                                        <div>
                                            <Image
                                                src={product?.images?.[0]?.path || ''}
                                                alt={slugify(product.name).toLowerCase()}
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <div className="pe-2">{product.name}</div>
                                        <div className="pe-2 ms-auto">
                                            R$9,99
                                            <AppIcon className={"ms-2"} icon={faEdit}/>
                                        </div>
                                        <div className="pe-2">
                                            <Form.Check
                                                type="switch"
                                                label="Esgotar"
                                            />
                                        </div>
                                        <div className="pe-2">
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    variant="outline-secondary"
                                                    size={"sm"}
                                                >
                                                    Ações
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">
                                                        <AppIcon className={"me-1"} icon={faEdit}/>
                                                        Editar
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">
                                                        <AppIcon className={"me-1"} icon={faClone}/>
                                                        Duplicar
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">
                                                        <AppIcon className={"me-1"} icon={faLink}/>
                                                        Copiar link
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">
                                                        <AppIcon className={"me-1"} icon={faPlusCircle}/>
                                                        Editar adicionais
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">
                                                        <AppIcon className={"me-1"} icon={faFeather}/>
                                                        Editar classificações
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">
                                                        <AppIcon className={"me-1"} icon={faCalendar}/>
                                                        Editar disponibilidade
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">
                                                        <AppIcon className={"me-1"} icon={faTrash}/>
                                                        Excluir
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Stack>
                                ))}
                                <hr/>
                            </div>
                        </Collapse>
                        <Button
                            variant={"link"}
                            className={"font-size-14"}
                            onClick={() => {
                                setCategory(category);
                                setShowModalUpdate(true);
                            }}
                        >
                            <AppIcon icon={faEdit} className="me-2"/>
                            Atualizar
                        </Button>
                        <Card.Link href="#" className={"font-size-14"}>
                            <AppIcon icon={faPlus} className="me-2"/>
                            Adicionar produto
                        </Card.Link>
                    </Card.Body>
                </Card>
            ))}

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
                    <Toast.Body>{toastSuccessText}</Toast.Body>
                </Toast>
            </ToastContainer>

            <UpdateCategoryForm
                show={showModalUpdate}
                setShow={setShowModalUpdate}
                category={category}
            />
        </>
    );
}
