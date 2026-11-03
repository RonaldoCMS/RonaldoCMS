const KEY = "fd-theme";

/** Script eseguito prima del disegno della pagina: applica subito il tema, senza lampi. */
export const THEME_SCRIPT = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search).get('theme'),s=localStorage.getItem('${KEY}'),t=(q==='light'||q==='dark')?q:(s==='light'||s==='dark')?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.setAttribute('data-theme',t);d.style.colorScheme=t}catch(e){}})()`;
