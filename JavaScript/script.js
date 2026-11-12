document.addEventListener("DOMContentLoaded", () => {
    const botao = document.querySelector(".botao-menu");

    botao.addEventListener("click", () => {
        const aberto = document.body.classList.toggle("menu-aberto");
        botao.setAttribute("aria-expanded", aberto);
    });
});
