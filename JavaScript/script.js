// ===== Tema salvo: aplicado já no início para evitar piscar =====
(function () {
    try {
        document.documentElement.dataset.tema =
            localStorage.getItem("minertech-tema") === "escuro" ? "escuro" : "claro";
    } catch (e) {
        document.documentElement.dataset.tema = "claro";
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // ===== Menu lateral: recolher (computador) e abrir (celular) =====
    const CHAVE = "minertech-menu";
    const botaoMenu = document.querySelector(".botao-menu");
    const botaoRecolher = document.querySelector(".botao-recolher");

    const lerEscolha = () => { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } };
    const guardarEscolha = (valor) => { try { localStorage.setItem(CHAVE, valor); } catch (e) { /* sem armazenamento */ } };

    const aplicarRecolhido = (recolhido) => {
        body.classList.toggle("menu-recolhido", recolhido);
        if (botaoRecolher) {
            botaoRecolher.setAttribute("aria-expanded", String(!recolhido));
            botaoRecolher.setAttribute("aria-label", recolhido ? "Expandir menu" : "Recolher menu");
        }
        // Com o menu recolhido só aparecem os ícones, então o nome vira dica
        document.querySelectorAll(".menu a").forEach(link => {
            if (recolhido) link.title = link.querySelector(".texto").textContent;
            else link.removeAttribute("title");
        });
    };

    aplicarRecolhido(lerEscolha() === "recolhido");

    if (botaoRecolher) {
        botaoRecolher.addEventListener("click", () => {
            const recolher = !body.classList.contains("menu-recolhido");
            aplicarRecolhido(recolher);
            guardarEscolha(recolher ? "recolhido" : "aberto");
        });
    }

    const fecharMenuCelular = () => {
        body.classList.remove("menu-aberto");
        if (botaoMenu) botaoMenu.setAttribute("aria-expanded", "false");
    };

    if (botaoMenu) {
        botaoMenu.addEventListener("click", () => {
            const aberto = body.classList.toggle("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", String(aberto));
        });
    }
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenuCelular(); });

    // ===== Efeito de aparecer ao rolar =====
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!semMovimento && "IntersectionObserver" in window) {
        const alvos = document.querySelectorAll(
            ".titulo-pagina, .introducao, .numero, .card, .etapa, .integrante, .passos li, " +
            ".infografico, .dicas, .curiosidade, .bloco-formulario, .bloco-info, " +
            "main > section > article, main > section > h2"
        );
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.12 });

        alvos.forEach(el => {
            const posicao = [...el.parentElement.children].indexOf(el);
            el.style.transitionDelay = Math.min(posicao, 4) * 80 + "ms";
            el.classList.add("revelar");
            observador.observe(el);
        });
    }

    // ===== Ampliar infográficos ao clicar =====
    const imagens = document.querySelectorAll(".infografico img");
    if (imagens.length && typeof HTMLDialogElement === "function") {
        const caixa = document.createElement("dialog");
        caixa.className = "lightbox";
        caixa.setAttribute("aria-label", "Imagem ampliada");
        caixa.innerHTML = '<form method="dialog"><button class="fechar" aria-label="Fechar">✕</button></form><img alt="">';
        body.appendChild(caixa);
        const grande = caixa.querySelector("img");

        imagens.forEach(img => {
            img.tabIndex = 0;
            img.setAttribute("role", "button");
            const abrir = () => { grande.src = img.src; grande.alt = img.alt; caixa.showModal(); };
            img.addEventListener("click", abrir);
            img.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); }
            });
        });
        caixa.addEventListener("click", (e) => { if (e.target === caixa) caixa.close(); });
    }

    // ===== Formulário de contato (fictício: nenhum dado é enviado) =====
    const form = document.getElementById("form-contato");
    if (form) {
        const retorno = document.getElementById("retorno");

        const limparErro = (campo) => {
            campo.removeAttribute("aria-invalid");
            campo.removeAttribute("aria-describedby");
            const antigo = document.getElementById("erro-" + campo.id);
            if (antigo) antigo.remove();
        };

        const mostrarErro = (campo, texto) => {
            const aviso = document.createElement("p");
            aviso.className = "erro";
            aviso.id = "erro-" + campo.id;
            aviso.textContent = texto;
            campo.setAttribute("aria-invalid", "true");
            campo.setAttribute("aria-describedby", aviso.id);
            campo.insertAdjacentElement("afterend", aviso);
        };

        const validar = (campo) => {
            const valor = campo.value.trim();
            if (campo.required && !valor) return "Preencha este campo.";
            if (campo.type === "email" && valor && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                return "Digite um e-mail válido, como nome@exemplo.com.";
            }
            return "";
        };

        form.querySelectorAll("input, select, textarea").forEach(campo => {
            campo.addEventListener("input", () => limparErro(campo));
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            retorno.hidden = true;
            let primeiroErro = null;

            form.querySelectorAll("input[required], select[required], textarea[required], input[type=email]").forEach(campo => {
                limparErro(campo);
                const erro = validar(campo);
                if (erro) {
                    mostrarErro(campo, erro);
                    if (!primeiroErro) primeiroErro = campo;
                }
            });

            if (primeiroErro) { primeiroErro.focus(); return; }

            form.reset();
            retorno.hidden = false;
            retorno.scrollIntoView({ behavior: semMovimento ? "auto" : "smooth", block: "nearest" });
        });
    }
    // ===== Filtro por tema (página Pesquisas) =====
    const botoesFiltro = document.querySelectorAll(".filtro-botao");
    if (botoesFiltro.length) {
        const secoesTema = document.querySelectorAll("#mineracao, #lixo-eletronico, #brasil");

        botoesFiltro.forEach(botao => {
            botao.addEventListener("click", () => {
                const tema = botao.dataset.tema;
                botoesFiltro.forEach(outro => outro.setAttribute("aria-pressed", String(outro === botao)));
                secoesTema.forEach(secao => {
                    secao.hidden = tema !== "todos" && secao.id !== tema;
                });
            });
        });
    }

    // ===== Busca no site (bloco na página Início) =====
    const formBusca = document.getElementById("form-busca");
    if (formBusca && typeof indiceBusca !== "undefined") {
        const campoBusca = document.getElementById("campo-busca");
        const resumoBusca = document.getElementById("busca-resumo");
        const listaResultados = document.getElementById("resultados");

        // FUNÇÃO POR EXPRESSÃO (com retorno): deixa o texto em minúsculas e sem acento, letra por letra,
        // para o tamanho do texto não mudar (isso mantém o destaque no lugar certo)
        const normalizar = function (texto) {
            return texto.split("").map(letra =>
                letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            ).join("");
        };

        // Junta a matriz irregular numa lista só: cada linha (página) vira uma lista de itens
        // que já sabem o nome e o arquivo da página, e o concat cola uma lista na outra
        let todosItens = [];
        indiceBusca.forEach((linha, posicaoPagina) => {
            const itensDaPagina = linha.map(item => ({
                titulo: item.titulo,
                texto: item.texto,
                pagina: nomesPaginas[posicaoPagina],
                arquivo: arquivosPaginas[posicaoPagina]
            }));
            todosItens = todosItens.concat(itensDaPagina);
        });

        // Devolve uma lista de verdadeiro/falso: true nas letras que devem ficar destacadas
        const acharTrechos = (texto, palavras) => {
            const limpo = normalizar(texto);
            const marcado = new Array(texto.length).fill(false);
            palavras.forEach(palavra => {
                let posicao = limpo.indexOf(palavra);
                while (posicao !== -1) {
                    for (let i = posicao; i < posicao + palavra.length; i++) marcado[i] = true;
                    posicao = limpo.indexOf(palavra, posicao + 1);
                }
            });
            return marcado;
        };

        // FUNÇÃO SEM RETORNO: escreve o texto no elemento; os trechos marcados vão dentro de <mark>
        function escreverComDestaque(elemento, texto, marcado, inicio, fim) {
            let i = inicio;
            while (i < fim) {
                let j = i;
                while (j < fim && marcado[j] === marcado[i]) j++;
                const pedaco = texto.slice(i, j);
                if (marcado[i]) {
                    const destaque = document.createElement("mark");
                    destaque.textContent = pedaco;
                    elemento.appendChild(destaque);
                } else {
                    elemento.appendChild(document.createTextNode(pedaco));
                }
                i = j;
            }
        }

        // Textos longos viram um pedaço de uns 170 caracteres em volta da primeira palavra achada
        const recortar = (texto, marcado) => {
            const TAMANHO = 170;
            if (texto.length <= TAMANHO) return [0, texto.length];
            let inicio = Math.max(0, marcado.indexOf(true) - 60);
            let fim = Math.min(texto.length, inicio + TAMANHO);
            if (inicio > 0) {
                const espaco = texto.indexOf(" ", inicio);
                if (espaco !== -1 && espaco < fim) inicio = espaco + 1;
            }
            if (fim < texto.length) {
                const espaco = texto.lastIndexOf(" ", fim);
                if (espaco > inicio) fim = espaco;
            }
            return [inicio, fim];
        };

        const buscar = () => {
            const consulta = campoBusca.value.trim();
            listaResultados.replaceChildren();
            if (!consulta) {
                resumoBusca.textContent = "";
                return;
            }

            const palavras = normalizar(consulta).split(/\s+/);

            // filter: fica só com os itens em que TODAS as palavras (every) aparecem no título ou no texto (includes)
            const achados = todosItens.filter(item => {
                const tituloLimpo = normalizar(item.titulo);
                const textoLimpo = normalizar(textos[item.texto]);
                return palavras.every(palavra => tituloLimpo.includes(palavra) || textoLimpo.includes(palavra));
            });

            achados.forEach(item => {
                const texto = textos[item.texto];
                const linha = document.createElement("li");

                const cabeca = document.createElement("p");
                cabeca.className = "resultado-cabeca";
                const link = document.createElement("a");
                link.href = item.arquivo + "#texto-" + item.texto;
                escreverComDestaque(link, item.titulo, acharTrechos(item.titulo, palavras), 0, item.titulo.length);
                const nomePagina = document.createElement("span");
                nomePagina.className = "resultado-pagina";
                nomePagina.textContent = " · " + item.pagina;
                cabeca.append(link, nomePagina);

                const marcadoTexto = acharTrechos(texto, palavras);
                const [inicio, fim] = recortar(texto, marcadoTexto);
                const trecho = document.createElement("p");
                trecho.className = "resultado-trecho";
                if (inicio > 0) trecho.append("… ");
                escreverComDestaque(trecho, texto, marcadoTexto, inicio, fim);
                if (fim < texto.length) trecho.append("…");

                linha.append(cabeca, trecho);
                listaResultados.appendChild(linha);
            });

            resumoBusca.textContent = achados.length
                ? achados.length + " resultado(s) para “" + consulta + "”."
                : "Nenhum resultado para “" + consulta + "”.";
        };

        formBusca.addEventListener("submit", (e) => { e.preventDefault(); buscar(); });
        campoBusca.addEventListener("input", buscar);
    }

    // ===== Quiz (final da página Pesquisas) =====
    const areaQuiz = document.getElementById("quiz-area");
    if (areaQuiz && typeof perguntasQuiz !== "undefined" && typeof alternativasQuiz !== "undefined") {
        const criar = (tag, classe, texto) => {
            const elemento = document.createElement(tag);
            if (classe) elemento.className = classe;
            if (texto) elemento.textContent = texto;
            return elemento;
        };

        const montarQuiz = () => {
            areaQuiz.replaceChildren();
            let terminou = false;

            // Uma "caixinha" (fieldset) por pergunta, com uma opção (radio) para cada alternativa
            const grupos = perguntasQuiz.map((pergunta, n) => {
                const grupo = criar("fieldset", "quiz-grupo");
                grupo.appendChild(criar("legend", "quiz-pergunta", (n + 1) + ". " + pergunta));
                alternativasQuiz[n].forEach((texto, posicao) => {
                    const rotulo = criar("label", "quiz-opcao");
                    const radio = document.createElement("input");
                    radio.type = "radio";
                    radio.name = "pergunta-" + n;
                    radio.value = String(posicao);
                    rotulo.append(radio, criar("span", "", texto));
                    grupo.appendChild(rotulo);
                });
                areaQuiz.appendChild(grupo);
                return grupo;
            });

            const resultado = criar("p", "quiz-resultado-texto");
            resultado.setAttribute("aria-live", "polite");
            const botao = criar("button", "botao botao-escuro", "Ver resultado");
            botao.type = "button";
            areaQuiz.append(resultado, botao);

            botao.addEventListener("click", () => {
                // Depois do resultado, o mesmo botão serve para repetir o quiz
                if (terminou) { montarQuiz(); return; }

                // Só continua se todas as perguntas tiverem uma opção marcada
                if (grupos.some(grupo => !grupo.querySelector("input:checked"))) {
                    resultado.textContent = "Responda todas as perguntas para ver o resultado.";
                    return;
                }

                let acertos = 0;
                grupos.forEach((grupo, n) => {
                    const escolhida = Number(grupo.querySelector("input:checked").value);
                    const rotulos = grupo.querySelectorAll(".quiz-opcao");
                    if (escolhida === gabaritoQuiz[n]) acertos++;
                    else rotulos[escolhida].classList.add("errada");
                    rotulos[gabaritoQuiz[n]].classList.add("certa");
                    grupo.querySelectorAll("input").forEach(radio => { radio.disabled = true; });
                });

                resultado.textContent = "Você acertou " + acertos + " de " + perguntasQuiz.length + ".";
                botao.textContent = "Repetir o quiz";
                terminou = true;
            });
        };

        montarQuiz();
    }

    // ===== Botão de tema (interruptor sol/lua no cabeçalho) =====
    const raiz = document.documentElement;
    const CHAVE_TEMA = "minertech-tema";
    const cabecalho = document.querySelector(".cabecalho");

    if (cabecalho) {
        const botaoTema = document.createElement("button");
        botaoTema.type = "button";
        botaoTema.className = "alternar-tema";
        botaoTema.setAttribute("role", "switch");
        botaoTema.setAttribute("aria-label", "Tema escuro");
        botaoTema.innerHTML =
            '<span class="sol" aria-hidden="true">☀\uFE0E</span>' +
            '<span class="lua" aria-hidden="true">☾</span>' +
            '<span class="bola" aria-hidden="true"></span>';
        cabecalho.appendChild(botaoTema);

        const aplicarTema = (escuro) => {
            raiz.dataset.tema = escuro ? "escuro" : "claro";
            botaoTema.setAttribute("aria-checked", String(escuro));
            botaoTema.title = escuro ? "Mudar para o tema claro" : "Mudar para o tema escuro";
        };
        aplicarTema(raiz.dataset.tema === "escuro");

        botaoTema.addEventListener("click", () => {
            const escuro = raiz.dataset.tema !== "escuro";
            if (!semMovimento) {
                raiz.classList.add("trocando-tema");
                setTimeout(() => raiz.classList.remove("trocando-tema"), 450);
            }
            aplicarTema(escuro);
            try { localStorage.setItem(CHAVE_TEMA, escuro ? "escuro" : "claro"); } catch (e) { /* sem armazenamento */ }
        });
    }

    // ===== Botão de voltar ao topo (círculo com seta e anel de progresso) =====
    const voltarTopo = document.createElement("button");
    voltarTopo.type = "button";
    voltarTopo.className = "voltar-topo";
    voltarTopo.setAttribute("aria-label", "Voltar ao topo");
    voltarTopo.title = "Voltar ao topo";
    voltarTopo.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    body.appendChild(voltarTopo);

    let atualizacaoPendente = false;
    const atualizarTopo = () => {
        const maximo = raiz.scrollHeight - window.innerHeight;
        const porcentagem = maximo > 0 ? Math.min(100, Math.round(window.scrollY / maximo * 100)) : 0;
        voltarTopo.style.setProperty("--progresso", porcentagem);
        voltarTopo.classList.toggle("mostrar", window.scrollY > 400);
        atualizacaoPendente = false;
    };
    window.addEventListener("scroll", () => {
        if (!atualizacaoPendente) { atualizacaoPendente = true; requestAnimationFrame(atualizarTopo); }
    }, { passive: true });
    window.addEventListener("resize", atualizarTopo);
    atualizarTopo();

    voltarTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: semMovimento ? "auto" : "smooth" });
    });
});
