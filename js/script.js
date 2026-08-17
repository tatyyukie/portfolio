tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],

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

                display: [
                    "Space Grotesk",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                ],
            },
        },
    },
};

document.addEventListener("DOMContentLoaded", () => {
    initSmoothNavigation();
    initDownloadCv();
    initScrollAnimations();
    initNavbar();
});

function initSmoothNavigation() {
    const links = document.querySelectorAll('a[href*="#"]');

    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            const href = this.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const hashIndex = href.indexOf("#");

            if (hashIndex === -1) {
                return;
            }

            const hash = href.substring(hashIndex + 1);

            if (!hash) {
                return;
            }

            const target = document.getElementById(hash);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });

            history.pushState(null, "", `#${hash}`);
        });
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll("section, article");

    if (!animatedElements.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.remove("opacity-0", "translate-y-4");

                entry.target.classList.add("opacity-100", "translate-y-0");

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.08,
        },
    );

    animatedElements.forEach((element) => {
        element.classList.add(
            "transition-all",
            "duration-700",
            "opacity-0",
            "translate-y-4",
        );

        observer.observe(element);
    });
}

function initNavbar() {
    const navbar = document.getElementById("navbar");

    if (!navbar) {
        return;
    }

    const updateNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scale-[0.98]", "shadow-sm");
        } else {
            navbar.classList.remove("scale-[0.98]", "shadow-sm");
        }
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, { passive: true });
}
