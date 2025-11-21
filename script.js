// تسجيل Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('✅ Service Worker مسجل'))
    .catch((err) => console.error('❌ فشل التسجيل:', err));
}

// زر التثبيت
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const installMsg = document.getElementById('installMsg');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});

installBtn.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      installMsg.textContent = choice.outcome === 'accepted'
        ? '✅ تم تثبيت التطبيق!'
        : '❌ تم إلغاء التثبيت.';
      installBtn.style.display = 'none';
      deferredPrompt = null;
    });
  }
});
