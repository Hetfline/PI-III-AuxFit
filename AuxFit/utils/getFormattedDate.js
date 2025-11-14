export default function getFormattedDate() {
  const date = new Date();

  // 1. Obter o Dia da Semana Completo (ex: "Terça-feira")
  const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });

  // 2. Obter o Mês Abreviado (ex: "nov.")
  // Note que o formato 'short' para meses geralmente resulta em 3 letras. 
  // O ponto final (abreviação) é adicionado manualmente.
  const monthAbbr = date.toLocaleDateString('pt-BR', { month: 'short' });

  // 3. Obter o Dia do Mês (ex: "04")
  const day = date.toLocaleDateString('pt-BR', { day: '2-digit' });

  // 4. Formatar e capitalizar (A primeira letra do dia da semana deve ser maiúscula)
  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  
  // 5. Unir as partes no formato desejado: "Sexta-feira, nov. 04"
  // Note que é comum ter a vírgula após o dia da semana.
  const formattedDate = `${capitalizedWeekday}, ${monthAbbr}. ${day}`;

  return formattedDate;
}

// Exemplo de como usar:
// const todayString = getFormattedDate(); 
// console.log(todayString); 
// Output para hoje (4 de novembro de 2025): "Terça-feira, nov. 04"