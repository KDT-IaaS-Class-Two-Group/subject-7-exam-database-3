export class EnterEvent {
  constructor(loginEvent, managerEvent) {
    this.eventHandler = loginEvent;
    this.loginEnterKeyEvent = loginEvent;
    this.managerEnterKeyEvent = managerEvent;
    this.event();
  }
  event() {
    window.addEventListener('hashchange', () => {
      this.updateEvent();
    })
    window.addEventListener('keydown', this.eventHandler);
  }

  updateEvent() {
    if (this.eventHandler) {
      window.removeEventListener('keydown', this.eventHandler);
    }
    const hash = window.location.hash;

    switch (hash) {
      case "#login":
        this.eventHandler = this.loginEnterKeyEvent;
        break;
      case "#manager":
        this.eventHandler = this.managerEnterKeyEvent;
        break;
      default:
        return;
    };

    window.addEventListener('keydown', this.eventHandler);
  }
}