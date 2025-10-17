// ===================================================
// 1. DECLARAÇÕES INICIAIS (TOPO DO ARQUIVO)
// ===================================================

// Sua Chave de API 
const apiKey = "AIzaSyAvCBl8AKuIBL02xIjnnTywvWrj0VfliMw"; 
let ai; // Variável global para a API, inicializada abaixo


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
// 3. INICIALIZAÇÃO ROBUSTA DA API (Sondagem Garantida)
// ===================================================
document.addEventListener('DOMContentLoaded', function() {
    
    const resultadoArea = document.getElementById('resultado');
    // Indica o estado de carregamento inicial
    resultadoArea.value = "A carregar o Assistente Criativo... Aguarde um momento. ⏱️";

    const checkApiReady = setInterval(() => {
        // CORREÇÃO FINAL: Verifica se a classe foi anexada pelo módulo do index.html
        if (window.GoogleGenAI) { 
            // A API está pronta!
            clearInterval(checkApiReady); // Para de sondar

            try {
                // Inicializa a variável 'ai' usando a classe global
                ai = new window.GoogleGenAI({ apiKey }); 
                console.log("Gemini API inicializada com sucesso!");
                resultadoArea.value = "Assistente Criativo pronto para a missão! Preencha os campos e gere a sua legenda épica.";
            } catch (e) {
                console.error("ERRO na inicialização direta da Gemini API:", e.message);
                // Pode ser um problema com a chave, mas a API carregou.
                resultadoArea.value = "Erro CRÍTICO: Não foi possível inicializar a API. Verifique a chave e a consola.";
            }
        } else {
            // O script ainda não carregou (Isto deve parar após alguns tiques)
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
        
        // Chamada de API para geração de conteúdo
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: promptFinal }] }],
        });

        resultadoArea.value = response.text.trim();

    } catch (error) {
        console.error("Falha na Missão Criativa:", error);
        // Informação clara de erro para o utilizador
        resultadoArea.value = `Falha na Missão Criativa. Erro: ${error.message}. (Verifique a sua chave de API ou se atingiu o limite de uso).`;
    }
}
