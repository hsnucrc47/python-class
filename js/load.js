// 1. 頁面開始載入時鎖定捲軸
document.body.classList.add('loading');

// 取得進度條元件 (請確認 HTML 中有 id="progress-bar")
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
let currentProgress = 0;

// 2. 偽進度邏輯：讓進度條先慢慢跑到 90%
const progressTimer = setInterval(() => {
    if (currentProgress < 90) {
        // 隨機增加進度，營造真實感
        currentProgress += Math.random() * 5; 
        if (currentProgress > 90) currentProgress = 90;
        
        updateProgress(currentProgress);
    }
}, 100);

function updateProgress(value) {
    if (progressBar) progressBar.style.width = `${Math.round(value)}%`;
    if (progressText) progressText.innerText = `${Math.round(value)}%`;
}

// 3. 核心載入監聽
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    
    // 清除定時器並衝向 100%
    clearInterval(progressTimer);
    updateProgress(100);

    // 延遲一小段時間讓使用者看到 100% 的完成感，然後關閉
    setTimeout(() => {
        document.body.classList.remove('loading');
        
        // 加入淡出效果
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            
            // 徹底移除 DOM 避免干擾點擊
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 200); 
});