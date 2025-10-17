// ===================================================
// 1. DECLARAÇÕES INICIAIS (TOPO DO ARQUIVO)
// ===================================================

const apiKey = "AIzaSyAvCBl8AKuIBL02xIjnnTywvWrj0VfliMw"; 
let ai; 
// ... (RESTO DO CÓDIGO superPromptMestre INALTERADO) ...

// ===================================================
// 3. INICIALIZAÇÃO ROBUSTA DA API (Sondagem Módulo)
// ===================================================
document.addEventListener('DOMContentLoaded', function() {
    
    const resultadoArea = document.getElementById('resultado');
    resultadoArea.value = "A carregar o Assistente Criativo... Aguarde um momento. ⏱️";

    const checkApiReady = setInterval(() => {
        // CORREÇÃO FINAL: Verifica o objeto que anexamos no script type="module" do index.html
        if (window.GoogleGenAI) { 
            // A API está pronta!
            clearInterval(checkApiReady); 

            try {
                // Instancia usando a classe que veio do módulo
                ai = new window.GoogleGenAI({ apiKey }); 
                
                console.log("Gemini API inicializada com sucesso!");
                resultadoArea.value = "Assistente Criativo pronto para a missão! Preencha os campos e gere a sua legenda épica.";
            } catch (e) {
                console.error("ERRO na inicialização direta da Gemini API:", e.message);
                resultadoArea.value = "Erro CRÍTICO: Não foi possível inicializar a API. Verifique a chave e a consola.";
            }
        } else {
            console.log("A aguardar o carregamento da Gemini API...");
        }
    }, 100); 
});

// ===================================================
// 4. FUNÇÃO PRINCIPAL: GERAR CONTEÚDO (CHAMADA PELO BOTÃO)
// ===================================================
// ... (RESTO DA FUNÇÃO gerarLegenda INALTERADO) ...
async function gerarLegenda() {
    // ... (restante da função)
    try {
        const promptFinal = superPromptMestre(pratoInput, temaInput, contextoInput, ctaInput);
        
        // Chamada de API para geração de conteúdo (Sintaxe para GoogleGenAI)
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: promptFinal }] }],
        });

        resultadoArea.value = response.text.trim();

    } catch (error) {
        // ... (restante do catch)
    }
}
