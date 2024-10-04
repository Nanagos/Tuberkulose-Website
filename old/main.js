/*
    Diese Software wurde erstellt von Michael Theodor Wasiutinski.
    Wer etwas anderes sagt, ist schon frech.
*/

window.addEventListener("load", () => {
    const observer = new MutationObserver(recs => {
        recs.forEach(({attributeName, target}) => {
            if(attributeName === "open" && target.open) {
                const openEvent = new CustomEvent("dialog-open", {
                    detail: {
                        target
                    }
                });
                window.dispatchEvent(openEvent);
            }
        });
    });
    document.querySelectorAll("dialog").forEach(dialog => {
        observer.observe(dialog, {attributes: true});
    });
});

function $(a) {return document.querySelector(a);}

class Vector {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const background = $("#background");
const container = $("#container");
const body = $("body");
const blank = $("#blank");
const overlap = $("#overlap");

body.ondragstart = body.ondrop = () => false;
blank.style.width = `${window.innerWidth}px`;
blank.style.height = `${window.innerHeight}px`;


class Item {
    x;
    y;
    name;
    el;
    constructor(name, x, y) {
        this.name = name;

        this.el = document.createElement("img");
        this.el.classList.add("item");

        this.x = x;
        this.y = y;

        this.el.style.left = `${x}px`;
        this.el.style.top = `${y}px`;

        container.appendChild(this.el);
    }
}

class ExitItem extends Item {
    dialog = $("#exit-dialog");
    yesButton = $("#exit-dialog-yes");
    noButton = $("#exit-dialog-no");
    openAudio = new Audio("res/all/sounds/door_open.mp3");
    constructor(name, x, y) {
        super(name, x, y);
        this.el.addEventListener("click", event => {
            this.openAudio.play();
            this.dialog.showModal();
        });
        this.yesButton.onclick = event => {
            this.dialog.close();
            updatePage(1);
        };
        this.noButton.onclick = event => {
            this.dialog.close();
        };
    }
}

/*
    START page specific elements
*/

// 1
class PictureframeItem extends Item {
    dialog = $("#dialog-pictureframe");
    closeDialog = $("#close-dialog-pictureframe");
    openAudio = new Audio("res/all/sounds/book_open.mp3");
    constructor() {
        super("pictureframe", 771, 367);
        this.el.src = "res/1/items/pictureframe.png";
        this.el.addEventListener("click", event => {
            this.dialog.showModal();
            this.openAudio.play();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
        };
    }
}

class BrochureItem extends Item {
    dialog = $("#dialog-brochure");
    closeDialog = $("#close-dialog-brochure");
    openAudio = new Audio("res/all/sounds/book_open.mp3");
    constructor() {
        super("brochure", 1666, 895);
        this.el.src = "res/1/items/brochure.png";
        this.el.addEventListener("click", event => {
            this.openAudio.play();
            this.dialog.showModal();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
        };
    }
}

class PatientItem extends Item {
    dialog = $("#dialog-patient");
    closeDialog = $("#close-dialog-patient");
    audio = $("#dialog-patient-audio");
    constructor() {
        super("patient", 1092, 549);
        this.el.src = "res/1/items/patient.png";

        this.el.addEventListener("click", event => {
            this.dialog.showModal();
            this.audio.currentTime = 0;
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
            this.audio.pause();
        };
    }
}

class MedsItem extends Item {
    dialog = $("#dialog-meds");
    closeDialog = $("#close-dialog-meds");
    audio = $("#dialog-meds-audio");
    constructor() {
        super("meds", 510, 1076);
        this.el.src = "res/1/items/meds.png";
        this.el.addEventListener("click", event => {
            this.dialog.showModal();
            this.audio.currentTime = 0;
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
            this.audio.pause();
        };
    }
}

class Exit1Item extends ExitItem {
    constructor() {
        super("exit1", 393, 281); //526, 288
        this.el.src = "res/1/items/exit1_2.png";
    }
}



//2
class RobertkochItem extends Item {
    dialog = $("#dialog-robertkoch");
    closeDialog = $("#close-dialog-robertkoch");
    audio = $("#dialog-robertkoch-audio");
    constructor() {
        super("robertkoch", 797, 405);
        this.el.src = "res/2/items/robertkoch.png";
        this.el.addEventListener("click", event => {
            this.dialog.showModal();
            this.audio.currentTime = 0;
            this.audio.play();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
            this.audio.pause();
        };
    }
}

class LeuchtwandItem extends Item {
    dialog = $("#dialog-leuchtwand");
    closeDialog = $("#close-dialog-leuchtwand");
    video = $("#dialog-leuchtwand-video")
    constructor() {
        super("leuchtwand", 1111, 325);
        this.el.src = "res/2/items/leuchtwand.png";
        this.el.addEventListener("click", event => {
            this.dialog.showModal();
            this.video.currentTime = 0;
            this.video.play();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
            this.video.pause();
        };
    }
}

class BesteckItem extends Item {
    dialog = $("#dialog-besteck");
    closeDialog = $("#close-dialog-besteck");
    video = $("#dialog-besteck-video")
    constructor() {
        super("besteck", 904, 849);
        this.el.src = "res/2/items/besteck.png";
        this.el.addEventListener("click", event => {
            this.dialog.showModal();
            this.video.currentTime = 0;
            this.video.play();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
            this.video.pause();
        };
    }
}

class OplampeItem extends Item {
    dialog = $("#dialog-oplampe");
    closeDialog = $("#close-dialog-oplampe");
    constructor() {
        super("oplampe", 407, 128);
        this.el.src = "res/2/items/oplampe.png";
        this.el.addEventListener("click", event => {
            this.dialog.showModal();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
        };
    }
}

class Exit2Item extends ExitItem {
    constructor() {
        super("exit2", 0, 435);
        this.el.src = "res/2/items/exit2.png";
    }
}

// 3
class BuchItem extends Item {
    dialog = $("#dialog-buch");
    closeDialog = $("#close-dialog-buch");
    openAudio = new Audio("res/all/sounds/book_open.mp3");
    constructor() {
        super("buch", 1015, 721);
        this.el.src = "res/3/items/buch.png";
        this.el.addEventListener("click", event => {
            this.openAudio.play();
            this.dialog.showModal();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
        };
    }
}

class PatientenkopfItem extends Item {
    dialog = $("#dialog-patientenkopf");
    closeDialog = $("#close-dialog-patientenkopf");
    constructor() {
        super("patientenkopf", 396, 695);
        this.el.src = "res/3/items/patientenkopf.png";
        this.el.addEventListener("click", event => {
            this.dialog.showModal();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
        };
    }
}

class Patientenbody extends Item {
    dialog = $("#dialog-patientenbody");
    closeDialog = $("#close-dialog-patientenbody");
    constructor() {
        super("patientenbody", 381, 773);
        this.el.src = "res/3/items/patientenbody.png";
        this.el.addEventListener("click", event => {
            this.dialog.showModal();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
        };
    }
}

class Pictureframe2Item extends Item {
    dialog = $("#dialog-pictureframe2");
    closeDialog = $("#close-dialog-pictureframe2");
    constructor() {
        super("pictureframe2", 555, 598);
        this.el.src = "res/3/items/pictureframe2.png";
        this.el.addEventListener("click", event => {
            this.dialog.showModal();
        });
        this.closeDialog.onclick = event => {
            this.dialog.close();
        };
    }
}

class Exit3Item extends ExitItem {
    constructor() {
        super("exit3", 1374, 393);
        this.el.src = "res/3/items/exit3.png";
    }
}

const pages = {
    1: {
        backgroundSrc: "res/1/imgs/background.jpeg",
        items: [
            new PictureframeItem(),
            new BrochureItem(),
            new PatientItem(),
            new MedsItem(),
            new Exit1Item()
        ]
    },
    2: {
        backgroundSrc: "res/2/imgs/background.jpeg",
        items: [
            new RobertkochItem(),
            new LeuchtwandItem(),
            new BesteckItem(),
            new OplampeItem(),
            new Exit2Item()
        ]
    },
    3: {
        backgroundSrc: "res/3/imgs/background.jpeg",
        items: [
            new BuchItem(),
            new PatientenkopfItem(),
            new Patientenbody(),
            new Pictureframe2Item(),
            new Exit3Item()
        ]
    }
};
/*
    END page specific elements
*/


/*
    Page selector
*/
var prevSelectedPage;
var selectedPage = null;
function updatePage(page, firstLoad) {
    if(!pages.hasOwnProperty(page))
        throw new Error(`The page with the number ${page} doesn't exist!`);
    
    overlap.classList.add("overlap");
    const animation0 = overlap.animate([
        {
            opacity: "0"
        }, {
            opacity: "1"
        }
    ],
    {
        duration: firstLoad ? 0 : 200
    });

    animation0.onfinish = () => {
        prevSelectedPage = selectedPage;
        selectedPage = page;

        // changes the background source and onResize is called afterwards.
        background.src = pages[page].backgroundSrc;

        if(prevSelectedPage) {
            for(p in pages) {
                if(p == page) continue;
                for(item of pages[p].items) {
                    item.el.style.visibility = "hidden";
                }
            }
        }

        for(item of pages[page].items) {
            item.el.style.visibility = "visible";
        }
    
        /*
            Play animation
        */
        overlap.classList.add("overlap");
        const animation = overlap.animate([
            {
                opacity: "1"
            }, {
                opacity: "0"
            }
        ],
        {
            duration: 800
        });
    
        animation.onfinish = () => {
            overlap.classList.remove("overlap");
        };

    };
}
updatePage(1, true);


function onResize() {
    if(background.naturalWidth / background.naturalHeight < window.innerWidth / window.innerHeight) {
        background.style.width = "auto";
        background.style.height = `${window.innerHeight}px`;
        container.style.left = `${(window.innerWidth - background.width) / 2}px`;
        container.style.top = "0px";
    } else {
        background.style.width = `${window.innerWidth}px`;
        background.style.height = "auto";
        container.style.left = "0px";
        container.style.top = `${(window.innerHeight - background.height) / 2}px`;
    }
    for(itemItem of pages[selectedPage].items.filter(e => e.el.style.visibility == "visible")) {
        const item = itemItem.el;
        item.style.width = `${(background.width / background.naturalWidth) * item.naturalWidth}px`;
        item.style.left = `${(background.width / background.naturalWidth) * itemItem.x}px`;
        item.style.top = `${(background.width / background.naturalWidth) * itemItem.y}px`;
    }
}
window.addEventListener("resize", onResize);

// Resize when the background changes
background.onload = onResize;


window.addEventListener("dialog-open", (event) => {
    event.detail.target.scrollTo(0, 0);
});