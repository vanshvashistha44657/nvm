/* =========================================================
   KAAMOKAZI — RESPONSIVE SCRIPT
   ========================================================= */

/* =========================================================
   CONFIG
   ========================================================= */

const CONFIG = {
    whatsappNumber: "917908102718",

    sheetCsvUrl:
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWc_OxH2vbtCnXjRwEmQC5J705LwXexrq6Ur1Bzud2QxSx9UoBcHvdDbnGEIoxP6hHpbyarz9iqZQZ/pub?gid=0&single=true&output=csv"
};


/* =========================================================
   FALLBACK SERVICES
   ========================================================= */

const FALLBACK_SERVICES = [
    {
        category: "Cleaning Services",
        name: "Professional Cleaning",
        desc: "Deep cleaning for homes, bathrooms, and kitchens.",
        price: 449,
        icon: "clean",
        img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop"
    },

    {
        category: "Electrical Services",
        name: "Electrical Repair & Wiring",
        desc: "Electrical installations, repairs, wiring, fans, and lights.",
        price: 399,
        icon: "electric",
        img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop"
    },

    {
        category: "Plumbing Services",
        name: "Plumbing Repair",
        desc: "Plumbing repairs, pipe fitting, and bathroom fixtures.",
        price: 399,
        icon: "plumb",
        img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=600&auto=format&fit=crop"
    },

    {
        category: "Carpentry Services",
        name: "Custom Carpentry",
        desc: "Furniture assembly, wooden work, locks, and door repairs.",
        price: 399,
        icon: "carpentry",
        img: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=600&auto=format&fit=crop"
    },

    {
        category: "Appliance Services",
        name: "Appliance Inspection & Repair",
        desc: "Service and repair for ACs, Refrigerators, and Microwaves.",
        price: 299,
        icon: "appliance",
        img: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=600&auto=format&fit=crop"
    },

    {
        category: "Beauty Services",
        name: "Hair and Beauty Care",
        desc: "Professional doorstep hair styling, grooming, and salon treatments.",
        price: 299,
        icon: "beauty",
        img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop"
    }
];


/* =========================================================
   ICONS
   ========================================================= */

const ICONS = {

    clean:
        '<path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M5 21h14M6 21V9a2 2 0 012-2h8a2 2 0 012 2v12M10 13h4"/>',

    electric:
        '<path stroke-linecap="round" stroke-linejoin="round" d="M13 2L3 14h7v8l10-12h-7V2z"/>',

    plumb:
        '<path stroke-linecap="round" stroke-linejoin="round" d="M12 2v6m-4 0h8l1 4H7l1-4zm-2 8h8a2 2 0 012 2v6H6v-6a2 2 0 012-2z"/>',

    carpentry:
        '<path stroke-linecap="round" stroke-linejoin="round" d="M14.5 3.5l6 6L9 21l-6-6 11.5-11.5zM7 15l2 2"/>',

    ac:
        '<path stroke-linecap="round" stroke-linejoin="round" d="M3 8h18M6 8v3a2 2 0 002 2h1m9-5v3a2 2 0 01-2 2h-1m-6 0v6m6-6v6"/>',

    appliance:
        '<rect x="4" y="3" width="16" height="18" rx="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="14" r="4" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" d="M8 6h.01"/>',

    paint:
        '<path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 004-4V9H7v8a4 4 0 004 4zM7 9V5a2 2 0 012-2h6a2 2 0 012 2v4"/>',

    pest:
        '<path stroke-linecap="round" stroke-linejoin="round" d="M12 2a4 4 0 014 4c0 1-1 2-1 2s3 1 3 4-3 4-3 4 1 1 1 2a4 4 0 01-8 0c0-1 1-2 1-2s-3-1-3-4 3-4 3-4-1-1-1-2a4 4 0 014-4z"/>',

    beauty:
        '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3l1.9 4.6L18 9l-4.1 1.4L12 15l-1.9-4.6L6 9l4.1-1.4L12 3zM5 17l.8 1.9L7.7 20l-1.9.8L5 22.7l-.8-1.9L2.3 20l1.9-1.1L5 17zM19 15l.7 1.6L21.3 17l-1.6.7L19 15z"/>',

    default:
        '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
};


/* =========================================================
   GLOBAL STATE
   ========================================================= */

let SERVICES = [];
let pendingService = null;

let currentSlide = 0;
let slideInterval = null;


/* =========================================================
   WHATSAPP
   ========================================================= */

function waLink(service, appt) {

    let msg =
        `Hi KamOKazi! I'd like to book: *${service.name}* (${service.category}) — approx ₹${service.price}.`;

    if (appt && appt.date) {
        msg += ` Preferred slot: ${appt.date}`;

        if (appt.time) {
            msg += ` at ${appt.time}`;
        }

        msg += ".";
    }

    if (appt && appt.name) {
        msg += ` My name is ${appt.name}.`;
    }

    if (appt && appt.phone) {
        msg += ` My phone number is ${appt.phone}.`;
    }

    msg += " Please confirm availability.";

    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}


/* =========================================================
   ICON HELPERS
   ========================================================= */

function iconSvg(key) {

    return `
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
        >
            ${ICONS[key] || ICONS.default}
        </svg>
    `;
}


function guessIcon(text = "") {

    const c = text.toLowerCase();

    if (c.includes("clean")) return "clean";
    if (c.includes("electric")) return "electric";
    if (c.includes("plumb")) return "plumb";
    if (c.includes("carpen")) return "carpentry";

    if (
        c.includes(" ac") ||
        c === "ac" ||
        c.includes("cool") ||
        c.includes("air condition")
    ) {
        return "ac";
    }

    if (c.includes("appliance")) return "appliance";
    if (c.includes("paint")) return "paint";
    if (c.includes("pest")) return "pest";

    if (
        c.includes("beauty") ||
        c.includes("hair") ||
        c.includes("salon") ||
        c.includes("spa")
    ) {
        return "beauty";
    }

    return "default";
}


function resolveIcon(iconValue, category) {

    const raw = (iconValue || "").trim().toLowerCase();

    if (ICONS[raw]) {
        return raw;
    }

    if (raw) {

        const guessed = guessIcon(raw);

        if (guessed !== "default") {
            return guessed;
        }
    }

    return guessIcon(category);
}


/* =========================================================
   IMAGE URL
   ========================================================= */

function resolveImageUrl(url) {

    if (!url) {
        return "";
    }

    const trimmed = url.trim();

    const match =
        trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/) ||
        trimmed.match(/[?&]id=([^&]+)/);

    if (match && match[1]) {

        return `https://lh3.googleusercontent.com/d/${match[1]}=w800`;
    }

    return trimmed;
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(value = "") {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   RENDER SERVICES
   ========================================================= */

function render(list) {

    const grid = document.getElementById("cardsGrid");

    if (!grid) {
        return;
    }

    if (!list.length) {

        grid.innerHTML = `
            <div class="empty-state">
                No services match your search.
                Try another keyword or category.
            </div>
        `;

        return;
    }

    grid.innerHTML = list.map((s, i) => {

        const name = escapeHtml(s.name);
        const category = escapeHtml(s.category);
        const desc = escapeHtml(s.desc || "");
        const image = escapeHtml(s.img || "");

        return `
            <div
                class="card"
                style="animation-delay:${Math.min(i, 8) * 60}ms"
            >

                <div
                    class="thumb"
                    style="background-image:url('${image}')"
                >

                    <div class="icon-tile">
                        ${iconSvg(s.icon)}
                    </div>

                </div>

                <div class="card-body">

                    <h3>${name}</h3>

                    <p class="desc">
                        ${desc}
                    </p>

                    <div class="card-foot">

                        <div class="price-tag">
                            ₹${Number(s.price) || 0}
                            <br>
                            <small>starting price</small>
                        </div>

                        <span class="view-link">
                            ${category}
                        </span>

                    </div>

                    <button
                        class="book-btn"
                        type="button"
                        data-name="${encodeURIComponent(s.name)}"
                        data-cat="${encodeURIComponent(s.category)}"
                        data-price="${Number(s.price) || 0}"
                    >

                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.198.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        </svg>

                        Book on WhatsApp

                    </button>

                </div>

            </div>
        `;

    }).join("");


    /* BOOK BUTTONS */

    grid.querySelectorAll(".book-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            openBookingModal({
                name: decodeURIComponent(btn.dataset.name),
                category: decodeURIComponent(btn.dataset.cat),
                price: btn.dataset.price
            });

        });

    });
}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function populateCategoryFilter() {

    const sel = document.getElementById("categoryFilter");

    const footList = document.getElementById("footServiceList");

    const cats = [
        ...new Set(
            SERVICES
                .map(s => s.category)
                .filter(Boolean)
        )
    ];


    if (sel) {

        sel.innerHTML =
            `<option value="all">All Categories</option>` +
            cats.map(c => `
                <option value="${escapeHtml(c)}">
                    ${escapeHtml(c)}
                </option>
            `).join("");
    }


    if (footList) {

        footList.innerHTML =
            cats
                .slice(0, 6)
                .map(c => `
                    <li>
                        <a href="#services">
                            ${escapeHtml(c)}
                        </a>
                    </li>
                `)
                .join("");
    }
}


/* =========================================================
   FILTERS
   ========================================================= */

function applyFilters() {

    const input = document.getElementById("searchInput");
    const select = document.getElementById("categoryFilter");

    if (!input || !select) {
        return;
    }

    const term =
        input.value
            .trim()
            .toLowerCase();

    const cat = select.value;

    const filtered = SERVICES.filter(s => {

        const name =
            String(s.name || "").toLowerCase();

        const category =
            String(s.category || "").toLowerCase();

        const desc =
            String(s.desc || "").toLowerCase();

        const matchesTerm =
            !term ||
            name.includes(term) ||
            category.includes(term) ||
            desc.includes(term);

        const matchesCat =
            cat === "all" ||
            s.category === cat;

        return matchesTerm && matchesCat;
    });

    render(filtered);
}


/* =========================================================
   BOOKING MODAL
   ========================================================= */

function openBookingModal(service) {

    pendingService = service;

    const modal = document.getElementById("bookingModal");

    if (!modal) {
        return;
    }


    const serviceName =
        document.getElementById("modalServiceName");

    const date =
        document.getElementById("apptDate");

    const time =
        document.getElementById("apptTime");

    const name =
        document.getElementById("apptName");

    const phone =
        document.getElementById("apptPhone");

    const error =
        document.getElementById("apptError");


    if (serviceName) {

        serviceName.textContent =
            `${service.name} (${service.category})`;
    }

    if (date) {
        date.value = "";

        const today =
            new Date().toISOString().split("T")[0];

        date.min = today;
    }

    if (time) {
        time.value = "";
    }

    if (name) {
        name.value = "";
    }

    if (phone) {
        phone.value = "";
    }

    if (error) {
        error.classList.remove("show");
    }


    modal.classList.add("open");

    document.body.classList.add("modal-open");


    /* Focus first usable field */

    setTimeout(() => {

        if (date) {
            date.focus();
        }

    }, 150);
}


function closeBookingModal() {

    const modal =
        document.getElementById("bookingModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("open");

    document.body.classList.remove("modal-open");

    pendingService = null;
}


/* =========================================================
   MODAL EVENTS
   ========================================================= */

function initBookingModal() {

    const closeBtn =
        document.getElementById("modalClose");

    const modal =
        document.getElementById("bookingModal");

    const submit =
        document.getElementById("modalSubmit");


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeBookingModal
        );
    }


    if (modal) {

        modal.addEventListener("click", e => {

            if (e.target === modal) {
                closeBookingModal();
            }

        });
    }


    if (submit) {

        submit.addEventListener("click", () => {

            if (!pendingService) {
                return;
            }


            const date =
                document.getElementById("apptDate")?.value;

            const time =
                document.getElementById("apptTime")?.value;

            const name =
                document.getElementById("apptName")?.value.trim();

            const phone =
                document.getElementById("apptPhone")?.value.trim();

            const error =
                document.getElementById("apptError");


            if (!date || !time) {

                if (error) {
                    error.classList.add("show");
                }

                return;
            }


            if (error) {
                error.classList.remove("show");
            }


            const appt = {
                date,
                time,
                name,
                phone
            };


            const url =
                waLink(
                    pendingService,
                    appt
                );


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );


            closeBookingModal();
        });
    }
}


/* =========================================================
   ESC KEY
   ========================================================= */

function initEscapeKey() {

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            const modal =
                document.getElementById("bookingModal");

            if (
                modal &&
                modal.classList.contains("open")
            ) {
                closeBookingModal();
            }


            const nav =
                document.getElementById("navLinks");

            const burger =
                document.getElementById("burgerBtn");

            if (
                nav &&
                nav.classList.contains("open")
            ) {
                closeMobileNav(nav, burger);
            }
        }

    });
}


/* =========================================================
   STATIC WHATSAPP LINKS
   ========================================================= */

function initStaticLinks() {

    const genericMessage =
        "Hi KamOKazi! I'd like to know more about your services.";

    const genericLink =
        `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(genericMessage)}`;


    [
        "headerBook",
        "heroBookBtn",
        "ctaBook",
        "stripBook"
    ].forEach(id => {

        const el =
            document.getElementById(id);

        if (!el) {
            return;
        }

        el.href = genericLink;
        el.target = "_blank";
        el.rel = "noopener noreferrer";

    });


    const digits =
        CONFIG.whatsappNumber.replace(/\D/g, "");


    const formatted =
        "+" +
        digits.slice(0, 2) +
        " " +
        digits.slice(2, 7) +
        " " +
        digits.slice(7);


    const stripPhone =
        document.getElementById("stripPhone");

    const footPhone =
        document.getElementById("footPhone");


    if (stripPhone) {
        stripPhone.textContent = formatted;
    }

    if (footPhone) {
        footPhone.textContent = formatted;
    }


    /* Floating WhatsApp */

    const floating =
        document.querySelector(".whatsapp-float");

    if (floating) {

        floating.href = genericLink;
        floating.target = "_blank";
        floating.rel = "noopener noreferrer";
    }
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const els =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (!els.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        els.forEach(el => {
            el.classList.add("visible");
        });

        return;
    }


    const io =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        io.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    els.forEach(el => io.observe(el));
}


/* =========================================================
   NAV HIGHLIGHT
   ========================================================= */

function initNavHighlight() {

    const sections = [
        "home",
        "about",
        "services",
        "how",
        "contact"
    ];


    const links =
        document.querySelectorAll(
            ".nav-links a"
        );


    const header =
        document.getElementById(
            "mainHeader"
        );


    /* Header shadow */

    window.addEventListener(
        "scroll",
        () => {

            if (!header) {
                return;
            }

            header.classList.toggle(
                "scrolled",
                window.scrollY > 60
            );

        },
        {
            passive: true
        }
    );


    if (
        !("IntersectionObserver" in window)
    ) {
        return;
    }


    const io =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;


                        links.forEach(a => {

                            a.classList.toggle(
                                "active",
                                a.getAttribute(
                                    "href"
                                ) === "#" + id
                            );

                        });

                    }

                });

            },
            {
                threshold: 0.25,
                rootMargin: "-68px 0px -40% 0px"
            }
        );


    sections.forEach(id => {

        const el =
            document.getElementById(id);

        if (el) {
            io.observe(el);
        }

    });
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function closeMobileNav(navLinks, burger) {

    if (navLinks) {
        navLinks.classList.remove("open");
    }

    if (burger) {

        burger.classList.remove("open");

        burger.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    document.body.classList.remove(
        "nav-open"
    );


    const overlay =
        document.querySelector(
            ".mobile-nav-overlay"
        );

    if (overlay) {
        overlay.classList.remove("active");
    }
}


function initBurger() {

    const burger =
        document.getElementById(
            "burgerBtn"
        );

    const navLinks =
        document.getElementById(
            "navLinks"
        );


    if (!burger || !navLinks) {
        return;
    }


    burger.setAttribute(
        "aria-expanded",
        "false"
    );


    burger.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle(
                    "open"
                );


            burger.classList.toggle(
                "open",
                isOpen
            );


            burger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            document.body.classList.toggle(
                "nav-open",
                isOpen
            );


            let overlay =
                document.querySelector(
                    ".mobile-nav-overlay"
                );


            /* Create overlay if HTML doesn't have one */

            if (!overlay) {

                overlay =
                    document.createElement(
                        "div"
                    );

                overlay.className =
                    "mobile-nav-overlay";

                document.body.appendChild(
                    overlay
                );


                overlay.addEventListener(
                    "click",
                    () => {
                        closeMobileNav(
                            navLinks,
                            burger
                        );
                    }
                );
            }


            overlay.classList.toggle(
                "active",
                isOpen
            );
        }
    );


    /* Close after clicking a nav link */

    navLinks
        .querySelectorAll("a")
        .forEach(a => {

            a.addEventListener(
                "click",
                () => {

                    closeMobileNav(
                        navLinks,
                        burger
                    );

                }
            );

        });


    /* Close when resizing back to desktop */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 920 &&
                navLinks.classList.contains(
                    "open"
                )
            ) {

                closeMobileNav(
                    navLinks,
                    burger
                );
            }

        },
        {
            passive: true
        }
    );
}


/* =========================================================
   GOOGLE SHEETS
   ========================================================= */

function loadSheet() {

    if (
        !CONFIG.sheetCsvUrl ||
        typeof Papa === "undefined"
    ) {
        return;
    }


    Papa.parse(
        CONFIG.sheetCsvUrl,
        {

            download: true,

            header: true,

            skipEmptyLines: true,


            complete: results => {

                const rows =
                    (results.data || [])
                        .filter(
                            r =>
                                r.Service &&
                                r.Price
                        );


                if (!rows.length) {
                    return;
                }


                SERVICES =
                    rows.map(r => ({

                        category:
                            r.Category ||
                            "Other",

                        name:
                            r.Service,

                        desc:
                            r.Description ||
                            "",

                        price:
                            parseFloat(
                                String(r.Price)
                                    .replace(/[₹,\s]/g, "")
                            ) || 0,

                        icon:
                            resolveIcon(
                                r.Icon,
                                r.Category
                            ),

                        img:
                            resolveImageUrl(
                                r.Image
                            )

                    }));


                populateCategoryFilter();

                render(SERVICES);

            },


            error: err => {

                console.warn(
                    "Could not load Google Sheet. Using fallback services.",
                    err
                );

            }

        }
    );
}


/* =========================================================
   ABOUT IMAGE SLIDER
   ========================================================= */

function initAboutSlider() {

    const slides =
        document.querySelectorAll(
            ".about-slider .slide"
        );


    /* IMPORTANT:
       Don't start interval if no slides exist.
    */

    if (!slides.length) {
        return;
    }


    currentSlide = 0;


    slides.forEach(
        (slide, index) => {

            slide.classList.toggle(
                "active",
                index === 0
            );

        }
    );


    /* Clear previous interval */

    if (slideInterval) {

        clearInterval(
            slideInterval
        );
    }


    /* Only rotate if there are multiple slides */

    if (slides.length > 1) {

        slideInterval =
            setInterval(
                () => {

                    slides[
                        currentSlide
                    ].classList.remove(
                        "active"
                    );


                    currentSlide =
                        (
                            currentSlide + 1
                        ) % slides.length;


                    slides[
                        currentSlide
                    ].classList.add(
                        "active"
                    );

                },
                3000
            );
    }
}


/* =========================================================
   SEARCH
   ========================================================= */

function initSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const searchBtn =
        document.getElementById(
            "searchBtn"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );


        /* Escape clears search on mobile */

        searchInput.addEventListener(
            "keydown",
            e => {

                if (
                    e.key === "Escape"
                ) {

                    searchInput.value =
                        "";

                    applyFilters();

                    searchInput.blur();
                }

            }
        );
    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            applyFilters
        );
    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            applyFilters
        );
    }
}


/* =========================================================
   VIEW ALL SERVICES
   ========================================================= */

function initViewAll() {

    const button =
        document.getElementById(
            "viewAllBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            const search =
                document.getElementById(
                    "searchInput"
                );

            const category =
                document.getElementById(
                    "categoryFilter"
                );


            if (search) {
                search.value = "";
            }


            if (category) {
                category.value = "all";
            }


            render(SERVICES);


            /* Scroll slightly to cards */

            const grid =
                document.getElementById(
                    "cardsGrid"
                );


            if (grid) {

                setTimeout(
                    () => {

                        grid.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    },
                    50
                );
            }
        }
    );
}


/* =========================================================
   PREVENT iOS/ANDROID DOUBLE TAP ISSUES
   ========================================================= */

function initTouchOptimisation() {

    document.addEventListener(
        "touchstart",
        () => {},
        {
            passive: true
        }
    );
}


/* =========================================================
   HANDLE ORIENTATION CHANGE
   ========================================================= */

function initOrientationHandling() {

    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(
                () => {

                    window.dispatchEvent(
                        new Event("resize")
                    );

                },
                150
            );

        },
        {
            passive: true
        }
    );
}


/* =========================================================
   BOOT
   ========================================================= */

function boot() {

    /* Fallback services immediately */

    SERVICES = [
        ...FALLBACK_SERVICES
    ];


    populateCategoryFilter();

    render(SERVICES);

    initStaticLinks();

    initScrollReveal();

    initNavHighlight();

    initBurger();

    initBookingModal();

    initEscapeKey();

    initSearch();

    initViewAll();

    initAboutSlider();

    initTouchOptimisation();

    initOrientationHandling();


    /* Load Google Sheet */

    loadSheet();


    /* Hero CTA animation */

    const heroCard =
        document.querySelector(
            ".hero-cta-card"
        );


    if (heroCard) {

        setTimeout(
            () => {

                heroCard.classList.add(
                    "show"
                );

            },
            1200
        );
    }
}


/* =========================================================
   DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        boot
    );

} else {

    boot();

}