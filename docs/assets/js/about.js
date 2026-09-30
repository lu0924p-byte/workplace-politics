(() => {
  const carousel = document.querySelector('[data-about-quote-carousel]');
  const quotes = window.V1_CONTENT?.quotes || [];
  if (!carousel || !quotes.length) return;

  const pageSize = 3;
  const pages = Math.ceil(quotes.length / pageSize);
  let page = 0;
  let timer = null;

  const render = () => {
    const start = page * pageSize;
    const visible = quotes.slice(start, start + pageSize);
    carousel.innerHTML = visible.map((item) => `
      <figure class="about-quote-line">
        <blockquote>「${item.text}」</blockquote>
      </figure>`).join('');
    carousel.setAttribute('aria-label', `精選金句第 ${page + 1} 組，共 ${pages} 組`);
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    if (pages < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stop();
    timer = window.setInterval(() => {
      page = (page + 1) % pages;
      render();
    }, 3000);
  };

  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  render();
  start();
})();
