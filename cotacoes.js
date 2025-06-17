// Arquivo para integração de cotações em tempo real
document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar cotações em tempo real
    async function fetchCotacoes() {
        const cotacoesContainer = document.querySelector('.cotacoes-container');
        const cotacaoData = document.querySelector('.cotacao-data');
        
        try {
            // Simulação de API de cotações em tempo real
            // Em produção, substituir por uma API real de cotações agropecuárias
            const apiUrl = 'https://api.example.com/cotacoes'; // URL fictícia
            
            // Mostrar indicador de carregamento
            cotacoesContainer.innerHTML = `
                <div class="cotacao-item loading">
                    <span>Carregando cotações...</span>
                </div>
            `;
            
            // Simulação de resposta da API (em produção, usar fetch real)
            // const response = await fetch(apiUrl);
            // const data = await response.json();
            
            // Dados simulados para demonstração
            const data = {
                cotacoes: [
                    { nome: 'Boi', valor: 'R$ 300,00', tendencia: 'up' },
                    { nome: 'Soja', valor: 'R$ 130,00', tendencia: 'up' },
                    { nome: 'Milho', valor: 'R$ 90,00', tendencia: 'down' },
                    { nome: 'Arroz', valor: 'R$ 75,00', tendencia: 'down' }
                ],
                atualizadoEm: new Date().toLocaleString('pt-BR')
            };
            
            // Limpar o container
            cotacoesContainer.innerHTML = '';
            
            // Preencher com dados atualizados
            data.cotacoes.forEach(cotacao => {
                const cotacaoItem = document.createElement('div');
                cotacaoItem.className = 'cotacao-item';
                
                cotacaoItem.innerHTML = `
                    <span class="cotacao-nome">${cotacao.nome}:</span>
                    <span class="cotacao-valor">${cotacao.valor}</span>
                    <span class="cotacao-tendencia ${cotacao.tendencia}">
                        <i class="fas fa-arrow-${cotacao.tendencia === 'up' ? 'up' : 'down'}"></i>
                    </span>
                `;
                
                cotacoesContainer.appendChild(cotacaoItem);
            });
            
            // Atualizar data
            cotacaoData.innerHTML = `<p>Atualizado em: ${data.atualizadoEm}</p>`;
            
        } catch (error) {
            console.error('Erro ao buscar cotações:', error);
            
            // Exibir mensagem de erro amigável
            cotacoesContainer.innerHTML = `
                <div class="cotacao-item error">
                    <span>Não foi possível carregar as cotações. Tente novamente mais tarde.</span>
                </div>
            `;
        }
    }
    
    // Função para atualizar cotações periodicamente
    function iniciarAtualizacaoCotacoes() {
        // Buscar cotações imediatamente
        fetchCotacoes();
        
        // Atualizar a cada 5 minutos (300000 ms)
        // Em produção, ajustar conforme necessidade e disponibilidade da API
        setInterval(fetchCotacoes, 300000);
    }
    
    // Iniciar atualização de cotações
    iniciarAtualizacaoCotacoes();
});
