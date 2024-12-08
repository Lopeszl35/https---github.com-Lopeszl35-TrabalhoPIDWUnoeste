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
                        { header: "Logradouro", key: "Logradouro", width: 20},
                        { header: "Cidade", key: "Cidade", width: 20},
                    ],
                };
            case "agendamentos":
                return {
                    campos: [
                        { header: "ID", key: "id_agendamento", width: 15 },
                        { header: "Paciente", key: "paciente", width: 30 },
                        { header: "Profissional", key: "profissional", width: 30 },
                        { header: "Serviço", key: "servico", width: 20 },
                        { header: "Status", key: "status", width: 20 },
                        { header: "Data", key: "data_hora", width: 20 },
                        { header: "observações", key: "observacoes", width: 20 },
                    ],
                };
            default:
                throw new Error(`Tipo de relatório "${tipo}" não suportado.`);
        }
    }
}

module.exports = RelatorioConfigFactory;
