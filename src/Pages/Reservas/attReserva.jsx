import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./addReserva.module.css";

function AttReserva() {
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [numQuarto, setNumQuarto] = useState(0);
    const [entrada, setEntrada] = useState("");
    const [saida, setSaida] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/reservas/${id}`)
            .then(response => {
                return response.json()
            }).then(data => {
                setCpf(data.CPF)
                setNome(data.nome)
                setNumQuarto(data.numeroQuarto)
                setEntrada(data.dataEntrada)
                setSaida(data.dataSaida)
            })
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const attReserva = {
            cpf,
            nome,
            numeroQuarto: Number(numQuarto),
            dataEntrada: entrada,
            dataSaida: saida,
        }
        const response = await fetch(`http://localhost:3000/reservas/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(attReserva),
        });
        const data = await response.json();

        alert(data.Mensagem);
        navigate("/reservas")
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className={style.inputs}>
                <label htmlFor="cpf" className={style.label}>
                    CPF
                </label>
                <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    className={style.inputsForm}
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Ex: 000-000-000"
                    required
                />
            </div>
            <div className={style.inputs}>
                <label htmlFor="nome" className={style.label}>
                    Nome Hóspede
                </label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    className={style.inputsForm}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome "
                    required
                />
            </div>
            <div className={style.inputs}>
                <label htmlFor="numQuarto" className={style.label}>
                    Número do quarto
                </label>
                <input
                    type="number"
                    name="numQuarto"
                    id="numQuarto"
                    className={style.inputsForm}
                    value={numQuarto}
                    onChange={(e) => setNumQuarto(e.target.value)}
                    placeholder="Digite o numero do quarto"
                    required
                />
            </div>
            <div className={style.container}>
                <div className={style.inputs}>
                    <label htmlFor="entrada" className={style.label}>
                        Data de entrada
                    </label>
                    <input
                        type="text"
                        name="entrada"
                        id="entrada"
                        className={style.inputsForm}
                        value={entrada}
                        onChange={(e) => setEntrada(e.target.value)}
                        required
                    />
                </div>
                <div className={style.inputs}>
                    <label htmlFor="saida" className={style.label}>
                        Data de saída
                    </label>
                    <input
                        type="text"
                        name="saida"
                        id="saida"
                        className={style.inputsForm}
                        value={saida}
                        onChange={(e) => setSaida(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className={style.containerButton}>
                <button className={style.button} type="submit" onClick={
                    (e) => handleSubmit(e)}>
                    Atualizar reserva
                </button>
            </div>
        </form>
    );
}


export default AttReserva;
