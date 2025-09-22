// age-gate.js
export function checkAge(options) {
  return new Promise((resolve, reject) => {
    // локализации
    const translations = {
      en: { text: "Are you 18 or older?", yes: "Yes", no: "No" },
      ru: { text: "Вам есть 18 лет?", yes: "Да", no: "Нет" },
      de: { text: "Bist du 18 oder älter?", yes: "Ja", no: "Nein" }
    };

    // проверка localStorage
    const storedChoice = localStorage.getItem("ageConfirmed");
    if (storedChoice === "yes") return resolve(true);
    if (storedChoice === "no") return resolve(false);

    // определяем язык
    const lang = (navigator.language || "en").substring(0,2);
    const t = translations[lang] || translations["en"];

    // создаём оверлей
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "#111";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = 9999;

    overlay.innerHTML = `
      <div style="background:#222;padding:2rem;border-radius:12px;text-align:center;color:#fff;max-width:400px;">
        <h2>${t.text}</h2>
        <div>
          <button id="age-yes" style="margin:1rem;padding:0.7rem 1.5rem;border:none;border-radius:8px;background:#4caf50;color:#fff;cursor:pointer;">${t.yes}</button>
          <button id="age-no" style="margin:1rem;padding:0.7rem 1.5rem;border:none;border-radius:8px;background:#f44336;color:#fff;cursor:pointer;">${t.no}</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // обработчики
    overlay.querySelector("#age-yes").addEventListener("click", () => {
      localStorage.setItem("ageConfirmed", "yes");
      document.body.removeChild(overlay);
      resolve(true);
    });

    overlay.querySelector("#age-no").addEventListener("click", () => {
      localStorage.setItem("ageConfirmed", "no");
      document.body.removeChild(overlay);
      resolve(false);
    });
  });
}
