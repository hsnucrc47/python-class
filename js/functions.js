// Calendar function
function openCalendar() {
    window.open('https://hackmd.io/@CRC-YUSHAN/rJFLIOFFlg', '_blank');
}
function openForm() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdza11kAhbhWBrZIB_0ATGWhdx0xyVnn6ric6VyNUfkO0pvEw/viewform', '_blank');
}
// Slide functions
function openSlide(week) {
    const slideInfo = {

        // Semester 1
        'math':'https://hackmd.io/@CRC-YUSHAN/BkspH1Laxe',
        'kahoot1':'https://kahoot.it/solo/?quizId=07e1b7a3-e1c7-45ae-8821-4297c53209a6&gameMode=nano',
        'kahoot2':'https://kahoot.it/solo?quizId=2d6d49e6-b2a1-486f-9c98-f2b36915ae7d&gameMode=nano',
        'week1': 'https://hackmd.io/@CRC-YUSHAN/S1OomO2Fge',
        'week2': 'https://hackmd.io/@CRC-YUSHAN/BySlh2r5ge#/',
        'week3': 'https://hackmd.io/@CRC-YUSHAN/B1sorKHjlg',
        'week4': 'https://hackmd.io/@CRC-YUSHAN/Sku3BKCslx',
        'week5': 'https://hackmd.io/@CRC-YUSHAN/B1c4-HH2gx',
        'week9': 'https://hackmd.io/@CRC-YUSHAN/ryb1DhYRlg',
        'week10': 'https://hackmd.io/@CRC-YUSHAN/r1leEJQkZg#/',
        'week11': 'https://hackmd.io/@CRC-YUSHAN/Skt2Hm3y-x',
        'week12': 'https://hackmd.io/@CRC-YUSHAN/SJyZKu2gbl',
        'week14': 'https://hackmd.io/@CRC-YUSHAN/ByRKai6--l',
        'week17':'https://hackmd.io/@CRC-YUSHAN/S1NoUlVQWg',
        'week18':'https://hackmd.io/@CRC-YUSHAN/Hy9Hl63mZg',
        'week19':'https://hackmd.io/@CRC-YUSHAN/H1BpcbS4-l',

        // Semester 2
        'week6-2':'https://hackmd.io/@CRC-YUSHAN/rktfib4dWe'
    };
    window.open(`${slideInfo[week]}`, '_blank');
}
function openArticlce(num) {
    const articleInfo = {
        '01': 'articles/第一次社內賽詳解',
        '02': 'articles/第二次社內賽題解',
        'random':'https://hsnucrc47.github.io/python-class/articles/random',
        'str':'https://hsnucrc47.github.io/python-class/articles/string',
        'float':'https://hsnucrc47.github.io/python-class/articles/浮點數運算問題與限制',
        'rails':'https://hsnucrc47.github.io/python-class/articles/rails',
        'time':'https://hsnucrc47.github.io/python-class/articles/time',
        'towel_of_Hanoi':'https://hsnucrc47.github.io/python-class/games/towel_of_Hanoi',
        'ascii':'https://hsnucrc47.github.io/python-class/articles/ascii',
        'datastructures+':'https://hackmd.io/@CRC-YUSHAN/SydrdQxX-g',
        'qrcode':'https://hsnucrc47.github.io/python-class/articles/qrcode',
        'class':'https://hackmd.io/@CRC-YUSHAN/SJl-GKHLZx'
    };
    window.open(`${articleInfo[num]}`, '_blank');
}
function openVideo(mp4) {
    const videoInfo = {
        '01': 'https://youtu.be/6h2xrxmE6ow?si=exWU2OPFs-WlQlqq',
        '02': 'https://youtu.be/rW1fS5pxHvo?si=1tLLvVBa-ygLapYb',
        'guess_num': 'https://youtu.be/j2o8WJn1yeY?si=yyvB8g5yMD5kL-qw'
    };
    window.open(`${videoInfo[mp4]}`, '_blank');
}

function downloadCode(week) {
    const codeInfo = {
        'zerojudge': 'https://github.com/hsnucrc47/python-class-zerojudge',
        'guess_num': 'https://github.com/hsnucrc47/python-class-zerojudge/tree/main/random',
        'week1': 'https://github.com/EthanPan-code/python-class-example',
        'week2': '',
        'week3': '',
        'week4': '',
        'week5': 'https://github.com/hsnucrc47/python-class-zerojudge/tree/main/114_10_3',
        'week9':'https://github.com/hsnucrc47/python-class-zerojudge/blob/main/114_10_31/%E7%9F%A9%E9%99%A3%E7%BF%BB%E8%BD%89.py',
        'week14':'https://github.com/hsnucrc47/python-class-zerojudge/tree/main/114_12_5',
        'week17':'https://github.com/hsnucrc47/python-class-zerojudge/tree/main/114_12_26',
        'week18':'https://github.com/hsnucrc47/python-class-zerojudge/tree/main/115_1_2'
    };
    window.open(`${codeInfo[week]}`, '_blank');
}

function scrollToLatest() {
    const articles = document.querySelectorAll("article");
    const latest = articles[articles.length - 11] ;
    latest.scrollIntoView({ behavior: "smooth" });
}


const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}