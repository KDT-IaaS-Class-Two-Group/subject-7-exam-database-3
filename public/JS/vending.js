const sun = document.querySelector(".sun");
const can = document.querySelector(".can");
// sun.addEventListener("click", (event) => {
//   event.preventDefault();
//   console.log("dd");
//   window.location.href = "./public/HTML/index.html";
//   // fetch("/Gologin", {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify("로그인 요청"),
//   // });
// });

sun.addEventListener("click", () => {
  can.style.backgroundColor = "red";
});

document.addEventListener("DOMContentLoaded", function () {
  const lamps = [
    { lamp: ".radiationlamp", light: ".radiationlamplight" },
    { lamp: ".animallamp", light: ".animallamplight" },
    { lamp: ".timelamp", light: ".timelamplight" },
    { lamp: ".crimelamp", light: ".crimelamplight" },
    { lamp: ".spacelamp", light: ".spacelamplight" },
  ];

  lamps.forEach(({ lamp, light }) => {
    const lampElement = document.querySelector(lamp);
    const lightElement = document.querySelector(light);
    lightElement.style.display = "none"; // 초기 상태를 'none'으로 설정

    lampElement.addEventListener("click", function () {
      // 클릭할 때마다 lightElement의 display 속성을 토글
      lightElement.style.display =
        lightElement.style.display === "none" ? "block" : "none";
    });
  });
});
