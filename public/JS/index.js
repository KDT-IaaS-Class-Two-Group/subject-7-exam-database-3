document.getElementById("signup").addEventListener("click", function (event) {
  event.preventDefault(); // 기본 폼 제출 동작을 막습니다.
  const id = document.getElementById("id").value;
  console.log("ID:", id); // 콘솔에 입력 값을 출력합니다.

  const data = { id: id };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => console.log("Success:", data), (window.location.href = "/"))
    .catch((error) => console.error("Error:", error));
});
