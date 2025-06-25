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
  1: ["textoDefesa"],
  2: ["nome", "data", "hora", "numeroMulta", "local"],
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
    getValues,
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

  const textoDefesa = watch("textoDefesa");

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
      html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
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
            />
          ) : (
            <Input
              id={id}
              type={tipo}
              placeholder={labelMap[campo]}
              {...register(campo)}
            />
          )}
          {campo === "textoDefesa" && errors.textoDefesa && (
            <span style={{ color: "red", marginTop: 4 }}>
              Campo obrigatório
            </span>
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
            disabled={etapa === 1 && !textoDefesa.trim()}
            style={{ opacity: etapa === 1 && !textoDefesa.trim() ? 0.5 : 1 }}
          >
            {etapa === 2 ? "Mais" : "Próximo"}
          </Button>
        )}

        <Button
          onClick={handleSubmit(gerarPDF)}
          disabled={!textoDefesa.trim()}
          style={{ opacity: textoDefesa.trim() ? 1 : 0.5 }}
        >
          Gerar PDF
        </Button>

        <Button
          onClick={limparFormulario}
          style={{ backgroundColor: "#ccc", color: "#000" }}
        >
          Limpar Tudo
        </Button>
      </div>

      <div style={{ marginTop: 32, overflowX: "auto" }}>
        <PdfContent ref={pdfRef}>
          <HeaderText />
          <PdfTitle>{getValues("titulo")}</PdfTitle>

          {getValues("textoDefesa") && (
            <div style={{ whiteSpace: "pre-wrap", marginBottom: 16 }}>
              {getValues("textoDefesa")}
            </div>
          )}

          <p>
            {getValues("data") && (
              <>
                <strong>Data da ocorrência:</strong>{" "}
                {formatarData(getValues("data"))}
                <br />
              </>
            )}
            {getValues("hora") && (
              <>
                <strong>Hora da ocorrência:</strong> {getValues("hora")}
                <br />
              </>
            )}
            {getValues("numeroMulta") && (
              <>
                <strong>Número da multa:</strong> {getValues("numeroMulta")}
                <br />
              </>
            )}
            {getValues("local") && (
              <>
                <strong>Local:</strong> {getValues("local")}
                <br />
              </>
            )}
            {getValues("placa") && (
              <>
                <strong>Placa do veículo:</strong> {getValues("placa")}
                <br />
              </>
            )}
            {getValues("cnh") && (
              <>
                <strong>CNH:</strong> {getValues("cnh")}
                <br />
              </>
            )}
            {getValues("cpf") && (
              <>
                <strong>CPF:</strong> {getValues("cpf")}
                <br />
              </>
            )}
            {getValues("telefone") && (
              <>
                <strong>Telefone:</strong> {getValues("telefone")}
                <br />
              </>
            )}
            {getValues("email") && (
              <>
                <strong>E-mail:</strong> {getValues("email")}
                <br />
              </>
            )}
            {getValues("nomeAssinatura") && (
              <>
                <br />
                <strong>Nome para assinatura:</strong>{" "}
                {getValues("nomeAssinatura")}
              </>
            )}
          </p>
        </PdfContent>
      </div>
    </Container>
  );
}

export default App;
