import { contentView } from "../component/productContent.js";
import { AddContentManager } from "../componentManager/addContentManager.js";

export const searchUserEvent = async (e) => {
  if (e.key === "Enter") {
    const response = await fetch('http://localhost:3000/search', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: e.target.value }),
      credentials: 'include'
    });
    const data = await response.json();

    const contentManager = new AddContentManager('content-container');

    for (let i = 0; i < data.length; i++) {
      contentManager.addContent(contentView(data[i].id, data[i].productName))
    }
  }
}