// ================= BIRTHDAY DATE =================

// Birthday: September 13, 2026
const TARGET_DATE = new Date("2026-09-13T00:00:00");


// ================= COUNTDOWN =================

function updateCountdown() {

    const now = new Date();

    let diff = TARGET_DATE - now;


    // Get HTML elements

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minsEl = document.getElementById("cd-mins");
    const secsEl = document.getElementById("cd-secs");


    // Make sure the elements exist

    if (!daysEl || !hoursEl || !minsEl || !secsEl) {
        return;
    }


    // ================= BIRTHDAY ARRIVED =================

    if (diff <= 0) {

        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minsEl.textContent = "00";
        secsEl.textContent = "00";


        const heroTitle = document.querySelector(".hero h1");
        const dateLine = document.querySelector(".date-line");


        if (heroTitle) {

            const nameElement = document.getElementById("heroName");

            const name = nameElement
                ? nameElement.textContent
                : "Mridhu";

            heroTitle.innerHTML =
                "It's Your Day,<br>" +
                "<span class='name'>" +
                name +
                "</span>";
        }


        if (dateLine) {
            dateLine.textContent = "HAPPY BIRTHDAY 🎉";
        }


        return;
    }


    // ================= CALCULATE TIME =================

    const days = Math.floor(
        diff / (1000 * 60 * 60 * 24)
    );

    diff -= days * (1000 * 60 * 60 * 24);


    const hours = Math.floor(
        diff / (1000 * 60 * 60)
    );

    diff -= hours * (1000 * 60 * 60);


    const mins = Math.floor(
        diff / (1000 * 60)
    );

    diff -= mins * (1000 * 60);


    const secs = Math.floor(
        diff / 1000
    );


    // ================= DISPLAY =================

    daysEl.textContent =
        String(days).padStart(2, "0");

    hoursEl.textContent =
        String(hours).padStart(2, "0");

    minsEl.textContent =
        String(mins).padStart(2, "0");

    secsEl.textContent =
        String(secs).padStart(2, "0");
}


// ================= START COUNTDOWN =================

updateCountdown();

setInterval(updateCountdown, 1000);

/* =========================================
   HEART CHASING GAME
========================================= */

const game = document.getElementById("game");
const chaser = document.getElementById("chaser");


/*
    Move the heart to a random safe position
*/
function moveHeart() {

    const padding = 35;

    const heartWidth = chaser.offsetWidth;
    const heartHeight = chaser.offsetHeight;

    const gameWidth = game.clientWidth;
    const gameHeight = game.clientHeight;


    const minX = padding + heartWidth / 2;

    const maxX =
        gameWidth -
        padding -
        heartWidth / 2;


    const minY =
        120 +
        heartHeight / 2;

    const maxY =
        gameHeight -
        padding -
        heartHeight / 2;


    const x =
        minX +
        Math.random() *
        Math.max(1, maxX - minX);


    const y =
        minY +
        Math.random() *
        Math.max(1, maxY - minY);


    chaser.style.left = `${x}px`;
    chaser.style.top = `${y}px`;
}


/*
    Laptop:
    Heart escapes when cursor gets close
*/
game.addEventListener("mousemove", function (event) {

    const heartRect =
        chaser.getBoundingClientRect();


    const heartX =
        heartRect.left +
        heartRect.width / 2;


    const heartY =
        heartRect.top +
        heartRect.height / 2;


    const distance = Math.sqrt(
        Math.pow(event.clientX - heartX, 2) +
        Math.pow(event.clientY - heartY, 2)
    );


    if (distance < 100) {
        moveHeart();
    }

});


/*
    Android:
    Heart moves when touched
*/
chaser.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveHeart();

    },
    {
        passive: false
    }
);


/*
    Also move if clicked
*/
chaser.addEventListener(
    "click",
    function () {

        moveHeart();

    }
);


/* =========================================
   MOVING "NO" BUTTON
========================================= */

const noBtn =
    document.getElementById("noBtn");

const buttons =
    document.querySelector(".buttons");


function moveNoButton() {

    const area =
        buttons.getBoundingClientRect();

    const button =
        noBtn.getBoundingClientRect();


    /*
        Keep the button somewhere
        around the proposal button area.
    */

    const maxX =
        Math.max(
            70,
            (area.width - button.width) / 2
        );


    const randomX =
        (Math.random() * maxX * 2) -
        maxX;


    const randomY =
        (Math.random() * 90) -
        45;


    noBtn.style.transform =
        `translate(${randomX}px, ${randomY}px)`;
}


/*
    Laptop cursor
*/
noBtn.addEventListener(
    "mouseenter",
    function () {

        moveNoButton();

    }
);


/*
    Android touch
*/
noBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


/* =========================================
   YES BUTTON
   15 SECOND HEART RAIN
========================================= */

const yesBtn =
    document.getElementById("yesBtn");

const yesMessage =
    document.getElementById("yesMessage");

let heartRain =
    document.querySelector(".heart-rain");


/*
    If heart-rain container does not exist,
    create it automatically.
*/

if (!heartRain) {

    heartRain =
        document.createElement("div");

    heartRain.className =
        "heart-rain";

    heartRain.id =
        "heartRain";

    document.body.appendChild(
        heartRain
    );
}


let rainRunning = false;


/*
    Create one falling heart
*/
function createFallingHeart() {

    const heart =
        document.createElement("span");


    heart.className =
        "rain-heart";


    const hearts = [
        "❤️",
        "💖",
        "💕",
        "💗",
        "💘",
        "💓",
        "♥️"
    ];


    heart.textContent =
        hearts[
            Math.floor(
                Math.random() *
                hearts.length
            )
        ];


    /*
        Random horizontal position
    */

    heart.style.left =
        `${Math.random() * 100}vw`;


    /*
        Random size
    */

    heart.style.fontSize =
        `${18 + Math.random() * 32}px`;


    /*
        Random fall speed
    */

    heart.style.animationDuration =
        `${2.5 + Math.random() * 3}s`;


    /*
        Random transparency
    */

    heart.style.opacity =
        `${0.65 + Math.random() * 0.35}`;


    heartRain.appendChild(
        heart
    );


    /*
        Remove after animation
    */

    setTimeout(
        function () {

            heart.remove();

        },
        6500
    );

}


/*
    Start 15 second heart rain
*/
function startHeartRain() {

    /*
        Prevent multiple rain systems
    */

    if (rainRunning) {
        return;
    }


    rainRunning = true;

    heartRain.innerHTML = "";


    const startTime =
        Date.now();


    /*
        Heavy initial burst
    */

    for (let i = 0; i < 35; i++) {

        setTimeout(
            createFallingHeart,
            i * 35
        );

    }


    /*
        Continue raining
    */

    const rainInterval =
        setInterval(
            function () {

                const elapsed =
                    Date.now() -
                    startTime;


                /*
                    Stop after 15 seconds
                */

                if (elapsed >= 15000) {

                    clearInterval(
                        rainInterval
                    );


                    /*
                        Give existing hearts
                        time to finish falling.
                    */

                    setTimeout(
                        function () {

                            heartRain.innerHTML =
                                "";

                            rainRunning =
                                false;

                        },
                        3000
                    );


                    return;
                }


                /*
                    Create multiple hearts
                */

                for (
                    let i = 0;
                    i < 3;
                    i++
                ) {

                    createFallingHeart();

                }

            },
            100
        );
}


/*
    YES CLICK
*/

yesBtn.addEventListener(
    "click",
    function () {

        /*
            Show romantic message
        */

        yesMessage.style.display =
            "block";


        /*
            Change button text
        */

        yesBtn.textContent =
            "Yes, forever ❤️";


        /*
            Start heart rain
        */

        startHeartRain();

    }
);

/* =========================================================
   TIMELINE BLOSSOM EFFECT
========================================================= */

const timelineBloom =
    document.getElementById("timelineBloom");


if (timelineBloom) {

    /*
        Observe the blossom section.
        The animation starts when the user
        reaches the end of the timeline.
    */

    const blossomObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            timelineBloom.classList.add(
                                "bloom-active"
                            );


                            /*
                                Run only once
                            */

                            blossomObserver.unobserve(
                                timelineBloom
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.35
            }

        );


    blossomObserver.observe(
        timelineBloom
    );

}
