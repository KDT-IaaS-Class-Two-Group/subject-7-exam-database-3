export class AddContentManager {
  constructor(className) {
    this.view = document.getElementsByClassName(className)[0];
  }
  addContent(content) {
    const tag = document.createElement('div');
    tag.setAttribute('class', 'content');
    tag.innerHTML = content
    this.view.appendChild(tag);
  }
}
