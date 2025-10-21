import type { FormData } from "@/components/FormContract";
import bannerPSB from "@/assets/psb-banner.png";
import type { TextOptionsLight } from "jspdf";

interface AddMultilineTextProps {
  text: string;
  x: number;
  y: number;
  fontSize?: number;
  isBold?: boolean;
  tab?: number;
  color?: string;
  options?: TextOptionsLight;
}

interface AddInlineTextProps {
  label: string;
  shift?: boolean;
  x?: number;
  multi: AddMultilineTextProps;
}

const colors = {
  azulMedio: "rgb(19, 94, 148)",
  verdeClaro: "rgb(88, 214, 139)",
  laranja: "rgb(246, 166, 0)",
  vermelho: "rgb(213, 0, 0)",
};

export const generatePdfAsModel = async (formData: FormData) => {
  const { jsPDF } = await import("jspdf");

  // Criar novo documento PDF
  const doc = new jsPDF();

  // Configurar fonte
  // doc.addFileToVFS("RobotoRegular.ttf", myFont);
  doc.addFont("RobotoRegular.ttf", "Roboto", "normal");
  doc.setFont("Roboto", "normal");

  const initialYPosition = 10;
  let yPosition = initialYPosition;
  const margin = 10;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const contentWidth = pageWidth - margin * 2;

  const addHeaderImage = () => {
    const bannerWidth = 120;
    const bannerHeight = bannerWidth * 0.258;

    doc.addImage(bannerPSB.src, "PNG", margin, yPosition, bannerWidth, bannerHeight);
    yPosition += 32;
  };

  function addHeader() {
    // Adicionar banner PNG no topo da página
    addHeaderImage();

    // Linha separadora
    // doc.line(margin, yPosition, pageWidth - margin, yPosition, "F");
    yPosition += 6;

    doc.roundedRect(2, 2, pageWidth - 4, pageHeight - 4, 1, 1, "S");
  }

  function shiftPage() {
    doc.addPage();
    yPosition = initialYPosition;
  }

  // Helper function para quebrar texto em linhas
  const splitTextToLines = (text: string, maxWidth: number, fontSize: number = 12) => {
    doc.setFontSize(fontSize);
    return doc.splitTextToSize(text, maxWidth);
  };

  // Helper function para adicionar texto com quebra de linha
  const addMultilineText = ({
    text,
    x,
    y,
    fontSize = 12,
    isBold = false,
    tab = 0,
    color = "black",
    options,
  }: AddMultilineTextProps) => {
    doc.setFontSize(fontSize);
    doc.setFont("roboto", isBold ? "bold" : "normal");
    const leftMargin = x + tab;
    const width = options?.maxWidth ? options.maxWidth : contentWidth;
    const lines = splitTextToLines(text, width, fontSize);
    doc.setTextColor(color);
    lines.forEach((line: string, index: number) => {
      doc.text(line, leftMargin, y + index * (fontSize * 0.5), options);
    });
    return y + lines.length * (fontSize * 0.5) + 2;
  };

  const addInlineText = ({ label, shift = true, x = margin, multi }: AddInlineTextProps) => {
    doc.setFontSize(12);
    doc.setFont("roboto", "bold");
    doc.setTextColor("black");
    doc.text(label, x, yPosition);
    shift && (yPosition = addMultilineText(multi));
    !shift && addMultilineText(multi);
    // yPosition += 2;
  };

  // Cabeçalho
  addHeader();

  // 1. Identificação das Partes
  yPosition = addMultilineText({
    text: "1. Identificação das Partes",
    x: margin,
    y: yPosition,
    fontSize: 14,
    isBold: true,
  });
  yPosition += 1;

  addInlineText({
    label: "Contratante:",
    shift: true,
    multi: {
      text: formData.nomeCliente,
      x: margin,
      y: yPosition,
      tab: 25,
      color: colors.azulMedio,
      options: { maxWidth: contentWidth - 25 },
    },
  });

  yPosition += 1;

  addInlineText({
    label: "Contratada:",
    shift: true,
    multi: {
      text: formData.dadosContratada,
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 25,
      color: colors.azulMedio,
      options: { maxWidth: contentWidth - 25 },
    },
  });
  yPosition += 2;

  yPosition = addMultilineText({
    text: "As partes acima têm entre si acertado o seguinte Contrato de Prestação de Serviços, que se regerá pelas seguintes clausulas e pelas condições de preço, forma e termo de pagamento descritas no presente.",
    x: margin,
    y: yPosition,
    fontSize: 12,
  });
  yPosition += 3;

  // 2. Do Objeto do Contrato
  yPosition = addMultilineText({
    text: "2. Do Objeto do Contrato",
    x: margin,
    y: yPosition,
    fontSize: 14,
    isBold: true,
  });
  yPosition += 1;

  // Clausula 1ª
  yPosition = addMultilineText({
    text: "Clausula 1ª: É objeto do presente contrato a confecção do bolo de acordo com a descrição que segue no formulário abaixo:",
    x: margin,
    y: yPosition,
    fontSize: 12,
  });
  yPosition += 1;

  addInlineText({
    label: "Nº de fatias:",
    shift: false,
    multi: {
      text: formData.qtdFatias,
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 24,
      color: colors.azulMedio,
    },
  });

  addInlineText({
    label: "Massa:",
    shift: true,
    x: 80,
    multi: {
      text: formData.massaBolo,
      x: margin + 80,
      y: yPosition,
      fontSize: 12,
      tab: 6,
      color: colors.azulMedio,
    },
  });
  yPosition += 1;

  addInlineText({
    label: "Recheios:",
    shift: true,
    multi: {
      text: `${formData.recheio1}, ${formData.recheio2} e ${formData.recheio3}`,
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 20,
      color: colors.azulMedio,
    },
  });
  yPosition += 1;

  addInlineText({
    label: "Observações:",
    shift: true,
    multi: {
      text: formData.observacoesBolo,
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 28,
      color: colors.azulMedio,
      options: { maxWidth: contentWidth - 28 },
    },
  });
  yPosition += 1;

  addInlineText({
    label: "Modelo:",
    shift: true,
    multi: {
      text: formData.modeloBolo,
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 20,
      color: colors.azulMedio,
    },
  });
  yPosition += 1;

  addInlineText({
    label: "Valor:",
    shift: false,
    multi: {
      text: `R$ ${formData.valorBolo || "0,00"}`,
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 15,
      color: colors.azulMedio,
    },
  });

  addInlineText({
    label: "Sinal:",
    shift: false,
    x: 60,
    multi: {
      text: `R$ ${formData.sinalBolo || "0,00"}`,
      x: margin + 60,
      y: yPosition,
      fontSize: 12,
      tab: 6,
      color: colors.azulMedio,
    },
  });

  addInlineText({
    label: "Saldo:",
    shift: true,
    x: 120,
    multi: {
      text: `R$ ${Number(formData.valorBolo) - Number(formData.sinalBolo) || "0,00"}`,
      x: margin + 120,
      y: yPosition,
      fontSize: 12,
      tab: 6,
      color: colors.azulMedio,
    },
  });
  yPosition += 1;

  addInlineText({
    label: "Forma de pagamento:",
    shift: true,
    multi: {
      text: formData.formaPagamentoBolo || "A definir",
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 42,
      color: colors.azulMedio,
    },
  });
  yPosition += 3;

  // 3. Obrigações da Contratante
  yPosition = addMultilineText({
    text: "3. Obrigações da Contratante",
    x: margin,
    y: yPosition,
    fontSize: 14,
    isBold: true,
  });
  yPosition += 1;

  // Clausula 2ª
  yPosition = addMultilineText({
    text: "Clausula 2ª: A CONTRATANTE deverá fornecer a CONTRATADA as informações do formulário seguinte a fim de que a entrega seja feita sem contratempos para ambas as partes.",
    x: margin,
    y: yPosition,
    fontSize: 12,
    isBold: false,
  });
  yPosition += 1;

  addInlineText({
    label: "Local de entrega:",
    shift: true,
    multi: {
      text: formData.localEntrega,
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 36,
      color: colors.azulMedio,
    },
  });
  yPosition += 1;

  addInlineText({
    label: "Data da entrega:",
    shift: true,
    multi: {
      text: formData.dataEntrega || "A definir",
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 36,
      color: colors.azulMedio,
    },
  });
  yPosition += 1;

  // telefones
  addInlineText({
    label: "Telefone cliente:",
    shift: false,
    multi: {
      text: formData.telefoneCliente,
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 36,
      color: colors.azulMedio,
    },
  });

  addInlineText({
    label: "Telefone adicional:",
    shift: true,
    x: 100,
    multi: {
      text: formData.telefoneAdicional,
      x: margin + 100,
      y: yPosition,
      fontSize: 12,
      tab: 42,
      color: colors.azulMedio,
    },
  });
  yPosition += 1;

  addInlineText({
    label: "Contato do evento:",
    shift: false,
    multi: {
      text: formData.nomeContatoEvento || "Mesmo do cliente",
      x: margin,
      y: yPosition,
      fontSize: 12,
      tab: 36,
      color: colors.azulMedio,
    },
  });

  addInlineText({
    label: "Telefone contato do evento:",
    shift: true,
    x: 100,
    multi: {
      text: formData.telefoneContatoEvento || "Mesmo do cliente",
      x: margin + 100,
      y: yPosition,
      fontSize: 12,
      tab: 42,
      color: colors.azulMedio,
    },
  });
  yPosition += 1;

  // Nova página
  shiftPage();

  // Cabeçalho
  addHeader();

  // 4. Políticas de Cancelamento ou Adiamento
  yPosition = addMultilineText({
    text: "4. Políticas de Cancelamento ou Adiamento",
    x: margin,
    y: yPosition,
    fontSize: 14,
    isBold: true,
  });
  yPosition += 1;

  yPosition = addMultilineText({
    text: "Clausula 3ª: Casos de desistência por parte do contratante:",
    x: margin,
    y: yPosition,
    fontSize: 12,
    isBold: false,
  });
  yPosition += 2;

  const cancelamentoPoliticas = [
    "• Em até 60 dias antes da data evento ocorre-se a devolução de 30% do valor pago.",
    "• Em até 30 dias antes da data evento ocorre-se a devolução de 20% do valor pago.",
    "• Em até 11 dias antes da data evento ocorre-se a devolução de 10% do valor pago.",
    "• Do décimo dia anterior a data do evento em diante, não haverá devolução de valor.",
  ];

  cancelamentoPoliticas.forEach((politica) => {
    yPosition = addMultilineText({
      text: politica,
      x: margin,
      y: yPosition,
      fontSize: 11,
    });
    yPosition += 1;
  });
  yPosition += 2;

  // Clausula 4ª
  yPosition = addMultilineText({
    text: "Clausula 4ª: Para adiamento de data, o valor do produto poderá sofrer reajuste da seguinte forma:",
    x: margin,
    y: yPosition,
    fontSize: 12,
    isBold: false,
  });

  yPosition = addMultilineText({
    text: "• Até 6 meses de adiamento – ajuste de acordo com o IPCA;",
    x: margin,
    y: yPosition,
    fontSize: 11,
  });
  yPosition += 1;

  yPosition = addMultilineText({
    text: "• Acima de 6 meses, conforme valores de tabela vigente na nova data do evento.",
    x: margin,
    y: yPosition,
    fontSize: 11,
  });
  yPosition += 3;

  // 5. Da Validação do Contrato
  yPosition = addMultilineText({
    text: "5. Da Validação do Contrato",
    x: margin,
    y: yPosition,
    fontSize: 14,
    isBold: true,
  });
  yPosition += 1;

  // Clausula 5ª
  yPosition = addMultilineText({
    text: "Clausula 5ª: A data somente será reservada mediante pagamento de sinal.",
    x: margin,
    y: yPosition,
    fontSize: 12,
    isBold: false,
  });
  yPosition += 1;

  // Clausula 6ª
  yPosition = addMultilineText({
    text: "Clausula 6ª: O valor total deverá estar quitado até 7 dias antes da data do evento sob pena de perder a reserva da data.",
    x: margin,
    y: yPosition,
    fontSize: 12,
    isBold: false,
  });
  yPosition += 1;

  // Clausula final
  yPosition = addMultilineText({
    text: "Clausula final: Se por efeito de força maior, o bolo não puder ser feito pela Patricia Siqueira, será feito a devolução total do valor.",
    x: margin,
    y: yPosition,
    fontSize: 12,
    isBold: false,
  });
  yPosition += 10;

  // Assinaturas
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Linha de assinaturas
  doc.line(margin, yPosition, margin + 70, yPosition);
  doc.line(pageWidth - margin - 70, yPosition, pageWidth - margin, yPosition);

  yPosition += 4;
  addMultilineText({
    text: "Assinatura da(o) Contratante",
    x: margin,
    y: yPosition,
    fontSize: 10,
  });

  // Linha de assinatura da contratada (lado direito)
  // doc.line(pageWidth - margin - 70, yPosition - 10, pageWidth - margin, yPosition - 10);
  addMultilineText({
    text: "Assinatura da Contratada",
    x: pageWidth - margin - 60,
    y: yPosition,
    fontSize: 10,
  });
  yPosition += 16;

  addInlineText({
    label: "Data:",
    shift: true,
    x: 12,
    multi: {
      text: currentDate,
      x: margin + 12,
      y: yPosition,
      fontSize: 12,
      tab: 8,
      color: colors.azulMedio,
    },
  });
  // yPosition = addMultilineText({
  //   text: `Data: ${currentDate}`,
  //   x: margin,
  //   y: yPosition,
  //   fontSize: 12,
  // });

  // Salvar o PDF
  doc.save("contrato_psb.pdf");
};
