import { getFocusElement } from '../utils';

export default function link(): void {
  const focusElement = getFocusElement();
  let url = 'http://';
  if (focusElement && focusElement.tagName === 'A') {
    url = focusElement.getAttribute('href') || '';
  }
  const value = prompt('Введите ваш URL', url);
  if (value === null) {
    // eslint-disable-next-line no-console
    console.log('null');
    return;
  }
  if (focusElement && focusElement.tagName === 'A') {
    if (value) {
      focusElement.setAttribute('href', value);
    } else if (focusElement.textContent) {
      focusElement.replaceWith(focusElement.textContent);
    }
  } else if (value) {
    document.execCommand('createLink', false, value);
    const s = window.getSelection();
    if (s && s.anchorNode) {
      const linkElem = s.anchorNode.parentElement;
      if (linkElem && linkElem.tagName === 'A') {
        linkElem.setAttribute('target', '_blank');
      }
    }
  }
}
