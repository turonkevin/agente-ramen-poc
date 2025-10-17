// ===================================================
// 1. DECLARAÇÕES INICIAIS (TOPO DO ARQUIVO)
// ===================================================

const apiKey = "AIzaSyAvCBl8AKuIBL02xIjnnTywvWrj0VfliMw"; 
let ai; // A variável 'ai' é declarada aqui, mas será inicializada depois


// ===================================================
// 2. INICIALIZAÇÃO ROBUSTA DA API (Após o DOM estar pronto)
// ===================================================
document.addEventListener('DOMContentLoaded', function() {
    // Usamos um pequeno atraso para dar tempo extra para o script do CDN carregar
    setTimeout(() => {
        if (window.ai && window.ai.GoogleGenAI) {
            try {
                ai = new window.ai.GoogleGenAI({ apiKey });
                console.log("Gemini API inicializada com sucesso!");
                // Limpa qualquer mensagem de erro inicial se a inicialização for bem-sucedida
                const resultadoArea = document.getElementById('resultado');
                if (resultadoArea.value.includes("Erro CRÍTICO")) {
                    resultadoArea.value = ""; // Limpa a mensagem de erro
                }
            } catch (e) {
                console.error("ERRO na inicialização direta da Gemini API:", e.message);
                document.getElementById('resultado').value = "Erro CRÍTICO: Não foi possível inicializar a API. Verifique a chave e a consola.";
            }
        } else {
            console.error("ERRO CRÍTICO: window.ai.GoogleGenAI ainda está indefinido após o DOM e o atraso. Verifique o link do CDN ou bloqueios.");
            document.getElementById('resultado').value = "Erro CRÍTICO: A Inteligência Artificial não pôde ser carregada. Verifique a sua ligação à internet e a consola.";
        }
    }, 500); // Pequeno atraso de 500ms
});


// ===================================================
// 3. FUNÇÃO: O SUPER-PROMPT MESTRE (DEFINIÇÃO)
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
    
    // Verifica se a API foi inicializada com sucesso antes de tentar usá-la
    if (!ai) {
        resultadoArea.value = "Erro: O Assistente Criativo não está pronto. Recarregue a página e verifique a sua ligação à internet.";
        console.error("Tentativa de usar 'ai' antes da inicialização bem-sucedida.");
        return;
    }

    resultadoArea.value = "A preparar o Super-Prompt... O Assistente Criativo está a forjar a sua próxima obra... ✍️✨";

    try {
        const promptFinal = superPromptMestre(pratoInput, temaInput, contextoInput, ctaInput);
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: promptFinal }] }],
        });

        resultadoArea.value = response.text.trim();

    } catch (error) {
        console.error("Falha na Missão Criativa:", error);
        resultadoArea.value = `Falha na Missão Criativa. Erro: ${error.message}. Este pode ser um erro na Chave de API, um limite de uso excedido ou um bloqueio de rede.`;
    }
}