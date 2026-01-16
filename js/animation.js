// js/animation.js
import { animate, stagger, splitText } from 'https://esm.sh/animejs';

export function initHeaderAnimation() {
    // 1. 確保能找到 h1 標籤
    const targetH1 = document.querySelector('header h1') || document.querySelector('h1');
    
    if (!targetH1) {
        console.warn("找不到 h1 標籤，動畫跳過");
        return;
    }

    // 2. 執行文字拆解
    const { chars } = splitText(targetH1, { words: false, chars: true });

    // 3. 執行動畫
    animate(chars, {
        y: [
            { to: '-2.75rem', ease: 'outExpo', duration: 600 },
            { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
        ],
        rotate: {
            from: '-1turn',
            delay: 0
        },
        delay: stagger(50),
        ease: 'inOutCirc',
    });
}

// 監聽自定義事件，當組件載入完畢時啟動
window.addEventListener('componentsLoaded', initHeaderAnimation);