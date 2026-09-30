(() => {
  const config = window.V1_CONTENT?.submission;
  const form = document.querySelector('[data-submission-form]');
  if (!config || !form) return;

  const state = document.querySelector('[data-submission-state]');
  const text = form.querySelector('[name="text"]');
  const who = form.querySelector('[name="who"]');
  const email = form.querySelector('[name="email"]');
  const consent = form.querySelector('[name="consent"]');
  const counter = form.querySelector('[data-character-count]');
  const message = form.querySelector('[data-form-message]');
  const submit = form.querySelector('[type="submit"]');
  const success = document.querySelector('[data-form-success]');
  const active = Boolean(config.enabled && config.endpoint);

  const setMessage = (value = '', error = false) => {
    message.textContent = value;
    message.classList.toggle('is-error', error);
  };

  function updateCount() {
    const length = text.value.trim().length;
    counter.textContent = `${length} / ${config.maxLength}`;
  }
  text.addEventListener('input', updateCount);
  updateCount();

  if (!active) {
    state.innerHTML = '<strong>心得投稿功能即將開放</strong><span>目前先開放讀者回響頁面與表單預覽，尚不會傳送或儲存任何資料。</span>';
    form.querySelectorAll('input, textarea, button').forEach((control) => { control.disabled = true; });
    submit.textContent = '心得投稿即將開放';
    return;
  }

  state.textContent = '投稿功能已開放。Email 只用於刊登前確認，永遠不公開。';
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = text.value.trim();
    if (value.length < config.minLength) { setMessage(`再多寫一點吧，至少${config.minLength}個字。`, true); text.focus(); return; }
    if (value.length > config.maxLength) { setMessage(`超過${config.maxLength}字了，麻煩再精簡一些。`, true); text.focus(); return; }
    if (!consent.checked) { setMessage('請先勾選同意刊登。', true); consent.focus(); return; }
    if (email.value && !email.validity.valid) { setMessage('請輸入有效的聯絡信箱。', true); email.focus(); return; }

    submit.disabled = true;
    submit.textContent = '送出中……';
    setMessage();
    try {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value, who: who.value.trim(), email: email.value.trim(), consent: true })
      });
      if (!response.ok) throw new Error('Request failed');
      form.classList.add('is-hidden');
      success.classList.add('is-active');
      success.focus();
    } catch {
      setMessage('目前無法送出，請稍後再試。你填寫的內容尚未傳送。', true);
      submit.disabled = false;
      submit.textContent = '送出心得';
    }
  });
})();
