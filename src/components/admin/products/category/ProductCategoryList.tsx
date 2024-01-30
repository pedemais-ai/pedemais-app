import React, {useState} from 'react';
import {Button, Card, Collapse, OverlayTrigger, Toast, ToastContainer, Tooltip} from 'react-bootstrap';
import {faArrowDown, faArrowUp, faBan, faCaretDown, faCaretUp, faCheck, faEdit, faGripVertical, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useCategory} from "@/core/hooks/useCategory";
import {Prisma} from '@/core/types/prisma';
import {OverlayInjectedProps} from "react-bootstrap/Overlay";
import AppSpinner from "@/components/app/AppSpinner";
import AppIcon from '@/components/app/AppIcon';

export default function ProductCategoryList({categories, searchTerm}: {
    categories?: Prisma.Category[],
    searchTerm: string
}) {
    const categoryState = useCategory();

    const [collapsedCategories, setCollapsedCategories] = useState<Record<number, boolean>>({});
    const [buttonDisabled, setButtonDisabled] = useState<Record<number, boolean>>({});
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastSuccessText, setToastSuccessText] = useState('');

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
                                <ul>
                                    {category.products?.map((product: Prisma.Product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </Collapse>
                        <Button variant={"link"} className={"font-size-14"}>
                            <AppIcon icon={faEdit} className="me-2"/>
                            Atualizar
                        </Button>
                        <Card.Link href="#" className={"font-size-14"}>
                            <AppIcon icon={faPlus} className="me-2"/>
                            Adicionar Item
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
        </>
    );
}
