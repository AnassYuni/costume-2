const videoCards = document.querySelectorAll('.video-card');
let currentVideo = null;

videoCards.forEach(card => {
  card.addEventListener('click', () => {
    const video = card.querySelector('video');
    const src = card.getAttribute('data-src');

    if (!video.src) {
      video.src = src;
    }

    if (currentVideo && currentVideo !== video) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }

    if (video.paused) {
      video.play();
      video.muted = false;
      currentVideo = video;
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
});
