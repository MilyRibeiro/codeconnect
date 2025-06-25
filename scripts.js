const uploadBtn = document.getElementById("botao-upload");
const inputUpload = document.getElementById("imagem-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();

    document.getElementById('imagem-upload').addEventListener('change', function(event) {
        var file = event.target.files[0];
        
        // Agora temos o arquivo e podemos fazer mais validações

        if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
            alert('Por favor, selecione uma imagem PNG ou JPEG.');
            return;
        };

        // Vamos limitar o tamanho a 2MB
        if (file.size > 2 * 1024 * 1024) {
            alert('A imagem deve ter no máximo 2MB.');
            return;
        };
    });
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        }

        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo");
        }
    };
});
