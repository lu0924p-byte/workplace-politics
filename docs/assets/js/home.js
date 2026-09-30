(() => {
  const setupRecommendationCarousel = () => {
    const carousel = document.querySelector('[data-home-carousel]');
    const recommendations = window.V1_CONTENT?.featuredRecommendations?.slice(0, 3) || [];
    if (!carousel || !recommendations.length) return;

    const stage = carousel.querySelector('[data-carousel-stage]');
    const dots = carousel.querySelector('[data-carousel-dots]');
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    let current = 0;

    dots.innerHTML = recommendations.map((item, index) => `<button class="home-carousel__dot" type="button" data-carousel-dot="${index}" aria-label="查看第 ${index + 1} 則推薦：${item.name}"></button>`).join('');

    const render = () => {
      const item = recommendations[current];
      stage.innerHTML = `<article class="home-rec-slide" aria-label="第 ${current + 1} 則，共 ${recommendations.length} 則"><blockquote>${item.quote}</blockquote><div class="home-rec-slide__credit"><strong>${item.name}</strong><span>${item.role}</span><small>〈${item.title}〉</small></div></article>`;
      dots.querySelectorAll('[data-carousel-dot]').forEach((dot, index) => {
        dot.classList.toggle('is-active', index === current);
        dot.setAttribute('aria-current', index === current ? 'true' : 'false');
      });
    };

    const move = (offset) => {
      current = (current + offset + recommendations.length) % recommendations.length;
      render();
    };

    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    dots.addEventListener('click', (event) => {
      const dot = event.target.closest('[data-carousel-dot]');
      if (!dot) return;
      current = Number(dot.dataset.carouselDot);
      render();
    });
    carousel.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    });
    render();
  };

  const setupReaderCarousel = () => {
    const carousel = document.querySelector('[data-reader-carousel]');
    if (!carousel) return;
    const voices = window.V1_CONTENT?.readerVoices || [];
    const stage = carousel.querySelector('[data-reader-stage]');
    const controls = carousel.querySelector('[data-reader-controls]');
    const count = carousel.querySelector('[data-reader-count]');
    const previous = carousel.querySelector('[data-reader-prev]');
    const next = carousel.querySelector('[data-reader-next]');
    let current = 0;

    if (!voices.length) {
      stage.innerHTML = '<div class="home-reader-carousel__placeholder" aria-hidden="true"><span>“</span><span></span></div>';
      controls.hidden = true;
      return;
    }

    const render = () => {
      const voice = voices[current];
      stage.innerHTML = `<article class="home-reader-voice"><blockquote>${voice.text}</blockquote><cite>${voice.who || '匿名讀者'}${voice.when ? `　${voice.when}` : ''}</cite></article>`;
      count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(voices.length).padStart(2, '0')}`;
    };
    const move = (offset) => {
      current = (current + offset + voices.length) % voices.length;
      render();
    };
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    render();
  };

  setupRecommendationCarousel();
  setupReaderCarousel();
})();
