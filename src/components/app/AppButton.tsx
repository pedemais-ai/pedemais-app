import React from "react";
import {Button} from "react-bootstrap";
import {ButtonVariant} from "react-bootstrap/types";
import AppSpinner from "@/components/app/AppSpinner";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
    active?: boolean;
    variant?: ButtonVariant;
    size?: 'sm' | 'lg';
    isLoading?: boolean;
    href?: string;
};

export default function AppButton(props: Props) {

    const {
        children,
        isLoading,
        disabled,
        ...buttonProps
    } = props;

    return (
        <>
            <Button {...buttonProps} disabled={disabled ? disabled : isLoading}>
                {isLoading ? <AppSpinner size={"sm"}/> : children}
            </Button>
        </>
    );
};
