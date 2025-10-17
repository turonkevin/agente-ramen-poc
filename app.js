<!DOCTYPE html>
<html lang="pt">
<head>
    </head>
<body>
    <button onclick="gerarLegenda()">⚡ Gerar Legenda Épica</button>

    <h2>Output do A.M.R.M. (Revisar e Publicar):</h2>
    <textarea id="resultado" rows="10" cols="60" readonly></textarea>
    
    <script type="module">
        // Importa a classe principal do CDN mais estável (ESM)
        import { GoogleGenAI } from 'https://cdn.jsdelivr.net/npm/@google/genai@0.1.0/esm/index.js';
        
        // CRÍTICO: Anexa a classe a 'window' para que o app.js possa encontrá-la.
        window.GoogleGenAI = GoogleGenAI;
    </script>
    
    <script defer src="app.js"></script>
</body>
</html>
