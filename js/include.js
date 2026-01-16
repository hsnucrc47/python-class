// js/include.js

async function loadComponents() {
    const components = [
        { id: 'nav-placeholder', url: 'https://hsnucrc47.github.io/python-class/assets/nav.html' },
        { id: 'footer-placeholder', url: 'https://hsnucrc47.github.io/python-class/assets/footer.html' }
    ];

    for (const comp of components) {
        const placeholder = document.getElementById(comp.id);
        if (!placeholder) continue;

        try {
            const response = await fetch(comp.url);
            const html = await response.text();
            placeholder.innerHTML = html;
        } catch (err) {
            console.error(`載入 ${comp.url} 失敗:`, err);
        }
    }

    // 重點：當 HTML 載入完成後，執行你的原始邏輯
    initNavbarLogic();
}

function initNavbarLogic() {
    // 1. 處理 Menu 按鈕切換 (你原本的邏輯)
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (menuBtn && mobileMenu) {
        // 先移除舊的監聽器（防止重複載入時重複觸發）
        menuBtn.replaceWith(menuBtn.cloneNode(true)); 
        const newMenuBtn = document.getElementById("menu-btn");
        
        newMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // 2. 處理導覽列平滑捲動 (解決你提到的滑動動畫不見的問題)
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 扣除 nav 高度
                    behavior: 'smooth'
                });
                // 點擊後關閉手機版選單
                if (mobileMenu) mobileMenu.classList.add("hidden");
            }
        });
    });
}

// 3. 處理 Scroll 陰影 (你原本的邏輯，直接放在 window 監聽即可)
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    }
});

// 當頁面 DOM 準備好就執行
document.addEventListener('DOMContentLoaded', loadComponents);