// Arquivo para integração de notícias automatizadas
document.addEventListener('DOMContentLoaded', function() {
    // Função para buscar notícias via API
    async function fetchNoticias() {
        const noticiasContainer = document.getElementById('noticias-container');
        
        try {
            // Usando a API do RSS2JSON para converter feeds RSS em JSON
            // Feeds de notícias agropecuárias relevantes para Roraima
            const apiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.canalrural.com.br%2Frss%2F';
            
            // Mostrar indicador de carregamento
            noticiasContainer.innerHTML = `
                <div class="noticia-card">
                    <h3>Carregando notícias...</h3>
                    <p>Aguarde enquanto buscamos as notícias mais recentes sobre agronegócio.</p>
                </div>
            `;
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error('Falha ao buscar notícias');
            }
            
            const data = await response.json();
            
            // Limpar o container de notícias
            noticiasContainer.innerHTML = '';
            
            // Verificar se temos itens para exibir
            if (data.items && data.items.length > 0) {
                // Exibir até 3 notícias mais recentes
                const maxNoticias = Math.min(3, data.items.length);
                
                for (let i = 0; i < maxNoticias; i++) {
                    const noticia = data.items[i];
                    
                    // Criar elemento de notícia
                    const noticiaCard = document.createElement('div');
                    noticiaCard.className = 'noticia-card';
                    
                    // Extrair a data de publicação e formatá-la
                    const pubDate = new Date(noticia.pubDate);
                    const dataFormatada = pubDate.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    
                    // Limitar o tamanho da descrição
                    let descricao = noticia.description;
                    // Remover tags HTML da descrição
                    descricao = descricao.replace(/<\/?[^>]+(>|$)/g, "");
                    // Limitar a 150 caracteres
                    if (descricao.length > 150) {
                        descricao = descricao.substring(0, 150) + '...';
                    }
                    
                    // Criar página de notícia individual
                    const noticiaSlug = slugify(noticia.title);
                    
                    // Armazenar o conteúdo da notícia no localStorage para uso posterior
                    const noticiaData = {
                        title: noticia.title,
                        pubDate: dataFormatada,
                        content: noticia.content,
                        description: descricao,
                        link: noticia.link,
                        author: noticia.author || 'Equipe Fazendas em Roraima',
                        categories: noticia.categories || []
                    };
                    
                    localStorage.setItem(`noticia_${noticiaSlug}`, JSON.stringify(noticiaData));
                    
                    const noticiaUrl = `noticia.html?id=${noticiaSlug}`;
                    
                    // Preencher o conteúdo da notícia
                    noticiaCard.innerHTML = `
                        <h3>${noticia.title}</h3>
                        <p class="noticia-data">${dataFormatada}</p>
                        <p>${descricao}</p>
                        <a href="${noticiaUrl}" class="link">Ler mais</a>
                    `;
                    
                    // Adicionar ao container
                    noticiasContainer.appendChild(noticiaCard);
                }
                
                // Adicionar botão para ver mais notícias
                const verMaisBtn = document.createElement('div');
                verMaisBtn.className = 'ver-mais';
                verMaisBtn.innerHTML = '<a href="noticias-lista.html" class="btn">Ver Todas as Notícias</a>';
                noticiasContainer.appendChild(verMaisBtn);
                
            } else {
                // Exibir mensagem se não houver notícias
                noticiasContainer.innerHTML = `
                    <div class="noticia-card">
                        <h3>Nenhuma notícia disponível no momento</h3>
                        <p>Tente novamente mais tarde ou entre em contato conosco para informações atualizadas sobre o agronegócio em Roraima.</p>
                    </div>
                `;
            }
            
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
            
            // Exibir mensagem de erro amigável
            noticiasContainer.innerHTML = `
                <div class="noticia-card">
                    <h3>Não foi possível carregar as notícias</h3>
                    <p>Estamos enfrentando problemas técnicos. Por favor, tente novamente mais tarde.</p>
                </div>
            `;
            
            // Tentar usar notícias de backup
            carregarNoticiasFallback();
        }
    }
    
    // Função para carregar notícias de backup em caso de falha na API
    function carregarNoticiasFallback() {
        const noticiasContainer = document.getElementById('noticias-container');
        
        // Notícias estáticas de backup
        const noticiasFallback = [
            {
                titulo: 'Produção de soja em Roraima atinge recorde histórico',
                data: '22/05/2025',
                descricao: 'A safra 2024/2025 superou todas as expectativas com aumento de 15% na produtividade...',
                slug: 'producao-soja-roraima',
                content: '<p>A produção de soja em Roraima atingiu um recorde histórico na safra 2024/2025, superando todas as expectativas do setor. Com um aumento de 15% na produtividade em relação à safra anterior, o estado se consolida como uma importante fronteira agrícola no Norte do país.</p><p>Segundo dados da Companhia Nacional de Abastecimento (Conab), a área plantada cresceu 10% e a produtividade média alcançou 3.500 kg por hectare, valor superior à média nacional. Especialistas atribuem esse resultado às condições climáticas favoráveis, ao uso de tecnologias avançadas e ao manejo adequado do solo.</p><p>O presidente da Associação dos Produtores de Soja de Roraima, João Silva, destaca que o resultado é fruto de anos de investimento em pesquisa e adaptação de cultivares às condições específicas da região. "Estamos colhendo os frutos de um trabalho que começou há mais de uma década, com muita pesquisa e dedicação dos produtores", afirma.</p><p>A expectativa é que o crescimento continue nos próximos anos, com a abertura de novos mercados e o aumento da demanda global por alimentos.</p>'
            },
            {
                titulo: 'Novas tecnologias para agricultura em clima amazônico',
                data: '18/05/2025',
                descricao: 'Pesquisadores desenvolvem técnicas adaptadas às condições específicas de Roraima...',
                slug: 'tecnologias-agricultura-amazonica',
                content: '<p>Um grupo de pesquisadores da Embrapa Roraima apresentou nesta semana um conjunto de novas tecnologias desenvolvidas especificamente para a agricultura em clima amazônico. As inovações prometem revolucionar o cultivo de grãos e frutas na região, aumentando a produtividade e reduzindo o impacto ambiental.</p><p>Entre as tecnologias apresentadas, destaca-se um sistema de irrigação inteligente que utiliza sensores para monitorar a umidade do solo e ajustar automaticamente a quantidade de água fornecida às plantas. O sistema, que pode ser controlado remotamente por smartphone, promete reduzir o consumo de água em até 40%.</p><p>Outra inovação importante é um biofertilizante desenvolvido a partir de microorganismos nativos da Amazônia, que melhora a absorção de nutrientes pelas plantas e aumenta a resistência a pragas e doenças. Testes realizados em fazendas experimentais mostraram um aumento de produtividade de até 25% em culturas como milho e feijão.</p><p>"Estas tecnologias foram desenvolvidas pensando nas particularidades do nosso ecossistema. Não adianta simplesmente importar soluções de outras regiões, precisamos de abordagens específicas para o clima e solo amazônicos", explica a Dra. Maria Oliveira, coordenadora do projeto.</p>'
            },
            {
                titulo: 'Feira agropecuária de Boa Vista acontece em junho',
                data: '15/05/2025',
                descricao: 'O evento reunirá produtores, fornecedores e compradores de todo o estado...',
                slug: 'feira-agropecuaria-boa-vista',
                content: '<p>A 35ª edição da Feira Agropecuária de Boa Vista (ExpoRR) acontecerá entre os dias 5 e 15 de junho no Parque de Exposições da capital roraimense. O evento, que é considerado o maior do setor no estado, reunirá produtores rurais, fornecedores de insumos, maquinário agrícola e compradores de todo o Brasil.</p><p>A programação inclui exposições de animais, demonstrações de novas tecnologias, palestras técnicas, leilões e shows musicais. A expectativa dos organizadores é receber mais de 100 mil visitantes durante os dez dias de feira e movimentar cerca de R$ 50 milhões em negócios.</p><p>Este ano, a ExpoRR terá como tema "Agronegócio Sustentável: Produzindo com Responsabilidade", com destaque para práticas que conciliam produtividade e preservação ambiental. Um pavilhão inteiro será dedicado a tecnologias sustentáveis para o campo.</p><p>"A feira é uma vitrine do potencial agropecuário de Roraima e uma oportunidade única para fechar negócios e conhecer as novidades do setor. Este ano, estamos com foco especial na sustentabilidade, que é um tema cada vez mais importante para o agronegócio moderno", afirma Carlos Mendes, presidente do Sindicato Rural de Boa Vista, entidade organizadora do evento.</p>'
            }
        ];
        
        // Limpar o container
        noticiasContainer.innerHTML = '';
        
        // Adicionar notícias de backup
        noticiasFallback.forEach(noticia => {
            const noticiaCard = document.createElement('div');
            noticiaCard.className = 'noticia-card';
            
            // Armazenar o conteúdo da notícia no localStorage para uso posterior
            const noticiaData = {
                title: noticia.titulo,
                pubDate: noticia.data,
                content: noticia.content,
                description: noticia.descricao,
                link: '#',
                author: 'Equipe Fazendas em Roraima',
                categories: []
            };
            
            localStorage.setItem(`noticia_${noticia.slug}`, JSON.stringify(noticiaData));
            
            noticiaCard.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <p class="noticia-data">${noticia.data}</p>
                <p>${noticia.descricao}</p>
                <a href="noticia.html?id=${noticia.slug}" class="link">Ler mais</a>
            `;
            
            noticiasContainer.appendChild(noticiaCard);
        });
        
        // Adicionar botão para ver mais notícias
        const verMaisBtn = document.createElement('div');
        verMaisBtn.className = 'ver-mais';
        verMaisBtn.innerHTML = '<a href="noticias-lista.html" class="btn">Ver Todas as Notícias</a>';
        noticiasContainer.appendChild(verMaisBtn);
    }
    
    // Função para converter título em slug para URL
    function slugify(text) {
        return text
            .toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    }
    
    // Iniciar busca de notícias imediatamente
    fetchNoticias();
});
