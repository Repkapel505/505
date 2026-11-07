// Сразу помечаем, что JS работает: только тогда CSS прячет блоки до появления.
// Если скрипт упадёт, страница останется полностью видимой.
document.documentElement.classList.add("js");

// =========================================================
// ЦЕНЫ
// Здесь все цифры. Курсы меняются, поэтому раз в пару месяцев
// сверяй и правь евро и гривны руками (курс на ноябрь 2026:
// 1 € ≈ 4,30 zł, 1 zł ≈ 12 ₴).
// =========================================================
const prices = {
  pln: { basic: 1000, pro: 2200, premium: 4500, support: 150 },
  eur: { basic: 240, pro: 520, premium: 1050, support: 35 },
  uah: { basic: 12000, pro: 26000, premium: 54000, support: 1800 },
};

// Значок валюты и с какой стороны от числа он стоит
const currencySigns = {
  pln: { sign: "zł", before: false },
  eur: { sign: "€", before: true },
  uah: { sign: "₴", before: false },
};

// Тарифы, у которых цена «от» (точная зависит от задачи)
const fromPlans = ["premium"];

// =========================================================
// ПЕРЕВОДЫ
// Ключ — значение атрибута data-i18n в index.html.
// {basic}, {pro}, {premium}, {support} внутри текста скрипт
// заменяет на цену в выбранной валюте.
// =========================================================
const translations = {
  en: {
    "meta.title": "repkapel.dev, websites for small businesses",
    "nav.about": "About",
    "nav.pricing": "Pricing",
    "nav.process": "Process",
    "nav.cta": "Get in touch",
    "hero.l1": "Your business",
    "hero.l2": "online.",
    "hero.text": "Websites for small businesses in Poland and Ukraine, from {basic}.",
    "about.title": "About me",
    "about.lead": "I'm Rostyslav, a beginner web developer. I build websites for small businesses in four languages.",
    "about.body": "My portfolio is still small, so my prices are below the market. You talk to me directly, with no managers and no hidden fees.",
    "pricing.title": "Pricing",
    "pricing.order": "Order",
    "pricing.from": "from",
    "pricing.note": "Support after the included period: from {support} a month. The exact price comes after we talk.",
    "plan.basic.name": "Basic",
    "plan.pro.name": "Pro",
    "plan.premium.name": "Premium",
    "row.what": "What it is",
    "row.pages": "Pages",
    "row.langs": "Languages",
    "row.incl": "Included",
    "row.support": "Support",
    "row.time": "Time",
    "c.what.basic": "Business card site or landing page",
    "c.what.pro": "Website for a growing business",
    "c.what.premium": "Website for a company",
    "c.pages.basic": "One, up to 3 sections",
    "c.pages.pro": "Up to 6",
    "c.pages.premium": "As many as needed",
    "c.langs.premium": "Up to 4",
    "c.incl.basic": "Contact buttons and basic SEO",
    "c.incl.pro": "Plus Telegram requests, map, gallery, analytics",
    "c.incl.premium": "Plus a catalog or blog, online booking",
    "c.support.basic": "Not included",
    "c.support.pro": "1 month",
    "c.support.premium": "3 months",
    "c.time.basic": "1–2 weeks",
    "c.time.pro": "2–4 weeks",
    "c.time.premium": "Agreed individually",
    "process.title": "How we work",
    "process.s1": "A free call.",
    "process.s2": "A 50% deposit.",
    "process.s3": "The build.",
    "process.s4": "Launch and final 50%.",
    "contact.title": "Contact",
    "contact.email": "Email coming soon",
  },

  pl: {
    "meta.title": "repkapel.dev, strony internetowe dla małych firm",
    "nav.about": "O mnie",
    "nav.pricing": "Cennik",
    "nav.process": "Współpraca",
    "nav.cta": "Kontakt",
    "hero.l1": "Twoja firma",
    "hero.l2": "w sieci.",
    "hero.text": "Strony dla małych firm w Polsce i Ukrainie, od {basic}.",
    "about.title": "O mnie",
    "about.lead": "Jestem Rostyslav, początkujący web developer. Robię strony dla małych firm w czterech językach.",
    "about.body": "Moje portfolio jest jeszcze małe, dlatego ceny są niższe niż rynkowe. Rozmawiasz bezpośrednio ze mną, bez menedżerów i ukrytych opłat.",
    "pricing.title": "Cennik",
    "pricing.order": "Zamów",
    "pricing.from": "od",
    "pricing.note": "Wsparcie po okresie w pakiecie: od {support} miesięcznie. Dokładną cenę podam po rozmowie.",
    "plan.basic.name": "Podstawowy",
    "plan.pro.name": "Pro",
    "plan.premium.name": "Premium",
    "row.what": "Co to jest",
    "row.pages": "Podstrony",
    "row.langs": "Języki",
    "row.incl": "Co zawiera",
    "row.support": "Wsparcie",
    "row.time": "Czas",
    "c.what.basic": "Wizytówka lub landing page",
    "c.what.pro": "Strona dla rozwijającej się firmy",
    "c.what.premium": "Strona dla firmy",
    "c.pages.basic": "Jedna, do 3 sekcji",
    "c.pages.pro": "Do 6",
    "c.pages.premium": "Tyle, ile trzeba",
    "c.langs.premium": "Do 4",
    "c.incl.basic": "Przyciski kontaktu i podstawowe SEO",
    "c.incl.pro": "Plus zgłoszenia w Telegramie, mapa, galeria, analityka",
    "c.incl.premium": "Plus katalog lub blog, rezerwacje online",
    "c.support.basic": "Nie wchodzi",
    "c.support.pro": "1 miesiąc",
    "c.support.premium": "3 miesiące",
    "c.time.basic": "1–2 tygodnie",
    "c.time.pro": "2–4 tygodnie",
    "c.time.premium": "Ustalany indywidualnie",
    "process.title": "Jak pracujemy",
    "process.s1": "Bezpłatna rozmowa.",
    "process.s2": "Przedpłata 50%.",
    "process.s3": "Realizacja.",
    "process.s4": "Start i reszta 50%.",
    "contact.title": "Kontakt",
    "contact.email": "E-mail wkrótce",
  },

  uk: {
    "meta.title": "repkapel.dev, сайти для малого бізнесу",
    "nav.about": "Про мене",
    "nav.pricing": "Ціни",
    "nav.process": "Як працюємо",
    "nav.cta": "Зв'язатися",
    "hero.l1": "Ваш бізнес",
    "hero.l2": "онлайн.",
    "hero.text": "Сайти для малого бізнесу в Польщі та Україні, від {basic}.",
    "about.title": "Про мене",
    "about.lead": "Я Ростислав, початківець у веброзробці. Роблю сайти для малого бізнесу чотирма мовами.",
    "about.body": "Портфоліо поки невелике, тому ціни нижчі за ринкові. Спілкуємося напряму, без менеджерів і прихованих платежів.",
    "pricing.title": "Ціни",
    "pricing.order": "Замовити",
    "pricing.from": "від",
    "pricing.note": "Підтримка після включеного терміну: від {support} на місяць. Точну ціну називаю після розмови.",
    "plan.basic.name": "Базовий",
    "plan.pro.name": "Про",
    "plan.premium.name": "Преміум",
    "row.what": "Що це",
    "row.pages": "Сторінки",
    "row.langs": "Мови",
    "row.incl": "Що входить",
    "row.support": "Підтримка",
    "row.time": "Термін",
    "c.what.basic": "Сайт-візитка або лендинг",
    "c.what.pro": "Сайт для бізнесу, що росте",
    "c.what.premium": "Сайт для компанії",
    "c.pages.basic": "Одна, до 3 розділів",
    "c.pages.pro": "До 6",
    "c.pages.premium": "Скільки потрібно",
    "c.langs.premium": "До 4",
    "c.incl.basic": "Кнопки зв'язку та базове SEO",
    "c.incl.pro": "Плюс заявки в Telegram, карта, галерея, аналітика",
    "c.incl.premium": "Плюс каталог або блог, онлайн-запис",
    "c.support.basic": "Не входить",
    "c.support.pro": "1 місяць",
    "c.support.premium": "3 місяці",
    "c.time.basic": "1–2 тижні",
    "c.time.pro": "2–4 тижні",
    "c.time.premium": "Обговорюємо окремо",
    "process.title": "Як ми працюємо",
    "process.s1": "Безкоштовна розмова.",
    "process.s2": "Передоплата 50%.",
    "process.s3": "Розробка.",
    "process.s4": "Запуск і решта 50%.",
    "contact.title": "Контакти",
    "contact.email": "Пошта незабаром",
  },

  ru: {
    "meta.title": "repkapel.dev, сайты для малого бизнеса",
    "nav.about": "Обо мне",
    "nav.pricing": "Цены",
    "nav.process": "Как работаем",
    "nav.cta": "Связаться",
    "hero.l1": "Ваш бизнес",
    "hero.l2": "онлайн.",
    "hero.text": "Сайты для малого бизнеса в Польше и Украине, от {basic}.",
    "about.title": "Обо мне",
    "about.lead": "Я Ростислав, начинающий веб-разработчик. Делаю сайты для малого бизнеса на четырёх языках.",
    "about.body": "Портфолио пока небольшое, поэтому цены ниже рынка. Общаемся напрямую, без менеджеров и скрытых платежей.",
    "pricing.title": "Цены",
    "pricing.order": "Заказать",
    "pricing.from": "от",
    "pricing.note": "Поддержка после включённого срока: от {support} в месяц. Точную цену называю после разговора.",
    "plan.basic.name": "Базовый",
    "plan.pro.name": "Про",
    "plan.premium.name": "Премиум",
    "row.what": "Что это",
    "row.pages": "Страницы",
    "row.langs": "Языки",
    "row.incl": "Что входит",
    "row.support": "Поддержка",
    "row.time": "Срок",
    "c.what.basic": "Сайт-визитка или лендинг",
    "c.what.pro": "Сайт для растущего бизнеса",
    "c.what.premium": "Сайт для компании",
    "c.pages.basic": "Одна, до 3 разделов",
    "c.pages.pro": "До 6",
    "c.pages.premium": "Сколько нужно",
    "c.langs.premium": "До 4",
    "c.incl.basic": "Кнопки связи и базовое SEO",
    "c.incl.pro": "Плюс заявки в Telegram, карта, галерея, аналитика",
    "c.incl.premium": "Плюс каталог или блог, онлайн-запись",
    "c.support.basic": "Не входит",
    "c.support.pro": "1 месяц",
    "c.support.premium": "3 месяца",
    "c.time.basic": "1–2 недели",
    "c.time.pro": "2–4 недели",
    "c.time.premium": "Обсуждаем отдельно",
    "process.title": "Как мы работаем",
    "process.s1": "Бесплатный созвон.",
    "process.s2": "Предоплата 50%.",
    "process.s3": "Разработка.",
    "process.s4": "Запуск и вторые 50%.",
    "contact.title": "Контакты",
    "contact.email": "Почта скоро",
  },
};

// =========================================================
// ЗАПОМИНАНИЕ ВЫБОРА
// localStorage — маленькое хранилище в браузере посетителя.
// try/catch нужен, потому что в приватном режиме оно может
// быть недоступно — тогда просто ничего не запоминаем.
// =========================================================
function load(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function save(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* не страшно */ }
}

// Язык браузера посетителя → наш язык (если такого нет — английский)
function guessLang() {
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  return translations[browser] ? browser : "en";
}

// Валюта по умолчанию под язык: поляку злотые, украинцу гривны
function guessCurrency(lang) {
  if (lang === "pl") return "pln";
  if (lang === "uk" || lang === "ru") return "uah";
  return "eur";
}

let currentLang = load("lang") || guessLang();
let currentCurrency = load("currency") || guessCurrency(currentLang);

// Язык и валюту можно задать прямо в ссылке: site/?lang=pl&cur=pln
// Удобно, чтобы отправить клиенту ссылку сразу на его языке.
const params = new URLSearchParams(location.search);
if (translations[params.get("lang")]) currentLang = params.get("lang");
if (prices[params.get("cur")]) currentCurrency = params.get("cur");

if (!translations[currentLang]) currentLang = "en";
if (!prices[currentCurrency]) currentCurrency = "pln";

// =========================================================
// ФОРМАТИРОВАНИЕ ЦЕНЫ
// 12000 → "12 000 ₴", 240 → "€240"
// =========================================================
function formatPrice(amount, currency) {
  // Пробел между тысячами (неразрывный, чтобы цифра не разъехалась на две строки)
  const number = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const { sign, before } = currencySigns[currency];
  return before ? sign + number : number + " " + sign;
}

// Заменяет {basic}, {pro}, {premium}, {support} в тексте на цены
function fillPrices(text) {
  return text.replace(/\{(basic|pro|premium|support)\}/g, (_, plan) =>
    formatPrice(prices[currentCurrency][plan], currentCurrency)
  );
}

// =========================================================
// ОТРИСОВКА: подставляем тексты и цены на страницу
// =========================================================
function render() {
  const dict = translations[currentLang];

  // 1. Обычные тексты
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = dict[el.dataset.i18n];
    if (text) el.textContent = fillPrices(text);
  });

  // 2. Тексты с разметкой (выделения <mark>). Тексты наши собственные, поэтому innerHTML безопасен
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const text = dict[el.dataset.i18nHtml];
    if (text) el.innerHTML = fillPrices(text);
  });

  // 3. Подписи для кнопок без текста (для экранных дикторов)
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const text = dict[el.dataset.i18nLabel];
    if (text) el.setAttribute("aria-label", text);
  });

  // 4. Цены тарифов
  document.querySelectorAll("[data-price]").forEach((el) => {
    const plan = el.dataset.price;
    const price = formatPrice(prices[currentCurrency][plan], currentCurrency);
    if (fromPlans.includes(plan)) {
      el.innerHTML = `<span class="pplan__from">${dict["pricing.from"]}</span>${price}`;
    } else {
      el.textContent = price;
    }
  });

  // 5. Язык страницы и заголовок вкладки
  document.documentElement.lang = currentLang;
  document.title = dict["meta.title"];

  // 6. Подсвечиваем активные кнопки переключателей
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const on = btn.dataset.lang === currentLang;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-pressed", on);
  });
  document.querySelectorAll("[data-currency]").forEach((btn) => {
    const on = btn.dataset.currency === currentCurrency;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-pressed", on);
  });
}

// =========================================================
// КЛИКИ ПО ПЕРЕКЛЮЧАТЕЛЯМ
// =========================================================
document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.lang === currentLang) return;
    currentLang = btn.dataset.lang;
    save("lang", currentLang);
    render();
    // Заголовок первого экрана «переписывается» с небольшой анимацией
    document.querySelectorAll("[data-swap]").forEach((el) => {
      el.classList.remove("is-swapping");
      void el.offsetWidth; // трюк: заставляет браузер перезапустить анимацию
      el.classList.add("is-swapping");
    });
  });
});

document.querySelectorAll("[data-currency]").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentCurrency = btn.dataset.currency;
    save("currency", currentCurrency);
    render();
  });
});

// =========================================================
// ШАПКА МЕНЯЕТ ЦВЕТ ПОД ГЛАВУ
// Смотрим, какая секция сейчас прямо под шапкой, и берём её тон.
// =========================================================
const header = document.querySelector(".header");
const chapters = document.querySelectorAll("[data-chapter]");
function updateHeader() {
  const y = header.offsetHeight / 2;
  for (const ch of chapters) {
    const r = ch.getBoundingClientRect();
    if (r.top <= y && r.bottom > y) {
      header.dataset.tone = ch.dataset.chapter;
      return;
    }
  }
}
let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateHeader(); ticking = false; });
}, { passive: true });

// =========================================================
// ПОЯВЛЕНИЕ БЛОКОВ ПРИ ПРОКРУТКЕ
// Блоки внутри одной секции появляются по очереди с задержкой 80 мс.
// =========================================================
document.querySelectorAll("[data-chapter]").forEach((section) => {
  section.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.setProperty("--d", `${i * 0.08}s`);
  });
});
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

document.getElementById("year").textContent = new Date().getFullYear();

render();
updateHeader();
