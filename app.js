/* ==========================================
   WEST150 Archive
   app.js
========================================== */

// ------------------------------
// 다크모드
// ------------------------------

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeToggle.textContent="☀️";

    }else{

        localStorage.setItem("theme","light");

        themeToggle.textContent="🌙";

    }

});

// ------------------------------
// Fade Animation
// ------------------------------

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".card,.contact-box,.search-section,.featured")
.forEach(el=>{

    el.classList.add("fade-up");

    observer.observe(el);

});

// ------------------------------
// 부드러운 스크롤
// ------------------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});
