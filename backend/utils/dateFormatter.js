// utils/dateFormatter.js

/**
 * Normaliza uma data para o formato esperado pelo banco de dados (YYYY-MM-DD HH:mm:ss).
 * 
 * @param {string|Date} date - Data no formato ISO ou objeto Date.
 * @returns {string} Data normalizada para o banco de dados.
 */
function formatDateForDatabase(date) {
    if (!date) {
      throw new Error("A data fornecida é inválida ou indefinida.");
    }
  
    const parsedDate = new Date(date); // Garante que é um objeto Date
    if (isNaN(parsedDate.getTime())) {
      throw new Error("A data fornecida não é válida.");
    }
  
    // Converte para o formato esperado pelo banco
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    const seconds = String(parsedDate.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  module.exports = {
    formatDateForDatabase,
  };
  