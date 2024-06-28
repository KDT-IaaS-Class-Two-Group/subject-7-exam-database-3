const sun = document.getElementById("suns");
sun.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("dd");
  fetch("/Gologin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "로그인 요청" }),
  }).then(response => {
    if (response.ok) {
      response.text().then(html => {
        document.open();
        document.write(html);
        document.close();
      });
    } else {
      console.error("Error:", response.statusText);
    }
  }).catch(error => {
    console.error("Error:", error);
  });
});
