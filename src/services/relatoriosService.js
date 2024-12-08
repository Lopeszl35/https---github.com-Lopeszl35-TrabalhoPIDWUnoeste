const API_BASE_URL = 'http://localhost:3001';

class RelatoriosService {
    

    // Implementar filtros para gerar relatórios
    async gerarRelatorioExcel(tipo) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/relatorio/gerarExcel?tipo=${tipo}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao gerar o relatório Excel!');
        }
        const data = await response.blob();
        const url = window.URL.createObjectURL(new Blob([data])); // Cria URL do arquivo
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "relatorio_agendamentos.xlsx"); // Nome do arquivo baixado
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } catch (error) {
        throw error;
      }
    }

    async gerarRelatorioPdf(tipo) {
      try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${API_BASE_URL}/relatorio/gerarPdf?tipo=${tipo}`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              },
          });
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Erro ao gerar o relatório PDF!');
          }
          const data = await response.blob();
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `relatorio_${tipo}.pdf`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
      } catch (error) {
          throw error;
      }
  }

}

export default RelatoriosService;
