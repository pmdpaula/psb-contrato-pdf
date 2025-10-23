import Box from "@mui/material/Box";
import Image from "next/image";

import Typography, { type TypographyProps } from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";
import { getCookie } from "cookies-next";
import logoPSB from "@/assets/psb-logo_bglight.svg";

interface TextProps extends TypographyProps {
  children: React.ReactNode;
}

interface FieldProps extends TypographyProps {
  title: string;
  value: string;
}

// const dados = {
//   nomeCliente: "Carol Canadá, Halifax - CEP 98798790, Rua da ladeira, 159",
//   dadosContratada:
//     "Patricia Edwiges Alves de Siqueira, confeiteira, representante da Patrícia Siqueira Bolos, localizada na rua Desembargador Izidro, 126 702 B - Tijuca - RJ , inscrita no CPF : 02900486726",
//   qtdFatias: "120",
//   massaBolo: "amanteigada",
//   recheio1: "brigadeiro preto",
//   recheio2: "brigadeiro de cream cheese",
//   recheio3: "geleia de morango",
//   observacoesBolo: "Uma observação importante",
//   modeloBolo: "7 andares",
//   valorBolo: "2200",
//   sinalBolo: "1400",
//   saldoBolo: "800",
//   formaPagamentoBolo: "2 vezes",
//   localEntrega: "Halifax",
//   dataEntrega: "2028-05-05",
//   horaEntrega: "",
//   telefoneCliente: "2198745698",
//   telefoneAdicional: "",
//   nomeContatoEvento: "Diogo",
//   telefoneContatoEvento: "2158996659",
// };

const PreviewFile = () => {
  const data = getCookie("formData") && JSON.parse(getCookie("formData") as string);

  const Title = (props: TextProps) => {
    return (
      <Typography variant="body1" sx={{ color: "black", my: 1 }}>
        {props.children}
      </Typography>
    );
  };

  const Field = (props: FieldProps) => {
    return (
      <Stack direction="row" my={1}>
        <Typography variant="caption" sx={{ color: "black", fontWeight: "bold" }}>
          {props.title}
        </Typography>
        <Typography variant="caption" sx={{ color: "blue", ml: 1 }}>
          {props.value}
        </Typography>
      </Stack>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box bgcolor="white" p={0.5}>
        <Typography variant="caption" color="gray">
          página 1
        </Typography>

        <Box p={1} pb={12} sx={{ border: "2px solid black", borderRadius: 1 }}>
          <Image
            src={logoPSB}
            alt="logotipo com um bolo estilizado rosa e marrom a esquerda e a direita o nome Patricia Siqueira"
            width={300}
          />
          <Title>1. Identificação das Partes</Title>

          <Field title="Contratante:" value={data.nomeCliente} />
          <Field title="Contratada:" value={data.dadosContratada} />

          <Typography variant="caption" sx={{ color: "black", my: 1 }}>
            As partes acima têm entre si acertado o seguinte Contrato de Prestação de Serviços, que
            se regerá pelas seguintes clausulas e pelas condições de preço, forma e termo de
            pagamento descritas no presente.
          </Typography>

          <Title>2. Do Objeto do Contrato</Title>

          <Typography variant="caption" sx={{ color: "black", my: 1 }}>
            Clausula 1ª: É objeto do presente contrato a confecção do bolo de acordo com a descrição
            que segue no formulário abaixo:
          </Typography>

          <Stack direction="row" my={1} spacing={4}>
            <Field title="Nº fatias:" value={data.qtdFatias} />
            <Field title="Massa do bolo:" value={data.massaBolo} />
          </Stack>

          <Field
            title="Recheios:"
            value={`${data.recheio1}, ${data.recheio2} e ${data.recheio3}`}
          />
          <Field title="Observações:" value={data.observacoesBolo} />

          <Stack direction="row" my={1} spacing={4} justifyContent="space-between">
            <Field title="Valor:" value={data.valorBolo} />
            <Field title="Sinal:" value={data.sinalBolo} />
            <Field title="Saldo:" value={data.saldoBolo} />
          </Stack>

          <Field title="Forma de pagamento:" value={data.formaPagamentoBolo} />

          <Title>3. Obrigações da Contratante</Title>

          <Typography variant="caption" sx={{ color: "black", my: 1 }}>
            Clausula 2ª: A CONTRATANTE deverá fornecer a CONTRATADA as informações do formulário
            seguinte a fim de que a entrega seja feita sem contratempos para ambas as partes.
          </Typography>

          <Field title="Local da entrega:" value={data.localEntrega} />
          <Field title="Data da entrega:" value={data.dataEntrega} />
          {/* <Field title="Hora da entrega:" value={data.horaEntrega} /> */}

          <Stack direction="row" my={1} spacing={2} justifyContent="normal">
            <Field title="Telefone cliente:" value={data.telefoneCliente} />
            <Field title="Telefone adicional:" value={data.telefoneAdicional} />
          </Stack>

          <Stack direction="row" my={1} spacing={10} justifyContent="normal">
            <Field title="Contato do evento:" value={data.nomeContatoEvento} />
            <Field title="Telefone contato do evento:" value={data.telefoneContatoEvento} />
          </Stack>
        </Box>
      </Box>

      <Box bgcolor="white" p={0.5} mt={1.5}>
        <Typography variant="caption" color="gray">
          página 2
        </Typography>

        <Box p={1} pb={24} sx={{ border: "2px solid black", borderRadius: 1 }}>
          <Image
            src={logoPSB}
            alt="logotipo com um bolo estilizado rosa e marrom a esquerda e a direita o nome Patricia Siqueira"
            width={300}
          />
          <Title>4. Políticas de Cancelamento ou Adiamento</Title>

          <Typography variant="caption" sx={{ color: "black", my: 1 }}>
            <p>Clausula 3ª: Casos de desistência por parte do contratante:</p>
            <p>• Em até 60 dias antes da data evento ocorre-se a devolução de 30% do valor pago.</p>
            <p>• Em até 30 dias antes da data evento ocorre-se a devolução de 20% do valor pago.</p>
            <p>• Em até 11 dias antes da data evento ocorre-se a devolução de 10% do valor pago.</p>
            <p>
              • Do décimo dia anterior a data do evento em diante, não haverá devolução de valor.
            </p>
            <p>
              Clausula 4ª: Para adiamento de data, o valor do produto poderá sofrer reajuste da
              seguinte forma:
            </p>
            <p>• Até 6 meses de adiamento – ajuste de acordo com o IPCA;</p>
            <p>• Acima de 6 meses, conforme valores de tabela vigente na nova data do evento.</p>
          </Typography>

          <Title>5. Da Validação do Contrato</Title>

          <Stack spacing={0}>
            <Typography variant="caption" sx={{ color: "black", my: 0.5 }}>
              Clausula 5ª: A data somente será reservada mediante pagamento de sinal.
            </Typography>

            <Typography variant="caption" sx={{ color: "black", my: 0.5 }}>
              Clausula 6ª: O valor total deverá estar quitado até 7 dias antes da data do evento sob
              pena de perder a reserva da data.
            </Typography>

            <Typography variant="caption" sx={{ color: "black", my: 0.5 }}>
              Clausula final: Se por efeito de força maior, o bolo não puder ser feito pela Patricia
              Siqueira, será feito a devolução total do valor.
            </Typography>
          </Stack>

          <Stack direction="row" mt={6} justifyContent="space-around">
            <Typography variant="body2" sx={{ color: "black", my: 0.5 }}>
              ____________________________
            </Typography>

            <Typography variant="body2" sx={{ color: "black", my: 0.5 }}>
              ____________________________
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-around" mb={5}>
            <Typography variant="caption" sx={{ color: "black", fontSize: 10 }}>
              Assinatura da(o) Contratante
            </Typography>

            <Typography variant="caption" sx={{ color: "black", fontSize: 10 }}>
              Assinatura da Contratada
            </Typography>
          </Stack>

          <Field
            title="Data:"
            value={new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PreviewFile;
