class ViewChangeManager {
  constructor(id) {
    this.view = document.getElementById(id);
  }
  changeView(template) {
    this.view.innerHTML = template;
  }
}
