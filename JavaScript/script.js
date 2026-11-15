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
