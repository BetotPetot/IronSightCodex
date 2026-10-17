
const collections = [
    {
        name: "M1 Garand",
        origin: "USA",
        category: "Rifle",
        image: "assets/images/m1garand.jpg",
        description:
            "A historical semi-automatic rifle widely used during World War II and the Korean War."
    },
    {
        name: "Kar 98k",
        origin: "GERMANY",
        category: "Rifle",
        image: "assets/images/kar98k.jpg",
        description:
            "A historical bolt-action rifle adopted by the German Wehrmacht in 1935."
    },
    {
        name: "StG 44",
        origin: "GERMANY",
        category: "Rifle",
        image: "assets/images/stg44.jpg",
        description:
            "A historically significant German firearm from the later period of World War II."
    }
];

function renderCollections() {
    const collectionGrid = document.getElementById("collection-list");

    if (!collectionGrid) return;

    collectionGrid.innerHTML = "";

    const collectionCount = document.getElementById("collection-count");

    if (collectionCount) {
        collectionCount.textContent = `${collections.length} COLLECTIONS`;
    }

    for (const item of collections) {
        const card = document.createElement("article");
        card.className = "codex-card collection-card flex flex-col";

        const content = document.createElement("div");
        content.className = "flex flex-col gap-4";

        const image = document.createElement("img");
        image.className = "card-image";
        image.src = item.image;
        image.alt = item.name;

        const title = document.createElement("h3");
        title.textContent = item.name;

        const description = document.createElement("p");
        description.textContent = item.description;

        content.append(image, title, description);

        const footer = document.createElement("div");
        footer.className = "card-footer";

        const origin = document.createElement("span");
        origin.className = "font-mono-tactical";
        origin.textContent = `ORIGIN: ${item.origin}`;

        const link = document.createElement("a");
        link.href = "pages/detail.html";
        link.className = "button button-primary";
        link.innerHTML = "VIEW DETAILS &rarr;";

        footer.append(origin, link);
        card.append(content, footer);
        collectionGrid.appendChild(card);
    }
}

document.addEventListener("DOMContentLoaded", renderCollections);
