const API_BASE_URL = 'http://localhost:3001';

class RelatoriosService {
    

    // Implementar filtros para gerar relatórios
    async gerarRelatorioExcel(tipo, filtros) {
      try {
          const token = localStorage.getItem("token");

          // Remove filtros vazios
          const validFilters = Object.fromEntries(
              Object.entries(filtros).filter(([_, value]) => value)
          );

          // Cria query string corretamente incluindo os filtros
          const queryParams = new URLSearchParams();
          queryParams.append("tipo", tipo);
          Object.keys(validFilters).forEach((key) => {
              queryParams.append(`filtros[${key}]`, validFilters[key]);
          });

          const response = await fetch(
              `${API_BASE_URL}/relatorio/gerarExcel?${queryParams.toString()}`,
              {
                  method: "GET",
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                  },
              }
          );

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Erro ao gerar o relatório Excel!");
          }

          const data = await response.blob();
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `relatorio_${tipo}.xlsx`);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
      } catch (error) {
          console.error("Erro ao gerar relatório Excel:", error);
          throw error;
      }
    }
    
    async gerarRelatorioPdf(tipo, filtros) {
      try {
        const token = localStorage.getItem("token");
    
        // Remove filtros vazios
        const validFilters = Object.fromEntries(
          Object.entries(filtros).filter(([_, value]) => value)
        );
    
        // Cria query string corretamente incluindo os filtros
        const queryParams = new URLSearchParams();
        queryParams.append("tipo", tipo);
        Object.keys(validFilters).forEach((key) => {
          queryParams.append(`filtros[${key}]`, validFilters[key]);
        });
    
        const response = await fetch(
          `${API_BASE_URL}/relatorio/gerarPdf?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao gerar relatório PDF!");
        }
    
        const data = await response.blob();
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `relatorio_${tipo}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } catch (error) {
        console.error("Erro ao gerar relatório PDF:", error);
        throw error;
      }
    }
    

}

export default RelatoriosService;
