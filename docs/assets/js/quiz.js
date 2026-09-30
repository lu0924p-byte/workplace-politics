(() => {
  const data = window.QUIZ_DATA;
  const shell = document.querySelector('[data-quiz]');
  if (!data || !shell) return;

  const count = shell.querySelector('[data-quiz-count]');
  const progress = shell.querySelector('[data-quiz-progress]');
  const dimension = shell.querySelector('[data-quiz-dimension]');
  const question = shell.querySelector('[data-quiz-question]');
  const options = shell.querySelector('[data-quiz-options]');
  const back = shell.querySelector('[data-quiz-back]');
  const reset = shell.querySelector('[data-quiz-reset]');
  const stage = shell.querySelector('[data-quiz-stage]');
  const result = shell.querySelector('[data-quiz-result]');
  const share = shell.querySelector('[data-quiz-share]');
  const again = shell.querySelector('[data-quiz-again]');

  let index = 0;
  let answers = new Array(data.questions.length).fill(null);
  let lastResult = '';

  const partFor = (number) => data.parts.find((part) => number >= part.from && number <= part.to) || data.parts[0];
  const average = (items) => items.reduce((sum, number) => sum + (answers[number - 1] || 0), 0) / items.length;
  const format = (value) => value.toFixed(1);
  const questionLines = (value) => Array.isArray(value) ? value : [value];

  function renderQuestion() {
    const number = index + 1;
    const part = partFor(number);
    count.textContent = `${String(number).padStart(2, '0')} / ${data.questions.length}`;
    progress.style.width = `${(index / data.questions.length) * 100}%`;
    dimension.textContent = `${part.short}｜${part.sub}`;
    question.replaceChildren(...questionLines(data.questions[index]).map((line) => {
      const span = document.createElement('span');
      span.className = 'quiz-question__line';
      span.textContent = line;
      return span;
    }));
    options.innerHTML = '';
    for (let value = 1; value <= 5; value += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'scale-option';
      button.textContent = String(value);
      button.setAttribute('aria-label', `第 ${number} 題，給 ${value} 分`);
      button.addEventListener('click', () => choose(value));
      options.appendChild(button);
    }
    back.style.visibility = index === 0 ? 'hidden' : 'visible';
    shell.focus({ preventScroll: true });
  }

  function choose(value) {
    answers[index] = value;
    if (index < data.questions.length - 1) {
      index += 1;
      renderQuestion();
    } else {
      finish();
    }
  }

  function finish() {
    const see = average(data.seeItems);
    const act = average(data.actItems);
    const highSee = see >= data.highThreshold;
    const highAct = act >= data.highThreshold;
    const key = highSee ? (highAct ? 'strat' : 'watch') : (highAct ? 'rash' : 'blind');
    const quadrant = data.quadrants[key];

    const scores = data.parts.map((part) => {
      const items = [];
      for (let number = part.from; number <= part.to; number += 1) items.push(number);
      return { part, value: average(items) };
    });
    const weakest = [...scores].sort((a, b) => a.value - b.value)[0];
    const advice = data.advice[weakest.part.key];

    shell.querySelector('[data-result-score]').textContent = `看懂軸 ${format(see)}　／　出手軸 ${format(act)}`;
    shell.querySelector('[data-result-name]').textContent = quadrant.name;
    shell.querySelector('[data-result-coord]').textContent = quadrant.coord;
    shell.querySelector('[data-result-description]').textContent = quadrant.description;
    shell.querySelectorAll('[data-quadrant]').forEach((cell) => cell.classList.toggle('is-active', cell.dataset.quadrant === key));

    const bars = shell.querySelector('[data-result-bars]');
    bars.innerHTML = scores.map((score) => `
      <div class="ability-bar${score.part.key === weakest.part.key ? ' is-weakest' : ''}">
        <span>${score.part.short}</span>
        <span class="bar-track"><i style="width:${(score.value / 5) * 100}%"></i></span>
        <strong>${format(score.value)}</strong>
      </div>`).join('');
    shell.querySelector('[data-advice-title]').textContent = `最低分　${weakest.part.short}　→　${advice.title}`;
    shell.querySelector('[data-advice-text]').textContent = advice.text;

    lastResult = `我的職場政治敏感度落在「${quadrant.name}」（${quadrant.coord}）。\n看懂軸 ${format(see)}／出手軸 ${format(act)}，最該補的是${weakest.part.short}。\n\n《職場政治學》線上量表：${location.href}`;
    count.textContent = '完成';
    progress.style.width = '100%';
    dimension.textContent = '結果';
    stage.classList.add('is-hidden');
    result.classList.add('is-active');
    result.focus({ preventScroll: true });
  }

  function restart() {
    index = 0;
    answers = new Array(data.questions.length).fill(null);
    stage.classList.remove('is-hidden');
    result.classList.remove('is-active');
    renderQuestion();
  }

  async function copyResult() {
    if (!lastResult) return;
    try {
      await navigator.clipboard.writeText(lastResult);
      share.textContent = '已複製結果';
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = lastResult;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      share.textContent = '已複製結果';
    }
    setTimeout(() => { share.textContent = '複製我的結果'; }, 1800);
  }

  back.addEventListener('click', () => { if (index > 0) { index -= 1; renderQuestion(); } });
  reset.addEventListener('click', restart);
  share.addEventListener('click', copyResult);
  again.addEventListener('click', restart);
  renderQuestion();
})();
