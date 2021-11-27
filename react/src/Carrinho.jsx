import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Api from "./Api";

function Carrinho(props) {
    const { id } = useParams(props);
    const [quantidade, setQuantidade] = useState(0);
    const [pedido, setPedido] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

        function resposta(res) {
            console.log(res.data, id);
        }

        let novo =
        {
            quantidade: "5",
            pedido: {
                id: 5
            },
            produto: {
                id: id
            }
        };

        Api.post("/pedidosItem", novo).then(resposta);
    };

    return (
        <>
            <Form className="App-header" onSubmit={handleSubmit}>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                            Name
                        </Form.Label>
                        <Form.Control
                            type="number"
                            className="mb-2"
                            id="inlineFormInput"
                            placeholder="Quantidade"
                            value={quantidade}
                            onChange={(event) =>
                                setQuantidade(event.target.value, console.log(quantidade))
                            }
                        />
                    </Col>
                    <Col xs="auto">
                        <button type="submit" className="mb-2">
                            Adicionar ao carrinho
                        </button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Carrinho;