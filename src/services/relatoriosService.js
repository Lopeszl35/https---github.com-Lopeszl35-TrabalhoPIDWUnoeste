// services/relatoriosService.js
class RelatoriosService {
    // Método para buscar todos os relatórios
    async buscarRelatorios() {
      try {
        const response = await fetch('/api/relatorios'); // Endpoint para buscar os relatórios
        if (!response.ok) {
          throw new Error('Erro ao buscar relatórios');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Erro ao buscar relatórios');
      }
    }
  
    // Método para exportar o relatório em formato CSV ou outro formato
    async exportarRelatorio(idRelatorio) {
      try {
        const response = await fetch(`/api/relatorios/exportar/${idRelatorio}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        });
  
        if (!response.ok) {
          throw new Error('Erro ao exportar relatório');
        }
        return response.blob(); // Retorna o arquivo como um blob para download
      } catch (error) {
        throw new Error('Erro ao exportar relatório');
      }
    }
  }
  
  export default RelatoriosService;  