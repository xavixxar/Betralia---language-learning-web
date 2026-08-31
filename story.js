// ==========================================
// ESTADÍSTICAS DE LA HISTORIA
// ==========================================

const viewsElement = document.getElementById("views");
const likesElement = document.getElementById("likes");
const likeButton = document.getElementById("like-button");


// ==========================================
// COMPROBAR STORY_ID
// ==========================================

if (typeof STORY_ID === "undefined") {

    console.error("No se ha encontrado STORY_ID.");

}


// ==========================================
// CARGAR ESTADÍSTICAS
// ==========================================

async function loadStats() {

    const { data, error } =
        await supabaseClient
            .from("stories_stats")
            .select("views, likes")
            .eq("story_id", STORY_ID)
            .maybeSingle();


    if (error) {

        console.error(
            "Error cargando estadísticas:",
            error
        );

        return;

    }


    if (!data) {

        viewsElement.textContent = "0";
        likesElement.textContent = "0";

        return;

    }


    viewsElement.textContent = data.views;
    likesElement.textContent = data.likes;

}


// ==========================================
// REGISTRAR VISITA
// ==========================================

async function registerView() {

    const visitKey =
        "visited_" + STORY_ID;

    const lastVisit =
        localStorage.getItem(visitKey);

    const now =
        Date.now();

    const thirtyMinutes =
        30 * 60 * 1000;


    // No contar otra visita durante 30 minutos

    if (
        lastVisit &&
        now - Number(lastVisit) < thirtyMinutes
    ) {

        console.log("Visita no contada: ya visitada recientemente.");

        return;

    }


    console.log(
        "Registrando visita para:",
        STORY_ID
    );


    const { data, error } =
        await supabaseClient.rpc(
            "add_story_view",
            {
                p_story_id: STORY_ID
            }
        );


    if (error) {

        console.error(
            "Error registrando visita:",
            error
        );

        return;

    }


    console.log(
        "Visita registrada correctamente:",
        data
    );


    localStorage.setItem(
        visitKey,
        now.toString()
    );


    // Volver a cargar las estadísticas

    await loadStats();

}


// ==========================================
// COMPROBAR LIKE
// ==========================================

function hasLiked() {

    const likeKey =
        "liked_" + STORY_ID;

    return localStorage.getItem(likeKey) === "true";

}


// ==========================================
// ACTUALIZAR BOTÓN LIKE
// ==========================================

function updateLikeButton() {

    if (hasLiked()) {

        likeButton.textContent =
            "❤️ Liked";

        likeButton.disabled = true;

    }

    else {

        likeButton.textContent =
            "❤️ Like";

        likeButton.disabled = false;

    }

}


// ==========================================
// DAR LIKE
// ==========================================

async function likeStory() {

    if (hasLiked()) {

        return;

    }


    likeButton.disabled = true;


    console.log(
        "Dando like a:",
        STORY_ID
    );


    const { data, error } =
        await supabaseClient.rpc(
            "add_story_like",
            {
                p_story_id: STORY_ID
            }
        );


    if (error) {

        console.error(
            "Error dando like:",
            error
        );

        likeButton.disabled = false;

        return;

    }


    console.log(
        "Like registrado correctamente:",
        data
    );


    const likeKey =
        "liked_" + STORY_ID;


    localStorage.setItem(
        likeKey,
        "true"
    );


    updateLikeButton();


    await loadStats();

}


// ==========================================
// EVENTO LIKE
// ==========================================

likeButton.addEventListener(
    "click",
    likeStory
);


// ==========================================
// INICIAR
// ==========================================

async function initStoryStats() {

    console.log(
        "Inicializando estadísticas de:",
        STORY_ID
    );


    await loadStats();

    await registerView();

    updateLikeButton();

}


initStoryStats();