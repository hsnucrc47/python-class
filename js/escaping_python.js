// js/escaping_python.js

window.addEventListener('componentsLoaded', () => {
    const img = document.getElementById('python-img');
    
    // 如果這頁沒有這個圖標，就直接離開，不報錯
    if (!img) return;

    // 所有的 style 操作都要放在這下面
    img.style.position = "relative";

    let posX = 0;
    let posY = 0;
    const escapeDistance = 80;
    const moveAmount = 80;

    window.addEventListener('mousemove', (e) => {
        // ... 你原本的 mousemove 邏輯 ...
        const rect = img.getBoundingClientRect();
        const imgX = rect.left + rect.width / 2;
        const imgY = rect.top + rect.height / 2;

        const dx = e.clientX - imgX;
        const dy = e.clientY - imgY;
        const distance = Math.sqrt(dx*dx + dy*dy);

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
        }
    });
});