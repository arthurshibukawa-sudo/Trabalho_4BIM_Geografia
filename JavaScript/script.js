document.addEventListener("DOMContentLoaded", () => {

    // ===== Favicon (igual em todas as páginas) =====
    [
        { rel: "icon", type: "image/x-icon", href: "imagens/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "imagens/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "imagens/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "imagens/apple-touch-icon.png" }
    ].forEach(attrs => {
        const link = document.createElement("link");
        Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
        document.head.appendChild(link);
    });

    // ===== Página atual =====
    const paginaAtual = decodeURIComponent(location.pathname.split("/").pop()) || "index.html";

    // ===== Páginas do menu: [arquivo, texto] =====
    const paginas = [
        ["index.html", "Início"],
        ["sobre.html", "Sobre"],
        ["pesquisas.html", "Pesquisas"],
        ["problema.html", "Problema"],
        ["logistica_reversa.html", "Logística reversa"],
        ["contato.html", "Contato"]
    ];

    const links = paginas.map(([href, texto]) =>
        `<a href="${href}"${href === paginaAtual ? ' class="ativo" aria-current="page"' : ""}>${texto}</a>`
    ).join("");

    // ===== Cabeçalho (logo + nome) e menu lateral =====
    document.body.insertAdjacentHTML("afterbegin", `
        <header class="cabecalho">
            <button class="botao-menu" aria-label="Abrir menu" aria-expanded="false">☰</button>
            <a href="index.html" class="marca">
                <img src="imagens/logo.png" alt="Logotipo MinerTech" class="logo">
                <span class="nome-site">Miner<span>Tech</span></span>
            </a>
        </header>

        <aside class="menu-lateral">
            <h2 class="menu-titulo">Menu</h2>
            <nav class="menu">${links}</nav>
            <img src="imagens/logo.png" alt="" class="logo-menu">
        </aside>
    `);

    // ===== Rodapé =====
    document.body.insertAdjacentHTML("beforeend", `
        <footer class="rodape">
            <div class="rodape-info">
                <h2>Miner<span>Tech</span></h2>
                <p>Um projeto dedicado à conscientização sobre os impactos do lixo eletrônico e à promoção da sustentabilidade por meio da reciclagem e da logística reversa.</p>
            </div>
            <div class="rodape-contato">
                <h3>Contato</h3>
                <p>Entre em contato com nossa equipe.</p>
                <a href="contato.html">Fale conosco</a>
            </div>
            <p class="rodape-final">MinerTech - Projeto Educacional © 2026 · Tecnologia, responsabilidade e sustentabilidade.</p>
        </footer>
    `);

    // ===== Botão do menu (celular) =====
    const botao = document.querySelector(".botao-menu");
    botao.addEventListener("click", () => {
        const aberto = document.body.classList.toggle("menu-aberto");
        botao.setAttribute("aria-expanded", aberto);
    });
});
