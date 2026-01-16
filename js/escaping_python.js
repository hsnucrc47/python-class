// js/escaping_python.js

function initEscapingPython() {
    const img = document.getElementById('python-img');
    
    // 檢查點：如果圖片還沒出現在畫面中，就不執行後續，避免報錯
    if (!img) {
        console.error("找不到 #python-img，逃跑功能無法啟動");
        return;
    }

    img.style.position = "relative";
    let posX = 0;
    let posY = 0;
    const escapeDistance = 80;
    const moveAmount = 80;

    // 將監聽器掛在 window
    window.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const imgX = rect.left + rect.width / 2;
        const imgY = rect.top + rect.height / 2;

        const dx = e.clientX - imgX;
        const dy = e.clientY - imgY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < escapeDistance) {
            const ux = dx / distance;
            const uy = dy / distance;

            posX -= ux * moveAmount;
            posY -= uy * moveAmount;

            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height - 200;

            posX = Math.min(Math.max(posX, -rect.left), maxX - rect.left);
            posY = Math.min(Math.max(posY, -rect.top), maxY - rect.top);

            img.style.transform = `translate(${posX}px, ${posY}px)`;
            img.style.transition = "transform 0.2s ease-out"; 
        }
    });
    console.log("Python 逃跑功能初始化成功！");
}

// 關鍵：監聽自定義事件
window.addEventListener('componentsLoaded', initEscapingPython);