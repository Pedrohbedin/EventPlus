// Função que inverte a data do banco de daos

export const dateFormatDbToView = (data) => {
  // Obter partes da data
  const parteData = data.split("T")[0].split("-");
  const ano = parteData[0];
  const mes = parteData[1];
  const dia = parteData[2];

  // Formatar a data
  const dataFormatada = `${dia} / ${mes} / ${ano}`;

  return dataFormatada;
};
export const dateFormatDbToForm = (data) => {
  // Obter partes da data
  const parteData = data.split("T")[0].split("-");
  const ano = parteData[0];
  const mes = parteData[1];
  const dia = parteData[2];

  // Formatar a data
  const dataFormatada = `${ano}-${mes}-${dia}`;

  return dataFormatada;
};
