document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const applyTheme = (theme) => {
        root.setAttribute("data-theme", theme);

        if (!themeToggle) {
            return;
        }

        const icon = themeToggle.querySelector(".mode-icon");
        const label = themeToggle.querySelector("span");
        const isDark = theme === "dark";

        themeToggle.setAttribute("aria-pressed", String(isDark));
        if (icon) {
            icon.className = isDark ? "fas fa-sun mode-icon" : "fas fa-moon mode-icon";
        }
        if (label) {
            label.textContent = isDark ? "Light mode" : "Dark mode";
        }
    };

    applyTheme(getPreferredTheme());

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);
    });
});
