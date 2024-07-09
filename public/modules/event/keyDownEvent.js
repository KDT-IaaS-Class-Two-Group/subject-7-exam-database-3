import { getLoginData } from "../auth/getLoginData.js";
import { contentView } from "../component/productContent.js";
import { templateView } from "../component/productTemplate.js";
import { AddContentManager } from "../componentManager/addContentManager.js";
import { ViewChangeManager } from "../componentManager/viewChangeManager.js";


export class EnterEvent {
  constructor() {
    this.event();
  }
  event() {
    window.addEventListener('keydown', async (e) => {
      if (e.key === "Enter") {
        const loginData = getLoginData();
        if (loginData) {
          try {
            const response = await fetch('http://localhost:3000/adminLogin', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(loginData)
            });

            if (!response.ok) {
              throw new Error('실패');
            } else {
              const changeView = new ViewChangeManager('main-container');
              changeView.changeView(templateView());
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      }
    });
  }
}
