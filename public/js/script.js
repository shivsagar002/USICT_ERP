const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .fa-solid.fa-bars');
const sideBar = document.querySelector('.sidebar');

menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});


// Section Js 

const nav = document.querySelector(".side-menu"),
    navList = nav.querySelectorAll("li.inpage"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        // if (window.innerWidth < 1200) {
        //     asideSectionTogglerBtn();
        // }
    })
}
function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

// -------------------------Password Match-------------------
document
    .getElementById("confirmPassword")
    .addEventListener("keyup", () => {
        const passwordInput = document.getElementById("newpassword").value;
        const confirmPasswordInput =
            document.getElementById("confirmPassword");
        const message = document.getElementById("validateMessage");
        const chnagePassBtn = document.getElementById("chnagePass");
        const passwordsMatch = passwordInput === confirmPasswordInput.value;
        message.textContent = passwordsMatch
            ? "Passwords match!"
            : "Passwords do not match!";
        message.style.color = passwordsMatch ? "green" : "red";
        if(passwordsMatch) {
            chnagePassBtn.disabled=false;
        }
        else{
            chnagePassBtn.disabled=true;
        }
    });

document
    .getElementById("newpassword")
    .addEventListener("keyup", () => {
        const passwordInput = document.getElementById("confirmPassword").value;
        const confirmPasswordInput =
            document.getElementById("newpassword");
        const message = document.getElementById("validateMessage");
        const chnagePassBtn = document.getElementById("chnagePass");
        const passwordsMatch = passwordInput === confirmPasswordInput.value;
        message.textContent = passwordsMatch
            ? "Passwords match!"
            : "Passwords do not match!";
        message.style.color = passwordsMatch ? "green" : "red";
        if(passwordsMatch) {
            chnagePassBtn.disabled=false;
        }
        else{
            chnagePassBtn.disabled=true;
        }
    });

    
// navTogglerBtn.addEventListener("click", () => {
//     asideSectionTogglerBtn();
// })

// function asideSectionTogglerBtn() {
//     aside.classList.toggle("open");
//     navTogglerBtn.classList.toggle("open");
//     for (let i = 0; i < totalSection; i++) {
//         allSection[i].classList.toggle("open");
//     }
// }
