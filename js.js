document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
})

gsap.registerPlugin(Flip)

const links = document.querySelectorAll(".nav-item a");
const activeNav = document.querySelector(".active-nav");
const track = document.getElementById("img-track");
const cards = document.querySelectorAll(".card");
const hiddenElements = document.querySelectorAll('.hidden');
let trackActive

const observer = new IntersectionObserver((entries) => 
{
    entries.forEach((entry) => {
        if (entry.isIntersecting)
        {
            entry.target.classList.add('show');
        }
    });
});

hiddenElements.forEach((el) => observer.observe(el));

links.forEach((link) => 
{
    link.addEventListener("click", (e) =>
    {
        e.preventDefault();
        gsap.to(links, {opacity: 0.3});

        if(document.activeElement === e.target)
        {
            gsap.to(link, {opacity: 1});
        } 

        const state = Flip.getState(activeNav);
        link.appendChild(activeNav)
        Flip.from(state, {
            duration: 0.5,
            absolute: true,
            ease: "elastic.out(1,0.5)"
        })

        gsap.to('body', { opacity: 0, duration: 0.5, onComplete: () => {
            // Transition to the new page
            window.location.href = e.target.href;
        }});
    });
})

window.onmousedown = e =>
{
    track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e =>
{
    trackActive = true;
    if(track.dataset.mouseDownAt === "0") return;

    if (trackActive === true)
    {
        track.style.top =  `50%`;
        track.style.left =  `50%`;
        track.style.transform = "translate(0%, -50%)";
    }
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
        if(nextPercentage <= -85) nextPercentage = -85;
        if(nextPercentage >= -15) nextPercentage = -15;

    track.dataset.percentage = nextPercentage;

    track.animate
    (
    {
        transform: `translate(${nextPercentage}%, -50%)`
    },
    {
        duration: 1200, fill: "forwards"
    }
    );

    for(const image of track.getElementsByClassName("image"))
    {
        image.animate
        (
        {
            objectPosition: `${nextPercentage + 100}% 50%`
        },
        {
            duration: 1200, fill: "forwards"
        }
        )
    };
}

window.onmouseup = () =>
{
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.ontouchstart = e =>
{
    track.dataset.mouseDownAt = e.clientX;
}

window.ontouchmove = e =>
{
    trackActive = true;
    if(track.dataset.mouseDownAt === "0") return;

    if (trackActive === true)
    {
        track.style.top =  `50%`;
        track.style.left =  `50%`;
        track.style.transform = "translate(0%, -50%)";
    }
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
        if(nextPercentage <= -85) nextPercentage = -85;
        if(nextPercentage >= -15) nextPercentage = -15;

    track.dataset.percentage = nextPercentage;

    track.animate
    (
    {
        transform: `translate(${nextPercentage}%, -50%)`
    },
    {
        duration: 1200, fill: "forwards"
    }
    );

    for(const image of track.getElementsByClassName("image"))
    {
        image.animate
        (
        {
            objectPosition: `${nextPercentage + 100}% 50%`
        },
        {
            duration: 1200, fill: "forwards"
        }
        )
    };
}

window.ontouchend = () =>
{
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

let index = 0;
    interval = 1000;

const rand = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => 
{
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 60)}%`);

    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star"))
{
    setTimeout(() => {
        animate(star)
        setInterval(() => animate(star), 1000);
    }, index++ * (interval / 3)) 
}