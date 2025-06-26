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

const inputTags = document.getElementById('categoria');
const listaTags = document.getElementById('lista-tags');

// Removendo tags:
listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    };
});

// Adicionando novas tags:
const tagsDisponiveis = ["Front-end", "front-end", "back-end", "Back-end", "Programação", "programação", "Data Science", "data science", "Full-stack", "full-stack", "HTML", "CSS", "JavaScript", "PHP", "Python", "Java", "C#", "Ruby", "Swift", "Kotlin", "TypeScript", "React", "Vue.js", "Angular", "Node.js", "Django", "Flask", "Spring Boot", "Express.js", "GraphQL", "REST API"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
        // Simulando uma chamada assíncrona para verificar se a tag existe: por ser uma simulação, vamos usar setTimeout.
        // Em um cenário real, você poderia fazer uma requisição a um servidor ou API para verificar a existência da tag.
    });
};

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
               const tagExiste = await verificaTagsDisponiveis(tagTexto);
               if(tagExiste) {
                   const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                } else {
                    alert('Tag inválida!');
                }
            } catch (error) {
                console.error('Erro ao verificar se a tag existe.');
                alert("Erro ao verificar a tag. Verifique o console.");
            };
        };
    };
});