import { animate, stagger, splitText } from 'https://esm.sh/animejs';


const { chars } = splitText('h1', { words: false, chars: true });

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