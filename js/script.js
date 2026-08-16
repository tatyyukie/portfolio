tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
                display: [
                    "Space Grotesk",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                ],
                mono: [
                    "ui-monospace",
                    "SFMono-Regular",
                    "Menlo",
                    "Monaco",
                    "Consolas",
                    "Liberation Mono",
                    "Courier New",
                    "monospace",
                ],
            },
        },
    },
};

// ============================================================
// NAVEGAÇÃO SUAVE
// ============================================================

document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", function (event) {
        const href = this.getAttribute("href");

        if (!href || href === "#") {
            return;
        }

        /*
         * Se o link aponta para outra página, deixamos
         * o navegador realizar a navegação normalmente.
         */
        if (href.includes(".html#")) {
            return;
        }

        const targetId = href.substring(1);

        const target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
});

// ============================================================
// DOWNLOAD DO CURRÍCULO
// ============================================================

const downloadCv = document.getElementById("downloadCv");

if (downloadCv) {
    downloadCv.addEventListener("click", function (event) {
        event.preventDefault();

        const cvPath = "/assets/QA - Tatiana Yukie Motoyama.pdf ";

        const link = document.createElement("a");

        link.href = cvPath;
        link.download = "CV-Tatiana-Motoyama.pdf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    });
}

// ============================================================
// ANIMAÇÕES DE ENTRADA
// ============================================================

const animatedElements = document.querySelectorAll("section, article");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("opacity-100", "translate-y-0");

            entry.target.classList.remove("opacity-0", "translate-y-4");

            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.08,
    },
);

animatedElements.forEach((element) => {
    element.classList.add("transition-all", "duration-700", "opacity-100");

    observer.observe(element);
});

// ============================================================
// NAVBAR AO ROLAR
// ============================================================

const navbar = document.getElementById("navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scale-[0.98]");
        } else {
            navbar.classList.remove("scale-[0.98]");
        }
    });
}
