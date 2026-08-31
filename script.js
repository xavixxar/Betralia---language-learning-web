// ==========================================
// SUPABASE
// ==========================================

const SUPABASE_URL = "https://tiseuiykkdmnsxnrwpqi.supabase.co";

const SUPABASE_KEY = "sb_publishable_jsGZSxH8_ydr_R0ToU3lwQ_UcgaHJDj";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ==========================================
// IDIOMAS
// ==========================================

const languages = [

    {
        id: "alsacian",
        name: "Alsacian"
    },

    {
        id: "arpetan",
        name: "Arpetan"
    },

    {
        id: "catalan",
        name: "Catalan"
    },

    {
        id: "english",
        name: "English"
    },

    {
        id: "italian",
        name: "Italian"
    },

    {
        id: "menorqui",
        name: "Menorquí (Catalan dialect)"
    },

    {
        id: "normand",
        name: "Normand"
    },

    {
        id: "portuguese",
        name: "Portuguese"
    },

    {
        id: "spanish",
        name: "Spanish"
    },
    {
        id: "spanish",
        name: "Spanish"
    }
];


// ==========================================
// HISTORIAS PAGINA PRINCIPAL
// ==========================================

const stories = [

    // --------------------------
    // ITALIAN
    // --------------------------

    {
        id: "il-viaggio-di-anna",
        title: "Anna's Travel - Il viaggio d'Anna.",
        language: "italian",
        languageName: "Italian",
        flag: "🇮🇹",
        level: "A1",
        creator: "Xavier T.",
        image: "",
        link: "Historias/Il viaggio d'Anna.html",
        popularity: 75,
        date: 1,
        rating: 4.7
    },

    
    // --------------------------
    // CATALAN
    // --------------------------

    {
        id: "el-meu-nou-imperi",
        title: "My new empire - El meu nou imperi",
        language: "catalan",
        languageName: "Catalan",
        flag: "🇮🇹",
        level: "B1",
        creator: "Xavier T.",
        image: "Imagenes/historia catalan 1.png",
        link: "Historias/El meu imperi.html",
        popularity: 99,
        date: 1,
        rating: 4.7
    },


    // --------------------------
    // MENORQUI
    // --------------------------

    {
        id: "els-allots-i-el-bojot",
        title: "The boys and the scarecrow - Els al·lots i el bojot",
        language: "menorqui",
        languageName: "Menorquí",
        flag: "🇪🇸",
        level: "C1",
        creator: "Toni.",
        image: "Imagenes/historia menorqui 1.png",
        link: "Historias/Els al·lots i el bojot.html",
        popularity: 100,
        date: 2,
        rating: 4.9
    },


    // --------------------------
    // NORMAND
    // --------------------------

    {
        id: "pedro-cauchoise",
        title: "Pedro goes to the market (Cauchoise) - Pedro va oû marchi",
        language: "normand",
        languageName: "Normand",
        flag: "🇫🇷",
        level: "A1",
        creator: "ed l'Epte a la Mer",
        image: "Imagenes/historia normando 1.png",
        link: "Historias/Pedro in the market Cauchoise.html",
        popularity: 99,
        date: 5,
        rating: 4.8
    },


    {
        id: "pedro-lechanteur",
        title: "Pedro goes to the market (Lechanteur) - Pedro va oû marchi",
        language: "normand",
        languageName: "Normand",
        flag: "🇫🇷",
        level: "A1",
        creator: "",
        image: "Imagenes/historia normando 1.png",
        link: "Historias/Pedro in the market Lechanteur.html",
        popularity: 97,
        date: 4,
        rating: 4.7
    },


    // --------------------------
    // ARPETAN
    // --------------------------

    {
        id: "pier-goes-to-cessieu",
        title: "Pîer goes to Cessieu - Pîer vat dins la vêla de Cessiae",
        language: "arpetan",
        languageName: "Arpetan",
        flag: "🇫🇷",
        level: "A1",
        creator: "Aripa",
        image: "Imagenes/historia arpitano 1.png",
        link: "Historias/Pedro in the market Cauchoise  .html",
        popularity: 97,
        date: 3,
        rating: 4.7
    },


    // --------------------------
    // ALSACIAN
    // --------------------------

    {
        id: "pedro-geht-am-marik",
        title: "Pedro goes to the market - Pedro geht am Märik",
        language: "alsacian",
        languageName: "Alsacian",
        flag: "🇫🇷",
        level: "A1",
        creator: "",
        image: "Imagenes/historia alsaciano 1.png",
        link: "Historias/Pedro in the market Alsacian.html",
        popularity: 100,
        date: 5,
        rating: 4.9
    }

];

// ==========================================
// ELEMENTOS HTML
// ==========================================

const languageSelector =
    document.getElementById("language");

const popularStories =
    document.getElementById("popular-stories");

const recentStories =
    document.getElementById("recent-stories");

const allStories =
    document.getElementById("all-stories");

const search =
    document.getElementById("search");

const levelFilter =
    document.getElementById("level-filter");

const sort =
    document.getElementById("sort");


// ==========================================
// CREAR SELECTOR DE IDIOMAS
// ==========================================

function populateLanguages() {

    languageSelector.innerHTML = "";


    // --------------------------
    // TODOS LOS IDIOMAS
    // --------------------------

    const allOption =
        document.createElement("option");

    allOption.value = "todos";

    allOption.textContent =
        "All languages";

    languageSelector.appendChild(allOption);


    // --------------------------
    // ORDEN ALFABÉTICO
    // --------------------------

    const sortedLanguages =
        [...languages].sort((a, b) =>
            a.name.localeCompare(b.name)
        );


    // --------------------------
    // CREAR OPCIONES
    // --------------------------

    sortedLanguages.forEach(language => {

        const option =
            document.createElement("option");

        option.value =
            language.id;

        option.textContent =
            language.name;

        languageSelector.appendChild(option);

    });


    // Empezar con todos los idiomas

    languageSelector.value = "todos";

}


// ==========================================
// ESTADÍSTICAS
// ==========================================

function updateStats() {

    // Número total de historias

    const storyCount =
        stories.length;


    // Obtener los idiomas que tienen historias

    const languagesWithStories =
        new Set(
            stories.map(story => story.language)
        );


    const languageCount =
        languagesWithStories.size;


    // Buscar elementos HTML

    const storyCountElement =
        document.getElementById("story-count");

    const languageCountElement =
        document.getElementById("language-count");


    // Actualizar números

    if (storyCountElement) {

        storyCountElement.textContent =
            storyCount;

    }


    if (languageCountElement) {

        languageCountElement.textContent =
            languageCount;

    }

}


// ==========================================
// CREAR TARJETA DE HISTORIA
// ==========================================

function createStoryCard(story) {

    const card =
        document.createElement("a");


    card.classList.add("story");


    card.href =
        story.link;


    const image =
        document.createElement("div");


    image.classList.add("story-image");


    // --------------------------
    // IMAGEN
    // --------------------------

    if (story.image !== "") {

        image.style.backgroundImage =
            `url("${story.image}")`;

        image.style.backgroundSize =
            "cover";

        image.style.backgroundPosition =
            "center";

    }


    // --------------------------
    // TÍTULO
    // --------------------------

    const title =
        document.createElement("h3");


    title.textContent =
        story.title;


    // --------------------------
    // INFORMACIÓN
    // --------------------------

    const information =
        document.createElement("p");


    information.textContent =
        `${story.languageName} · ${story.level} · ${story.creator}`;


    // --------------------------
    // AÑADIR ELEMENTOS
    // --------------------------

    card.appendChild(image);

    card.appendChild(title);

    card.appendChild(information);


    return card;

}


// ==========================================
// MOSTRAR HISTORIAS
// ==========================================

function displayStories() {

    const selectedLanguage =
        languageSelector.value;


    // --------------------------
    // LIMPIAR
    // --------------------------

    popularStories.innerHTML = "";

    recentStories.innerHTML = "";

    allStories.innerHTML = "";


    // --------------------------
    // FILTRAR IDIOMA
    // --------------------------

    let filteredStories;


    if (selectedLanguage === "todos") {

        filteredStories =
            [...stories];

    }

    else {

        filteredStories =
            stories.filter(story =>
                story.language === selectedLanguage
            );

    }


    // ======================================
    // BUSCADOR
    // ======================================

    const searchText =
        search.value.toLowerCase();


    if (searchText !== "") {

        filteredStories =
            filteredStories.filter(story =>

                story.title
                    .toLowerCase()
                    .includes(searchText)

            );

    }


    // ======================================
    // FILTRO DE NIVEL
    // ======================================

    const selectedLevel =
        levelFilter.value;


    if (selectedLevel !== "todos") {

        filteredStories =
            filteredStories.filter(story =>

                story.level === selectedLevel

            );

    }


    // ======================================
    // ORDENAR
    // ======================================

    if (sort.value === "popular") {

        filteredStories.sort(
            (a, b) =>
                b.popularity -
                a.popularity
        );

    }


    else if (sort.value === "recent") {

        filteredStories.sort(
            (a, b) =>
                b.date -
                a.date
        );

    }


    else if (sort.value === "rating") {

        filteredStories.sort(
            (a, b) =>
                b.rating -
                a.rating
        );

    }


    // ======================================
    // POPULARES
    // ======================================

    const popular =
        [...filteredStories]
            .sort(
                (a, b) =>
                    b.popularity -
                    a.popularity
            )
            .slice(0, 4);


    popular.forEach(story => {

        popularStories.appendChild(
            createStoryCard(story)
        );

    });


    // ======================================
    // RECIENTES
    // ======================================

    const recent =
        [...filteredStories]
            .sort(
                (a, b) =>
                    b.date -
                    a.date
            )
            .slice(0, 4);


    recent.forEach(story => {

        recentStories.appendChild(
            createStoryCard(story)
        );

    });


    // ======================================
    // TODAS
    // ======================================

    filteredStories.forEach(story => {

        allStories.appendChild(
            createStoryCard(story)
        );

    });

}


// ==========================================
// EVENTOS
// ==========================================


// Cambiar idioma

languageSelector.addEventListener(
    "change",
    displayStories
);


// Buscar historias

search.addEventListener(
    "input",
    displayStories
);


// Cambiar nivel

levelFilter.addEventListener(
    "change",
    displayStories
);


// Cambiar orden

sort.addEventListener(
    "change",
    displayStories
);


// ==========================================
// INICIAR
// ==========================================

populateLanguages();

displayStories();

updateStats();
