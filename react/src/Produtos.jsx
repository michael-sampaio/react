import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Detalhes from "./Detalhes";
import Carrinho from "./Carrinho";

export default (props) => {
    const { produto } = props;

    const handler = (event) => {
        <Detalhes produto={produto} />
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

    return (
        <div className="produto">
            <Row>
                <Col>
                    <h3>{produto.nome}</h3>
                </Col>
                <Col>
                    <p>{produto.valor}</p>
                </Col>
                <Col>
                    <Link to={`/produtos/${produto.id}`}><button onClick={handler()}>Ver detalhes</button></Link>
                </Col>
                <Col>
                    <Link to='/carrinho'><button onClick={comprar}>Adicionar ao carrinho</button></Link>
                </Col>
            </Row>
        </div>
    )
}