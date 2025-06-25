import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
} from "./componentes/styles";

const formatarData = (dataISO) => {
  if (!dataISO) return "[não informado]";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
};

const camposPorEtapa = {
  1: ["nome", "textoDefesa"],
  2: ["data", "hora", "numeroMulta", "local"],
  3: ["placa", "cnh", "cpf", "telefone", "email", "nomeAssinatura"],
};

function App() {
  const pdfRef = useRef();
  const [etapa, setEtapa] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titulo: "Defesa Prévia",
      nome: "",
      data: "",
      hora: "",
      numeroMulta: "",
      local: "",
      placa: "",
      cnh: "",
      cpf: "",
      telefone: "",
      email: "",
      textoDefesa: "",
      nomeAssinatura: "",
    },
  });

  const valores = watch();

  useEffect(() => {
    const subscription = watch((dados) => {
      localStorage.setItem("defesaForm", JSON.stringify(dados));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("defesaForm");
    if (dadosSalvos) {
      Object.entries(JSON.parse(dadosSalvos)).forEach(([key, val]) => {
        setValue(key, val);
      });
    }
  }, [setValue]);

  const gerarPDF = () => {
    const input = pdfRef.current;
    setTimeout(() => {
      html2canvas(input, { scale: 4, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.internal.pageSize.setHeight(imgHeight);
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
        pdf.save("defesa-previa.pdf");
      });
    }, 100);
  };

  const limparFormulario = () => {
    reset();
    localStorage.removeItem("defesaForm");
    setEtapa(1);
  };

  const mudarEtapa = (passo) =>
    setEtapa((prev) => Math.min(Math.max(prev + passo, 1), 3));

  const labelMap = {
    textoDefesa: "Texto da defesa",
    nome: "Nome completo do condutor",
    data: "Data da infração",
    hora: "Hora do acontecimento",
    numeroMulta: "Número da multa recebida",
    local: "Local da infração",
    placa: "Placa do veículo",
    cnh: "Número da CNH",
    cpf: "CPF do condutor",
    telefone: "Telefone para contato",
    email: "E-mail para contato",
    nomeAssinatura: "Nome para assinatura",
  };

  const tipoMap = {
    data: "date",
    hora: "time",
    telefone: "tel",
    email: "email",
    textoDefesa: "textarea",
  };

  const renderizarInputs = () =>
    camposPorEtapa[etapa].map((campo) => {
      const tipo = tipoMap[campo] || "text";
      const id = `input-${campo}`;
      const valorAtual = valores[campo] || "";

      if (campo === "nome") {
        return (
          <div
            key={campo}
            style={{
              marginBottom: 16,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <label
              htmlFor={id}
              style={{ marginBottom: 4, fontWeight: "bold", display: "block" }}
            >
              Eu
            </label>
            <Input
              id={id}
              type="text"
              placeholder="Digite seu nome"
              {...register(campo)}
              value={valorAtual}
              onChange={(e) => setValue(campo, e.target.value)}
            />
          </div>
        );
      }

      return (
        <div
          key={campo}
          style={{ marginBottom: 16, display: "flex", flexDirection: "column" }}
        >
          <label htmlFor={id} style={{ marginBottom: 4, fontWeight: "bold" }}>
            {labelMap[campo]}
          </label>
          {tipo === "textarea" ? (
            <Textarea
              id={id}
              placeholder={labelMap[campo]}
              {...register(campo, { required: campo === "textoDefesa" })}
              rows={6}
              value={valorAtual}
              onChange={(e) => setValue(campo, e.target.value)}
            />
          ) : (
            <Input
              id={id}
              type={tipo}
              placeholder={labelMap[campo]}
              {...register(campo)}
              value={valorAtual}
              onChange={(e) => setValue(campo, e.target.value)}
            />
          )}
          {campo === "textoDefesa" && errors.textoDefesa && (
            <span style={{ color: "red", marginTop: 4 }}>Campo obrigatório</span>
          )}
        </div>
      );
    });

  return (
    <Container>
      <Title>Defesa Prévia</Title>

      {renderizarInputs()}

      <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {etapa > 1 && <Button onClick={() => mudarEtapa(-1)}>Voltar</Button>}

        {etapa < 3 && (
          <Button
            onClick={() => mudarEtapa(1)}
            disabled={etapa === 1 && !valores.textoDefesa?.trim()}
            style={{ opacity: etapa === 1 && !valores.textoDefesa?.trim() ? 0.5 : 1 }}
          >
            {etapa === 2 ? "Mais" : "Próximo"}
          </Button>
        )}

        <Button
          onClick={handleSubmit(gerarPDF)}
          disabled={!valores.textoDefesa?.trim()}
          style={{ opacity: valores.textoDefesa?.trim() ? 1 : 0.5 }}
        >
          Gerar PDF
        </Button>

        <Button
          onClick={limparFormulario}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Limpar Tudo
        </Button>
      </div>

      <div style={{ marginTop: 32, overflowX: "auto" }}>
        <PdfContent ref={pdfRef}>
          <HeaderText />
          <PdfTitle>{valores.titulo}</PdfTitle>

          {valores.nome && valores.textoDefesa ? (
            <div
              style={{
                whiteSpace: "pre-wrap",
                marginBottom: 16,
                fontWeight: "bold",
              }}
            >
              Eu {valores.nome}{" "}
              <span style={{ fontWeight: "normal" }}>{valores.textoDefesa}</span>
            </div>
          ) : (
            <>
              {valores.nome && (
                <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                  Eu {valores.nome}
                </div>
              )}
              {valores.textoDefesa && (
                <div style={{ whiteSpace: "pre-wrap", marginBottom: 16 }}>
                  {valores.textoDefesa}
                </div>
              )}
            </>
          )}

          <p>
            {valores.data && (
              <>
                <strong>Data da ocorrência:</strong> {formatarData(valores.data)}
                <br />
              </>
            )}
            {valores.hora && (
              <>
                <strong>Hora da ocorrência:</strong> {valores.hora}
                <br />
              </>
            )}
            {valores.numeroMulta && (
              <>
                <strong>Número da multa:</strong> {valores.numeroMulta}
                <br />
              </>
            )}
            {valores.local && (
              <>
                <strong>Local:</strong> {valores.local}
                <br />
              </>
            )}
            {valores.placa && (
              <>
                <strong>Placa do veículo:</strong> {valores.placa}
                <br />
              </>
            )}
            {valores.cnh && (
              <>
                <strong>CNH:</strong> {valores.cnh}
                <br />
              </>
            )}
            {valores.cpf && (
              <>
                <strong>CPF:</strong> {valores.cpf}
                <br />
              </>
            )}
            {valores.telefone && (
              <>
                <strong>Telefone:</strong> {valores.telefone}
                <br />
              </>
            )}
            {valores.email && (
              <>
                <strong>E-mail:</strong> {valores.email}
                <br />
              </>
            )}
            {valores.nomeAssinatura && (
              <>
                <br />
                <strong>Nome para assinatura:</strong> {valores.nomeAssinatura}
              </>
            )}
          </p>
        </PdfContent>
      </div>
    </Container>
  );
}

export default App;
