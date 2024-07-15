const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const logosun = document.getElementById("logoSun");
const buttons = [
  { id: "one", message: "I like <strong>panda</strong>" },
  { id: "two", message: "I like <strong>cheetah</strong>" },
  { id: "three", message: "I like <strong>marmot</strong>" },
  { id: "four", message: "I like <strong>penguin</strong>" },
  { id: "five", message: "I like <strong>alpaca</strong>" },
];

buttons.forEach((button) => {
  const element = document.getElementById(button.id);
  let clicked = false;

  element.addEventListener("click", () => {
    if (!clicked) {
      const message = document.createElement("div");
      message.className = "message";
      message.innerHTML = button.message;
      element.appendChild(message);
    } else {
      const existingMessage = element.querySelector(".message");
      if (existingMessage) {
        element.removeChild(existingMessage);
      }
    }
    clicked = !clicked; // 클릭 상태를 토글합니다.
  });
});

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
    .then((data) => {
      console.log("Success:", data);
      if (data.loggedIn) {
        // 로그인 성공 시 처리할 내용
        console.log("Login successful");
        window.location.href = "/"; // 홈 화면으로 이동
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("입력한 아이디가 데이터 베이스에 존재하지 않습니다.");
    });
});
logosun.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "/"; // 홈 화면으로 이동
  console.log(1);
});
