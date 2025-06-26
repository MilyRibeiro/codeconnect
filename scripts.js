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

const botaoPublicar = document.querySelector('.botao-publicar');

// Agora que conseguimos capturar os dados de dentro do nosso formulário (mudamos esssa função do botâo de publicar lá para baixo), podemos implementar uma simulação de envio do formulário para um back-end, ou seja, para um banco de dados.
// Vamos retornar uma promessa, porque como é uma simulação de um envio para o banco de dados, é o mesmo caso dos outros. Não temos como garantir que vai dar certo e nem garantir que vai dar errado. Precisamos esperar esse processo de envio ser resolvido para retornar essa informação.
// Então, como vamos simular, vamos utilizar um return new Promise(resolve, reject). Depois, vamos definir o que vai ser feito dentro dessa promessa.

async function publicarprojeto(nomeDoProjeto, descricaoDoProjeto, tagsDoProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.3; // Simulando sucesso ou falha aleatória
            if(deuCerto) {
                resolve('Projeto publicado com sucesso!');
            } else {
                reject('Erro ao publicar o projeto. Tente novamente mais tarde.');
            }
        }, 2000); // Simulando um atraso de 2 segundos para o envio
    });
};

// Vamos simular um intervalo de tempo com o setTimeout. E esse timeout vai receber uma arrow function, que vai receber uma variável const deuCerto, que vai receber um número aleatório.
// Conseguiremos esse número aleatório através de Math.random() > 0.3. Então, ele vai retornar a verdade quando um número aleatório, que foi retornado do Math.random, for maior do que 0.5. Senão, ele vai retornar essa promessa como errado.

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById('nome').value;
    const descricaoDoProjeto = document.getElementById('descricao').value;
    const tagsDoProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent);

    try {
        const resultado = await publicarprojeto(nomeDoProjeto, descricaoDoProjeto, tagsDoProjeto);
        console.log(resultado);
        alert('Deu tudo certo!');
    } catch (error) {
        console.error('Deu errado: ', error);
        alert('Deu tudo errado! :(');
        
    }

    const formulario = document.querySelector('form');
    formulario.reset();

    imagemPrincipal.src = './img/imagem1.png';
    nomeDaImagem.textContent = 'image_projeto.png';

    listaTags.innerHTML = "";

    // console.log(nomeDoProjeto);
    // console.log(descricaoDoProjeto);
    // console.log(tagsDoProjeto);
});

const botaoDescartar = document.querySelector('.botao-descartar');

botaoDescartar.addEventListener('click', (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector('form');
    formulario.reset();

    // Para limpar a prévia da imagem e a lista de tags, que estão de fora do formulário:
    imagemPrincipal.src = './img/imagem1.png';
    nomeDaImagem.textContent = 'image_projeto.png';

    listaTags.innerHTML = "";
});

publicarprojeto();