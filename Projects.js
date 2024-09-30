document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
})

const links = document.querySelectorAll(".nav-item a");
const activeNav = document.querySelector(".active-nav");
const hiddenElements = document.querySelectorAll('.hidden');
const hiddenElementsRight = document.querySelectorAll('.hidden-right');

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
hiddenElementsRight.forEach((el) => observer.observe(el));

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