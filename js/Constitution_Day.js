document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.getElementById('snow-container');
    const numberOfSnowflakes = 50; // 您希望有多少雪花

    const snowflakeUnicode = ['*', '❅', '❄', '•']; // 可選的雪花符號

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // 隨機選擇雪花符號
        snowflake.textContent = snowflakeUnicode[Math.floor(Math.random() * snowflakeUnicode.length)];
        
        // 設定隨機的起始水平位置 (0% 到 100%)
        const startX = Math.random() * 100;
        snowflake.style.left = `${startX}vw`;

        // 設定隨機的動畫時間 (飄落速度)
        const animationDuration = (Math.random() * 10) + 5; // 5 到 15 秒
        snowflake.style.animationDuration = `${animationDuration}s`;
        
        // 設定隨機的延遲時間 (讓雪花不要同時開始)
        const animationDelay = Math.random() * 15; // 0 到 15 秒的延遲
        snowflake.style.animationDelay = `${animationDelay}s`;
        
        // 設定雪花大小和透明度 (增加真實感)
        const size = (Math.random() * 1.5) + 0.5; // 0.5em 到 2em
        snowflake.style.fontSize = `${size}em`;
        snowflake.style.opacity = Math.random(); 

        // 應用 CSS 動畫
        snowflake.style.animationName = 'fall'; 
        snowflake.style.animationTimingFunction = 'linear';
        snowflake.style.animationIterationCount = 'infinite'; 

        snowContainer.appendChild(snowflake);
    }
});