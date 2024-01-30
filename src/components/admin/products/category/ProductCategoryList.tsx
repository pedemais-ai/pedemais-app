import React, {useState} from 'react';
import {Button, Card, Collapse, OverlayTrigger, Tooltip} from 'react-bootstrap';
import AppIcon from '@/components/app/AppIcon';
import {faArrowDown, faArrowUp, faCaretDown, faCaretUp, faEdit, faGripVertical, faPlus} from '@fortawesome/free-solid-svg-icons';
import AppButton from '@/components/app/AppButton';
import {Prisma} from '@/core/types/prisma';

export default function ProductCategoryList({categories, searchTerm}: {
    categories?: Prisma.Category[],
    searchTerm: string
}) {
    const [collapsedCategories, setCollapsedCategories] = useState<Record<number, boolean>>({});

    const toggleCategoryCollapse = (categoryId: number) => {
        setCollapsedCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    const filteredCategories = categories?.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {filteredCategories?.map((category: Prisma.Category) => (
                <Card className="mb-2" key={category.id}>
                    <Card.Body>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div className="d-flex justify-content-between align-items-center">
                                <AppIcon icon={faGripVertical} className="me-2"/>
                                <span className="fs-4">{category.name}</span>
                                <Button variant="link" onClick={() => toggleCategoryCollapse(category.id)}>
                                    <AppIcon icon={collapsedCategories[category.id] ? faCaretUp : faCaretDown}/>
                                </Button>
                            </div>
                            <div>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={<Tooltip id={`moveUp${category.id}`}>Mover para cima</Tooltip>}
                                >
                                    <AppButton variant="link">
                                        <AppIcon icon={faArrowUp}/>
                                    </AppButton>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={<Tooltip id={`moveDown${category.id}`}>Mover para baixo</Tooltip>}
                                >
                                    <AppButton variant="link">
                                        <AppIcon icon={faArrowDown}/>
                                    </AppButton>
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
                        <Card.Link href="products/add" className={"font-size-14"}>
                            <AppIcon icon={faEdit} className="me-2"/>
                            Atualizar
                        </Card.Link>
                        <Card.Link href="products/add" className={"font-size-14"}>
                            <AppIcon icon={faPlus} className="me-2"/>
                            Adicionar Item
                        </Card.Link>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}
