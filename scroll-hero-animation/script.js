gsap.registerPlugin(ScrollTrigger);


/* =========================
   ELEMENTS
========================= */

const headline = document.querySelector(".headline");
const stats = document.querySelector(".stats");
const car = document.querySelector(".car");
const road = document.querySelector(".road");
const roadLine = document.querySelector(".road-line");
const scrollIndicator = document.querySelector(".scroll-indicator");
const ambientGlow = document.querySelector(".ambient-glow");


/* =========================
   SETTINGS
========================= */

const roadAngle = 18;

const roadSlope =
    Math.tan(
        roadAngle * Math.PI / 180
    );


/* =========================
   INITIAL STATE
========================= */

gsap.set(headline, {
    opacity: 0,
    y: 50,
    scale: 1
});


gsap.set(stats, {
    opacity: 1,
    y: 0,
    scale: 1
});


gsap.set(car, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,

    filter:
        "drop-shadow(0 20px 25px rgba(0,0,0,0.45))"
});


gsap.set(scrollIndicator, {
    opacity: 1,
    y: 0
});


gsap.set(ambientGlow, {
    opacity: 0.5,
    scale: 1,
    x: 0,
    y: 0
});


/* =========================
   HEADLINE ENTRY
========================= */

gsap.to(headline, {

    opacity: 1,

    y: 0,

    duration: 1.5,

    ease: "power3.out",

    onComplete: createHeroScrollAnimation

});


/* =========================
   STATS ENTRY
========================= */

gsap.from(".stat", {

    opacity: 0,

    y: 30,

    duration: 1,

    stagger: 0.2,

    delay: 0.5,

    ease: "power3.out"

});


/* =========================
   HERO SCROLL TIMELINE
========================= */

function createHeroScrollAnimation() {

    /*
        The BMW follows the same diagonal
        direction as the road.

        This keeps the car visually connected
        to the road while it accelerates away.
    */

    const getCarX = () => {

        const mobile =
            window.innerWidth <= 768;

        return Math.max(
            mobile ? 650 : 1050,
            window.innerWidth *
            (mobile ? 1.67 : 1.28)
        );

    };


    const getCarY = () => {

        const distance = getCarX();

        return -(distance * roadSlope);

    };


    const getScrollDistance = () => {

        return window.innerWidth <= 768
            ? "+=720"
            : "+=850";

    };


    const heroTimeline = gsap.timeline({

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: getScrollDistance,

            scrub: 1.1,

            pin: true,

            anticipatePin: 1,

            invalidateOnRefresh: true

        }

    });


    /* =========================
       HEADLINE EXIT
    ========================= */

    heroTimeline.to(
        headline,
        {
            opacity: 0,

            y: -120,

            scale: 0.9,

            ease: "power2.in"
        },
        0
    );


    /* =========================
       STATS EXIT
    ========================= */

    heroTimeline.to(
        stats,
        {
            opacity: 0,

            y: -80,

            scale: 0.9,

            ease: "power2.in"
        },
        0.05
    );


    /* =========================
       SCROLL INDICATOR
    ========================= */

    heroTimeline.to(
        scrollIndicator,
        {
            opacity: 0,

            y: 40,

            ease: "power2.in"
        },
        0
    );


    /* =========================
       CINEMATIC AMBIENT LIGHT
    ========================= */

    heroTimeline.to(
        ambientGlow,
        {
            x: () =>
                window.innerWidth * 0.28,

            y: () =>
                -window.innerHeight * 0.12,

            opacity: 0.2,

            scale: 1.35,

            ease: "power2.inOut"
        },
        0
    );


    /* =========================
       ROAD PERSPECTIVE
    ========================= */

    heroTimeline.to(
        road,
        {
            scale: 1.22,

            ease: "power2.inOut"
        },
        0
    );


    /* =========================
       ROAD MARKINGS
    ========================= */

    heroTimeline.to(
        roadLine,
        {
            x: () =>
                -(window.innerWidth * 0.45),

            scaleX: 1.8,

            ease: "power2.in"
        },
        0
    );


    /* =========================
       BMW MOVEMENT
    ========================= */

    heroTimeline.to(
        car,
        {
            /*
                IMPORTANT:

                The BMW NEVER scales up.

                It stays at its original size
                while moving off-screen.
            */

            x: getCarX,

            y: getCarY,

            rotation: 22,

            scale: 1,

            ease: "power3.in"
        },
        0.05
    );


    /* =========================
       CINEMATIC SPEED EFFECT
    ========================= */

    heroTimeline.to(
        car,
        {
            /*
                Very subtle speed effect.
                No heavy blur or artificial glow.
            */

            filter:
                "blur(0.8px) brightness(1.03) drop-shadow(0 30px 35px rgba(0,0,0,0.60))",

            ease: "power2.in"
        },
        0.35
    );

}


/* =========================
   COUNTERS
========================= */

document
    .querySelectorAll(".counter")
    .forEach((counter) => {

        const target =
            Number(counter.dataset.value);


        const counterValue = {
            value: 0
        };


        gsap.to(counterValue, {

            value: target,

            duration: 1.5,

            delay: 0.8,

            ease: "power2.out",

            snap: {
                value: 1
            },

            onUpdate: () => {

                counter.textContent =
                    `${Math.round(
                        counterValue.value
                    )}%`;

            }

        });

    });


/* =========================
   SCROLL INDICATOR LOOP
========================= */

gsap.to(".scroll-line", {

    scaleY: 0.5,

    opacity: 0.3,

    duration: 1,

    repeat: -1,

    yoyo: true,

    ease: "power1.inOut"

});


/* =========================
   SECOND SECTION
========================= */

gsap.from(".content", {

    opacity: 0,

    y: 80,

    duration: 1,

    ease: "power3.out",

    scrollTrigger: {

        trigger: ".next-section",

        start: "top 70%",

        toggleActions:
            "play none none reverse"

    }

});


/* =========================
   SCROLL PROGRESS
========================= */

gsap.to(".progress-bar", {

    width: "100%",

    ease: "none",

    scrollTrigger: {

        trigger: "body",

        start: "top top",

        end: "bottom bottom",

        scrub: 0.5

    }

});