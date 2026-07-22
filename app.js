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

/* ==========================================
   카드 자동 생성
========================================== */

fetch("data/cards.json")
  .then(response => response.json())
  .then(cards => {

    const grid = document.getElementById("cardGrid");

    if (!grid) return;

    cards.forEach(card => {

      const tags = card.tags.map(tag => `#${tag}`).join(" ");

      grid.innerHTML += `
        <div class="card">

          <img src="${card.image}" alt="${card.title}">

          <div class="card-content">

            <span class="category">${card.category}</span>

            <h3>${card.title}</h3>

            <p>${tags}</p>

            <small>${card.date}</small>

          </div>

        </div>
      `;

    });

  })
  .catch(error => {

    console.error("cards.json 불러오기 실패", error);

  });

/* ==========================================
   검색 기능
========================================== */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function(){

    const keyword = this.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card=>{

        const text = card.innerText.toLowerCase();

        if(text.includes(keyword)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});

/* ==========================================
   태그 필터
========================================== */

const tagButtons = document.querySelectorAll(".tags button");

tagButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const keyword = button.innerText.replace("#","").toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card=>{

            const text = card.innerText.toLowerCase();

            if(text.includes(keyword)){

                card.style.display="block";

            }else{

                card.style.display="none";

            }

        });

    });

});

/* ==========================================
   전체보기
========================================== */

document.getElementById("showAll").addEventListener("click",()=>{

    document.querySelectorAll(".card").forEach(card=>{

        card.style.display="block";

    });

});
