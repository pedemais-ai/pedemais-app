import {Container, Row, Table} from "react-bootstrap";

export default async function AdminProducts() {

    return (
        <>
            <Container fluid>
                <Row>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            {Array.from({length: 8}).map((_, index) => (
                                <th key={index}>Table heading</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            {Array.from({length: 8}).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>2</td>
                            {Array.from({length: 8}).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>3</td>
                            {Array.from({length: 8}).map((_, index) => (
                                <td key={index}>Table cell {index}</td>
                            ))}
                        </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}
