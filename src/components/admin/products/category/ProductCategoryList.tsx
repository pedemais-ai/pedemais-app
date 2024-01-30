import {Button, Card, Collapse} from "react-bootstrap";
import AppIcon from "@/components/app/AppIcon";
import {faArrowDown, faArrowUp, faCaretUp, faGripVertical, faPlus} from "@fortawesome/free-solid-svg-icons";
import AppButton from "@/components/app/AppButton";
import React from "react";

export default function ProductCategoryList() {
    return (<>
        <Card>
            <Card.Body>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <AppIcon icon={faGripVertical} className="me-2"/>
                        <span className="fs-4">AAAAAA</span>
                        <Button variant="link">
                            <AppIcon icon={faCaretUp}/>
                        </Button>
                    </div>
                    <div>
                        <AppButton variant="link">
                            <AppIcon icon={faArrowUp}/>
                        </AppButton>
                        <AppButton variant="link">
                            <AppIcon icon={faArrowDown}/>
                        </AppButton>
                    </div>
                </div>
                <Collapse in={true}>
                    <div>
                        <ul>
                            <li>BBB</li>
                            <li>BBB</li>
                            <li>BBB</li>
                            <li>BBB</li>
                        </ul>
                    </div>
                </Collapse>
                <Card.Link href="products/add">
                    <AppIcon icon={faPlus} className="me-2"/>
                    Adicionar Item
                </Card.Link>
            </Card.Body>
        </Card>
    </>);
}