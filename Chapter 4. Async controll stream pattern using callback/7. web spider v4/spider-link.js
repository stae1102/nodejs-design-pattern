import { getPageLinks } from '../utils.js';

export function spiderLinks(currentUrl, body, nesting, queue) {
  if (nesting === 0) {
    return;
  }

  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return;
  }

  links.forEach((link) => spider(link, nesting - 1, queue));
}
