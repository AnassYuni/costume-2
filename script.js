(function(){
  const cards = Array.from(document.querySelectorAll('.card'));
  let active = null;

  function stopAndUnload(video){
    if(!video) return;
    video.pause();
    try{
      if(video.src){ video.removeAttribute('src'); video.load(); }
      video.preload = 'none';
    }catch(e){ console.warn(e) }
  }

  async function playCard(card){
    const video = card.querySelector('video');
    const src = card.getAttribute('data-src');
    // unload others
    cards.forEach(c => {
      const v = c.querySelector('video');
      if(v !== video) stopAndUnload(v);
      c.classList.remove('playing');
    });
    if(!video.getAttribute('src')){
      video.setAttribute('src', src);
      video.preload = 'auto';
    }
    try{
      video.currentTime = 0;
    }catch(e){}
    try{
      await video.play();
      video.muted = false;
      card.classList.add('playing');
      active = video;
    }catch(err){
      console.warn('play error', err);
    }
  }

  cards.forEach(card => {
    const btn = card.querySelector('.play');
    const video = card.querySelector('video');
    card.addEventListener('click', (e) => {
      // clicking any part toggles play/pause
      if(active === video && !video.paused){
        // pause & unload
        video.pause();
        stopAndUnload(video);
        active = null;
        card.classList.remove('playing');
        return;
      }
      playCard(card);
    });
    btn.addEventListener('click', (e) => { e.stopPropagation(); playCard(card); });

    video.addEventListener('ended', () => { stopAndUnload(video); card.classList.remove('playing'); active = null; });
    video.addEventListener('pause', () => { if(!video.ended){ stopAndUnload(video); card.classList.remove('playing'); active = null; } });
  });

  // unload on nav away
  window.addEventListener('beforeunload', () => { cards.forEach(c => stopAndUnload(c.querySelector('video'))); });
})();