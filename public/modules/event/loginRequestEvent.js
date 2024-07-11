import { getLoginData } from "../auth/getLoginData.js";
import { ViewChangeManager } from "../componentManager/viewChangeManager.js";
import { searchUserEvent } from "./searchUserRequestEvent.js";
import { templateView } from "../component/productTemplate.js";

export const loginRequestEvent = async (e) => {
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
          searchUserEvent();
          window.location.hash = "manager"
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
