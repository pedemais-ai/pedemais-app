import React from "react";
import {Variant} from "react-bootstrap/types";
import {Spinner} from "react-bootstrap";

export default function AppSpinner(props: {
    animation?: 'border' | 'grow';
    size?: 'sm';
    variant?: Variant;
}) {
    return (
        <>
            <Spinner
                as="span"
                role="status"
                aria-hidden="true"
                {...props}
            />
        </>
    );
};