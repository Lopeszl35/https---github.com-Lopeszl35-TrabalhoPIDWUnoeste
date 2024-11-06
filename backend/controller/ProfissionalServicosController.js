const { validationResult } = require("express-validator");
const AbstractProfissionaisServicosController = require("./abstratos/AbstractProfissionaisServicosController");

class ProfissionaisServicosController extends AbstractProfissionaisServicosController {
  constructor(profissionalServicosService) {
    super();
    this.profissionalServicosService = profissionalServicosService;
  }

  async relacionarProfissionalAServico(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { idProfissional, idServico } = req.body;
    try {
      const resultado =
        await this.profissionalServicosService.relacionarProfissionalAServico(
          idProfissional,
          idServico
        );
      return res.status(201).json(resultado);
    } catch (error) {
      console.error("Erro ao relacionar profissional com serviço:", error);
      return res.status(500).json({ message: error.message });
    }
  }

  async deletarRelacao(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    const { idServico, idProfissional } = req.body;
    try {
      const deletado = await this.profissionalServicosService.deletarRelacao(
        idServico,
        idProfissional
      );
      return res.status(201).json(deletado);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProfissionaisServicosController;
