const fullscreenBtn = document.getElementById('fullscreen-button');
const unityCanvas = document.getElementById('unity-canvas');
const footer = document.getElementById('site-footer');

fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      unityCanvas.style.width = '100vw';
      unityCanvas.style.height = '100vh';
      footer.style.display = 'none'; // скрываем футер
    }).catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen().then(() => {
      unityCanvas.style.width = 'calc(100% - 40px)';
      unityCanvas.style.height = '600px';
      footer.style.display = 'block'; // показываем футер
    });
  }
});
