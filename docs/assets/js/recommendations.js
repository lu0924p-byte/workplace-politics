(() => {
  const content = window.V1_CONTENT;
  const list = document.querySelector('[data-recommendation-list]');
  if (list && content?.recommendations) {
    list.innerHTML = content.recommendations.map((item, index) => `
      <details class="editorial-details recommendation-detail">
        <summary>
          <span class="detail-no">${String(index + 1).padStart(2, '0')}</span>
          <span class="detail-title">
            <strong>${item.title}</strong>
            ${index === 4
              ? `<span class="recommendation-credit recommendation-credit--stack">${item.name}｜<span>${item.role}</span></span>`
              : `<span class="recommendation-credit">${item.name}｜${item.role}</span>`}
          </span>
          <span class="detail-icon" aria-hidden="true"></span>
        </summary>
        <div class="detail-body">
          <blockquote class="detail-pull">${item.quote}</blockquote>
          <div class="prose">${item.bodyHtml}</div>
        </div>
      </details>`).join('');
  }

  const endorsers = document.querySelector('[data-endorser-list]');
  if (endorsers && content?.endorsers) {
    endorsers.innerHTML = content.endorsers.map((item, index) => {
      const roleLength = [...item.role.replace(/\s/g, '')].length;
      const twoLines = index === 0 || item.name === '張敏敏';
      return `
      <article class="endorser-entry${twoLines ? ' endorser-entry--two-lines' : ''}" style="--role-length:${roleLength}">
        <strong>${item.name}</strong>
        <span>${item.role}</span>
      </article>`;
    }).join('');
  }
})();
