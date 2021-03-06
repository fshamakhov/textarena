import HTMLLicker from './HTMLLicker';

export function getFocusElement(): HTMLElement | undefined {
  const s = window.getSelection();
  if (!s) {
    return undefined;
  }
  const { focusNode } = s;
  if (focusNode) {
    return (focusNode.nodeType === 1 ? focusNode : focusNode.parentElement) as HTMLElement;
  }
  return undefined;
}

export function
isDescendant(parent: HTMLElement | Node, child: HTMLElement | Node): boolean {
  let node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

export function getCodeForKey(key: string): string {
  if (/\d/.test(key)) {
    return `Digit${key}`;
  }
  return `Key${key.toUpperCase()}`;
}

export function insert(html: string): void {
  const s = window.getSelection();
  if (!s) {
    return;
  }
  const range = s.getRangeAt(0);
  if (!range) {
    return;
  }
  if (!s.isCollapsed) {
    range.deleteContents();
  }
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const fragment = document.createDocumentFragment();
  let node;
  let lastNode;
  while (tmp.firstChild) {
    node = tmp.firstChild;
    lastNode = fragment.appendChild(node);
  }
  range.insertNode(fragment);
  if (lastNode) {
    const newRange = range.cloneRange();
    newRange.setStartAfter(lastNode);
    newRange.collapse(true);
    s.removeAllRanges();
    s.addRange(newRange);
  }
}

export function convertToHTML(html: string): string {
  return `<p>${new HTMLLicker(html).xssFull().getHtml()}</p>`;
}

export function clearHtml(html: string): string {
  return new HTMLLicker(html).sanitize().getHtml();
}
