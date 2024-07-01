import {Card} from "react-bootstrap";
import AppIcon from "@/components/app/AppIcon";
import {faClock, faMapMarker} from "@fortawesome/free-solid-svg-icons";
import {faMoneyBill} from "@fortawesome/free-solid-svg-icons/faMoneyBill";
import AppButton from "@/components/app/AppButton";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import React, {useState} from "react";
import {Prisma} from "@/core/types/prisma";
import {useOrder} from "@/core/hooks/useOrder";
import {OrderStatus} from ".prisma/client";

export default function OrderDetail({order, setOrders}: {
    order: Prisma.Order,
    setOrders: () => void
}) {

    const orderStore = useOrder();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const moveOrder = async function () {
        let newStatus;
        if (order.status === OrderStatus.WAITING) {
            newStatus = OrderStatus.PREPARING;
        } else if (order.status === OrderStatus.PREPARING) {
            newStatus = OrderStatus.READY;
        } else if (order.status === OrderStatus.READY) {
            newStatus = OrderStatus.DONE;
        } else {
            return;
        }

        setIsLoading(true);
        await orderStore.update(order.id, {
            status: newStatus
        });

        await orderStore.findAll().then(setOrders);
        setIsLoading(false);
    };

    return <>
        <Card className={"mb-3"}>
            <Card.Body>
                <div>
                    <Card.Title>{`#${order.id}`} <small>{order.user?.name}</small></Card.Title>
                </div>
                <div>
                    <small><AppIcon icon={faClock} className="mr-1"/> 19:30 PM</small>
                </div>
                <Card.Text className="mt-3 d-flex justify-content-between">
                    <div>
                        <AppIcon icon={faMoneyBill}/>
                        <span className={"ms-1"}>{order.storeDeliveryMethod?.deliveryMethod?.name}</span>
                    </div>
                    <strong>R$ 25,00</strong>
                </Card.Text>
                <Card.Text>
                    <AppIcon icon={faMapMarker} className="mr-1"/>
                    <span className={"ms-1"}>{order.storePaymentMethod?.paymentMethod?.name}</span>
                </Card.Text>
                <AppButton
                    variant="primary"
                    onClick={moveOrder}
                    isLoading={isLoading}
                >
                    Mover <AppIcon icon={faArrowRight}/>
                </AppButton>
            </Card.Body>
        </Card>
    </>;
}