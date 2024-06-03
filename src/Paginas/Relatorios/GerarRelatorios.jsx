import { useEffect, useState } from 'react';
import { Container, Card, Button, Table } from "react-bootstrap";
import { FaFileCsv } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import './Relatorios.css';

function GerarRelatorios() {
    const { show } = useOutletContext();
    const [listaMateriais, setListaMateriais] = useState([]);

    useEffect(() => {
        const listaSalva = localStorage.getItem('materiais');
        if (listaSalva !== null) {
            setListaMateriais(JSON.parse(listaSalva));
        }
    }, []);

    const gerarCSV = () => {
        const header = ["ID", "Nome", "Quantidade", "Descrição", "Fornecedor", "Preço"];
        const rows = listaMateriais.map(material => [
            material.id,
            material.nome,
            material.quantidade,
            material.descricao,
            material.fornecedor,
            material.preco
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + header.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "relatorio_materiais.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`container-relatorios ${show ? 'container-relatorios-side-active' : ''}`}>
            <h1>Relatórios de Materiais</h1>
            <Container>
                <Card.Body className="mt-2 card-material">
                    <Button variant="success" onClick={gerarCSV}>
                        <FaFileCsv /> Gerar Relatório CSV
                    </Button>
                </Card.Body>
            </Container>
            <Container>
                <h2>Materiais Cadastrados</h2>
                <Table striped bordered hover className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Descrição</th>
                            <th>Fornecedor</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaMateriais.length <= 0 ? (<tr><td colSpan={6}>Nenhum material encontrado</td></tr>) :
                            listaMateriais.map(material => (
                                <tr key={material.id}>
                                    <td>{material.id}</td>
                                    <td>{material.nome}</td>
                                    <td>{material.quantidade}</td>
                                    <td>{material.descricao}</td>
                                    <td>{material.fornecedor}</td>
                                    <td>{material.preco}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default GerarRelatorios;
