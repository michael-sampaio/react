import axios from "axios";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Produtos from "./Produtos";

export default () => {
  const [produtos, setProdutos] = React.useState([]);

  const chamadaAPI = () => {
    const api = axios.create({
      baseURL: "http://localhost:3000/",
    });

    api.get("/produtos").then(listar);

    function listar(response) {
      setProdutos(response.data);
    }
  };

  React.useEffect(() => { chamadaAPI() }, [produtos])

  return (
    <div className="App-header">
      <Container>
        <header>
          <p>E-commerce | Grupo5 | Serratec</p>
        </header>
        <p></p>
        <Row>
          <Col>Nome do produto</Col>
          <Col>Valor</Col>
          <Col></Col>
          <Col></Col>
          <p></p>
        </Row>
      </Container>
      <Container>
        {produtos.map((produto) => (
          <Row key={produto.id}>
            <Produtos
              produto={produto}
              className="produto"
            />
          </Row>
        ))}
      </Container>
    </div>
  );
}
