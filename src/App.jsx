import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  Container,
  Title,
  Input,
  Textarea,
  PdfContent,
  HeaderText,
  PdfTitle,
  Button,
  SignatureLine,
  SignatureText,
} from "./componentes/styles";

function formatarData(dataISO) {
  if (!dataISO) return "[data não informada]";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function App() {
  const pdfRef = useRef();

  const [titulo, setTitulo] = useState("Defesa Prévia");
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [numeroMulta, setNumeroMulta] = useState("");
  const [local, setLocal] = useState("");
  const [cnh, setCnh] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [textoDefesa, setTextoDefesa] = useState("");
  const [nomeAssinatura, setNomeAssinatura] = useState("");

  // Recuperar dados do localStorage ao carregar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem("defesaForm");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      setTitulo(dados.titulo || "Defesa Prévia");
      setNome(dados.nome || "");
      setData(dados.data || "");
      setHora(dados.hora || "");
      setNumeroMulta(dados.numeroMulta || "");
      setLocal(dados.local || "");
      setCnh(dados.cnh || "");
      setCpf(dados.cpf || "");
      setTelefone(dados.telefone || "");
      setTextoDefesa(dados.textoDefesa || "");
      setNomeAssinatura(dados.nomeAssinatura || "");
    }
  }, []);

  // Salvar dados no localStorage quando qualquer valor mudar
  useEffect(() => {
    const dados = {
      titulo,
      nome,
      data,
      hora,
      numeroMulta,
      local,
      cnh,
      cpf,
      telefone,
      textoDefesa,
      nomeAssinatura,
    };
    localStorage.setItem("defesaForm", JSON.stringify(dados));
  }, [
    titulo,
    nome,
    data,
    hora,
    numeroMulta,
    local,
    cnh,
    cpf,
    telefone,
    textoDefesa,
    nomeAssinatura,
  ]);

  const gerarPDF = () => {
    const input = pdfRef.current;
    setTimeout(() => {
      html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("defesa-previa.pdf");
      });
    }, 100);
  };

  return (
    <Container>
      <Title>Gerador de Defesa Prévia</Title>

      <label style={{ fontWeight: "600", marginBottom: 6, display: "block" }}>
        Escolha o título do documento:
      </label>
      <select
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
          border: "1.8px solid #ddd",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        <option value="Defesa Prévia">Defesa Prévia</option>
        <option value="Recurso de Defesa Prévia">Recurso de Defesa Prévia</option>
        <option value="Manifestação de Defesa">Manifestação de Defesa</option>
        <option value="Defesa contra Multa de Trânsito">Defesa contra Multa de Trânsito</option>
        <option value="Pedido de Revisão de Multa">Pedido de Revisão de Multa</option>
        <option value="Contestação de Infração">Contestação de Infração</option>
      </select>

      <Input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <Input type="date" placeholder="Data da infração" value={data} onChange={(e) => setData(e.target.value)} />
      <Input type="time" placeholder="Hora da infração" value={hora} onChange={(e) => setHora(e.target.value)} />
      <Input type="text" placeholder="Número da multa" value={numeroMulta} onChange={(e) => setNumeroMulta(e.target.value)} />
      <Input type="text" placeholder="Local da infração" value={local} onChange={(e) => setLocal(e.target.value)} />
      <Input type="text" placeholder="CNH (opcional)" value={cnh} onChange={(e) => setCnh(e.target.value)} />
      <Input type="text" placeholder="CPF (opcional)" value={cpf} onChange={(e) => setCpf(e.target.value)} />
      <Input type="tel" placeholder="Telefone (opcional)" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      <Textarea rows={6} placeholder="Texto da defesa" value={textoDefesa} onChange={(e) => setTextoDefesa(e.target.value)} />
      <Input type="text" placeholder="Nome para assinatura (opcional)" value={nomeAssinatura} onChange={(e) => setNomeAssinatura(e.target.value)} style={{ marginBottom: 30 }} />

      <PdfContent ref={pdfRef}>
        <HeaderText></HeaderText>
        <PdfTitle>{titulo}</PdfTitle>

        <p>
          Eu, <strong>{nome || "[nome não informado]"}</strong>, venho por meio
          desta apresentar minha defesa prévia referente à infração registrada no
          dia <strong>{formatarData(data)}</strong>
          {hora ? ` às ${hora}` : ""}.
          <br /><br />
          A infração de número{" "}
          <strong>{numeroMulta || "[número da multa não informado]"}</strong>{" "}
          ocorreu no local <strong>{local || "[local não informado]"}</strong>.
          <br /><br />
          {cnh && <>CNH: <strong>{cnh}</strong><br /></>}
          {cpf && <>CPF: <strong>{cpf}</strong><br /></>}
          {telefone && <>Telefone: <strong>{telefone}</strong><br /></>}
          <br />
          {textoDefesa || "[texto da defesa não informado]"}
          <br /><br />
          Solicito a análise cuidadosa dessa defesa e a reconsideração da multa
          aplicada.
          <br /><br />
          Atenciosamente,
          <br /><br />
        </p>

        <SignatureLine />
        <SignatureText>{nomeAssinatura || ""}</SignatureText>
      </PdfContent>

      <Button onClick={gerarPDF}>Gerar PDF</Button>
    </Container>
  );
}

export default App;
