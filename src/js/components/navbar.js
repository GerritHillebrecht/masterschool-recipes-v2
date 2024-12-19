export const Navbar = (routes) => {
  const header = document.createElement("header");
  header.classList.add(
    "h-14",
    "sm:h-16",
    "border-b",
    "backdrop-blur",
    "bg-white/80",
    "backdrop-saturate-150",
    "flex",
    "items-center",
    "sticky",
    "top-0",
    "z-30",
    "shadow"
  );

  const navbar = document.createElement("nav");
  navbar.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "gap-4",
    "px-4",
    "sm:px-6",
    "lg:px-8",
    "w-full",
    "max-w-7xl",
    "mx-auto",
    "h-full"
  );
  const navbarRoutesContainer = document.createElement("div");

  navbarRoutesContainer.classList.add("flex", "items-center", "gap-4");
  navbarRoutesContainer.innerHTML = routes
    .map(
      ({ label, path }) =>
        `<a href="/${path}" class="hover:bg-primary hover:text-white rounded px-3 py-1 transition-all duration-150">${label}</a>`
    )
    .join("");

  const logo_text = document.createElement("a");
  logo_text.textContent = "Recipe Keeper";
  logo_text.classList.add("text-2xl", "headline", "text-primary");
  logo_text.href = "/src/recipes.html";

  const logo = document.createElement("img");
  logo.src =
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
  logo.alt = "Google Logo";
  logo.classList.add("h-8");

  navbar.appendChild(logo_text);

  navbar.appendChild(navbarRoutesContainer);
  header.appendChild(navbar);
  return header;
};
