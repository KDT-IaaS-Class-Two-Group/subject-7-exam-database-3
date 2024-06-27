document.getElementById("submit").addEventListener("click", function () {
  const id = document.getElementById("id").value;
  const data = { id : id};

  fetch ("/login", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify(data),
  })
})