const PacientesModel = require('../model/Entities/pacientesModel');
const pacienteModel = new PacientesModel();

class PacientesController {

    async obterTodos(req, res) {
        console.log('Obtendo todos os Pacientes...');
        try {
            const pacientes = await pacienteModel.obterTodos();
            return res.status(200).json(pacientes);
        } catch (error) {
            console.log('Erro ao obter os Pacientes:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    async obterPorId(req, res) {
        console.log('Obtendo o Paciente por ID...');
        const { id } = req.params;
        try {
            const paciente = await pacienteModel.obterPorId(id);
            return res.status(200).json(paciente);
        } catch (error) {
            console.log('Erro ao obter o Paciente:', error);
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = PacientesController;
