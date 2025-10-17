// ===================================================
// 1. DECLARAÇÕES INICIAIS (TOPO DO ARQUIVO)
// ===================================================

// Sua Chave de API 
// ATENÇÃO: A GSI (nova rota) exige que você use o API Key gerado no Google AI Studio.
const apiKey = "AIzaSyAvCBl8AKuIBL02xIjnnTywvWrj0VfliMw"; 
let ai; // Variável global para a API, agora será uma instância do modelo


// ===================================================
// 2. FUNÇÃO: O SUPER-PROMPT MESTRE (DEFINIÇÃO)
// ===================================================
const superPromptMestre = (prato, tema, contexto, cta) => {
    return `
        Instrução Mestra: 
        Você é o Assistente Criativo de Conteúdo (A.C.C.) da Ignite Agent, especialista em branding para restaurantes de Anime/Mangá.
        
        Perfil da Marca: BugaRAMEN
        Tom de Voz: Jovial, Épico, Imersivo, Acolhedor. Foco na JORNADA GASTRO-CULTURAL, DESCOBERTA, RITUAL e AVENTURA.
        
        Regras de Marca:
        - NÃO USE: "delicioso", "barato", "melhor da cidade", "item lendário", "arma", "ataque", "batalha".
        - USE palavras como: "Missão", "Jornada", "Capítulo", "Ritual", "Conforto", "Universo", "Magia", "Exploração", "Essência", "Autenticidade", "Saga".
        - Utilize emojis temáticos: 🍜🔥⛩️🌸✨👻🎃.

        Objetivo: Criar uma legenda autêntica, criativa e inovadora.

        Com base nos seguintes inputs, gere a legenda:
        1. PRATO/INGREDIENTE: ${prato}
        2. TEMA/VIBE (Anime/Mangá): ${tema}
        3. CONTEXTO/EVENTO: ${contexto} 
        4. OBJETIVO (CTA): ${cta}
        
        Tarefa Final:
        Crie uma legenda de Instagram com no máximo 4 frases curtas e envolventes. A legenda deve ser imediatamente seguida por uma lista de 5 a 7 hashtags relevantes.
    `;
};


// ===================================================
// 3. INICIALIZAÇÃO ROBUSTA DA API (Sondagem GSI/GIS)
// ===================================================
document.addEventListener('DOMContentLoaded', function() {
    
    const resultadoArea = document.getElementById('resultado');
    // Indica o estado de carregamento inicial
    resultadoArea.value = "A carregar o Assistente Criativo... Aguarde um momento. ⏱️";

    const checkApiReady = setInterval(() => {
        // MUDANÇA CRÍTICA: Agora verifica o objeto 'google.genai' (GSI/GIS)
        if (window.google && window.google.genai) { 
            // A API está pronta!
            clearInterval(checkApiReady); // Para de sondar

            try {
                // Instancia o modelo diretamente via google.genai (nova sintaxe GIS/GSI)
                ai = new window.google.genai.GenerativeModel({
                    apiKey: apiKey,
                    model: 'gemini-2.5-flash', // Modelo definido na inicialização
                }); 
                
                console.log("Gemini API inicializada com sucesso!");
                resultadoArea.value = "Assistente Criativo pronto para a missão! Preencha os campos e gere a sua legenda épica.";
            } catch (e) {
                console.error("ERRO na inicialização da Gemini API (GSI/GIS):", e.message);
                resultadoArea.value = "Erro CRÍTICO: Não foi possível inicializar a API. Verifique a chave e a consola.";
            }
        } else {
            // Continua a sondar enquanto o script CDN não carrega
            console.log("A aguardar o carregamento da Gemini API...");
        }
    }, 100); // Tenta verificar a cada 100ms
});


// ===================================================
// 4. FUNÇÃO PRINCIPAL: GERAR CONTEÚDO (CHAMADA PELO BOTÃO)
// ===================================================
async function gerarLegenda() {
    const pratoInput = document.getElementById('prato').value;
    const temaInput = document.getElementById('tema').value;
    const contextoInput = document.getElementById('contexto').value;
    const ctaInput = document.getElementById('cta').value;
    const resultadoArea = document.getElementById('resultado');

    if (!pratoInput || !ctaInput) {
        resultadoArea.value = "Os campos 'Prato/Ingrediente' e 'Objetivo (CTA)' são essenciais para iniciar a vossa missão criativa.";
        return;
    }
    
    // Verifica se a API foi inicializada com sucesso
    if (!ai) {
        resultadoArea.value = "Erro: O Assistente Criativo não está pronto. Recarregue a página e verifique a sua ligação à internet.";
        return;
    }

    resultadoArea.value = "A preparar o Super-Prompt... O Assistente Criativo está a forjar a sua próxima obra... ✍️✨";

    try {
        const promptFinal = superPromptMestre(pratoInput, temaInput, contextoInput, ctaInput);
        
        // Chamada de API para geração de conteúdo (Sintaxe para instância de modelo GSI)
        const response = await ai.generateContent(promptFinal);

        resultadoArea.value = response.text.trim();

    } catch (error) {
        console.error("Falha na Missão Criativa:", error);
        resultadoArea.value = `Falha na Missão Criativa. Erro: ${error.message}. (Verifique a chave de API ou se excedeu os limites).`;
    }
}
