(() => {
  const BOOK_URL = 'https://www.books.com.tw/products/0011061745?sloc=main';
  const page = document.body.dataset.page || 'home';
  const navItems = [
    ['home', 'index.html', '首頁'],
    ['about', 'about.html', '關於本書'],
    ['recommendations', 'recommendations.html', '專文推薦'],
    ['author', 'author.html', '作者介紹'],
    ['quiz', 'quiz.html', '量表測驗'],
    ['readers', 'readers.html', '讀者回響']
  ];

  const headerTarget = document.querySelector('[data-site-header]');
  if (headerTarget) {
    headerTarget.innerHTML = `
      <a class="skip-link" href="#main-content">跳到主要內容</a>
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="index.html" aria-label="職場政治學首頁">
            <span class="brand-title">職場政治學</span>
          </a>
          <nav class="main-nav" id="main-nav" aria-label="主選單">
            <ul class="nav-list">
              ${navItems.map(([key, href, label]) => `<li><a class="nav-link" href="${href}"${key === page ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}
              <li><a class="nav-link nav-link--buy" href="${BOOK_URL}" target="_blank" rel="noopener">立即購書</a></li>
            </ul>
          </nav>
        </div>
      </header>`;
  }

  const footerTarget = document.querySelector('[data-site-footer]');
  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="footer-title">《職場政治學》　盧世安　著</div>
            <div class="footer-meta">商周出版　Live &amp; Learn 151</div>
          </div>
          <div class="footer-links">
            <a href="https://www.facebook.com/hrfriday" target="_blank" rel="noopener">Facebook</a>
            <a href="https://hrlearning.com.tw" target="_blank" rel="noopener">人資小週末</a>
            <a href="mailto:hrfriday123@gmail.com">hrfriday123@gmail.com</a>
          </div>
        </div>
      </footer>`;
  }

  const content = window.V1_CONTENT;
  document.querySelectorAll('[data-content-html]').forEach((target) => {
    const key = target.dataset.contentHtml;
    if (content?.[key]) {
      target.innerHTML = content[key];
      if (key === 'authorHtml') {
        target.querySelector(':scope > h3:first-child')?.remove();
        target.querySelectorAll(':scope > ul').forEach((list) => list.remove());
      }
    }
  });

  const quoteWall = document.querySelector('[data-quote-wall]');
  if (quoteWall && content?.quotes) {
    quoteWall.innerHTML = content.quotes.map((item) => `
      <figure class="book-quote">
        <blockquote>「${item.text}」</blockquote>
      </figure>`).join('');
  }

  const renderVoices = (target, voices) => {
    if (!voices?.length) {
      target.innerHTML = `
        <div class="reader-empty">
          <div class="reader-empty__mark" aria-hidden="true">“</div>
          <h3>這面牆還空著。</h3>
          <p>第一則，可以是你的。心得投稿功能開放後，這裡會呈現經確認可公開的讀者回響。</p>
        </div>`;
      return;
    }
    target.innerHTML = `<div class="reader-flow">${voices.map((voice) => `
      <article class="reader-quote">
        <blockquote>${voice.text}</blockquote>
        <cite>${voice.who || '匿名讀者'}${voice.when ? `　${voice.when}` : ''}</cite>
      </article>`).join('')}</div>`;
  };
  document.querySelectorAll('[data-reader-voices]').forEach((target) => renderVoices(target, content?.readerVoices || []));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
