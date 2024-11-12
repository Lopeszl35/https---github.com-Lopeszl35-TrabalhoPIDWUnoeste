const { validationResult } = require("express-validator");
const AbstractProfissionaisServicosController = require("./abstratos/AbstractProfissionalServicosController");

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
      return res.status(400).json({ errors: errors.array() });
    }
    const { idProfissional, idServico } = req.body;
    console.log("Body:", req.body);
    try {
      const resultado = await this.profissionalServicosService.deletarRelacao(
        idProfissional,
        idServico
      );
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async profissionaisDoServico(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty) {
      return res.status(400).json({errors: errors.array()})
    }
    const { id } = req.params;
    try {
      const resultado =
        await this.profissionalServicosService.obterRelacoesServico(id);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async buscarProfissionais(req, res ) {
    const errors = validationResult(req);
    if(!errors.isEmpty) {
      return res.status(400).json({errors: errors.array()})
    }
    const { searchTerm, searchType } = req.params;
    try {
      const resultado = await this.profissionalServicosService.buscarProfissionais(searchTerm, searchType);
      return res.status(200).json(resultado);
    } catch (error) {
      console.error("Erro ao buscar profissionais: ", error);
      return res.status(500).json({message: error.message});
    }
  }
}

module.exports = ProfissionaisServicosController;
