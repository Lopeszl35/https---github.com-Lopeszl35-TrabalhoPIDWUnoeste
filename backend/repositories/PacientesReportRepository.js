class PacientesReportRepository {
    constructor(database) {
      this.database = database;
    }
  
    async getAllPacientes() {
      try {
        const query = `SELECT Prontuario, Nome_Completo, Data_de_Nascimento, CPF, RG, CartaoSUS, Escola, Ano_Escolar, Periodo, Email FROM Pacientes`;
        const [results] = await this.database.execute(query);
        return results;
      } catch (error) {
        throw new Error("Erro ao buscar dados dos pacientes: " + error.message);
      }
    }
  }
  
  module.exports = PacientesReportRepository;
  