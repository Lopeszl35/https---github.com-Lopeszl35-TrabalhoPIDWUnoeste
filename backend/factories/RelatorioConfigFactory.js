class RelatorioConfigFactory {
    static getConfig(tipo) {
        switch (tipo) {
            case "pacientes":
                return {
                    campos: [
                        { header: "Prontuario", key: "Prontuario", width: 15 },
                        { header: "Nome", key: "Nome_Completo", width: 30 },
                        { header: "Data de Nascimento", key: "Data_De_Nascimento", width: 20 },
                        { header: "CPF", key: "CPF", width: 15 },
                        { header: "RG", key: "RG", width: 15 },
                        { header: "Email", key: "Email", width: 25 },
                    ],
                };
            case "agendamentos":
                return {
                    campos: [
                        { header: "ID", key: "ID_Agendamento", width: 15 },
                        { header: "Paciente", key: "Paciente", width: 30 },
                        { header: "Profissional", key: "Profissional", width: 30 },
                        { header: "Serviço", key: "Servico", width: 20 },
                        { header: "Data", key: "Data_Hora", width: 20 },
                    ],
                };
            default:
                throw new Error(`Tipo de relatório "${tipo}" não suportado.`);
        }
    }
}

module.exports = RelatorioConfigFactory;
