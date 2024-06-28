document.getElementById("submit").addEventListener("click", function () {
  const id = document.getElementById("id").value;
  const data = { id: id };

  console.log(data);
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
});
