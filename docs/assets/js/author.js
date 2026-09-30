(() => {
  const preview = document.querySelector('[data-preface-preview]');
  const remaining = document.querySelector('[data-preface-remaining]');
  const details = document.querySelector('.preface-details');
  const source = window.V1_CONTENT?.prefaceHtml;
  if (!preview || !remaining || !details || !source) return;

  const template = document.createElement('template');
  template.innerHTML = source;
  const elements = [...template.content.childNodes].filter((node) => node.nodeType === Node.ELEMENT_NODE);
  const body = elements.slice(2);
  const excerpt = body.slice(0, 2);
  const rest = body.slice(2);

  preview.replaceChildren(...excerpt.map((node) => node.cloneNode(true)));
  remaining.replaceChildren(...rest.map((node) => node.cloneNode(true)));
  if (!rest.length) details.hidden = true;
})();
