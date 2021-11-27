import React from "react";
import { useParams } from "react-router";
import Api from "./Api";
import { Link } from 'react-router-dom'
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

export default (props) => {
    const { id } = useParams();
    const [produto, setProduto] = React.useState({});

    Api.get(`/produtos/${id}`).then(exibir);

    function exibir(response) {
        setProduto(response.data);
    }

    function comprar() {
        function adicionarPedidoItem(idLista) {
            Api.post('/pedidosItem', {
                "pedido": {
                    "id": idLista
                },
                "produto": {
                    "id": id
                },
                "quantidade": 1
            })
        }

        Api.get(`/pedidos`).then((result) => {

            if (result.data?.length > 0) {
                const pedidoEncontrado = result.data.find((x) => x.cliente?.id == 1);

                if (!pedidoEncontrado) {
                    Api.post("/pedidos", {
                        "cliente": {
                            "id": 1
                        }
                    }).then((newPedido) => {
                        adicionarPedidoItem(newPedido.data.id);
                    });
                } else {
                    adicionarPedidoItem(pedidoEncontrado.id)
                }
            }
        });
    }

    function retorna() {
    };


    return (
        <div className="App-header">
            <Container>
                <Row>
                    <Col>
                        <h2>{"Nome do Produto"}</h2>
                    </Col>
                    <Col>
                        <h2>{"Valor do Produto"}</h2>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col >
                        <h3>{console.log(produto) + produto.nome}</h3>
                    </Col>
                    <Col>
                        <h3>{"R$ " + produto.valor}</h3>
                    </Col>
                    <Col>
                        <Link to='/carrinho'><button onClick={comprar}>Adicionar ao carrinho</button></Link>
                    </Col>
                    <Col>
                        <Link to='/home'><button onClick={retorna}>Retornar</button></Link>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}