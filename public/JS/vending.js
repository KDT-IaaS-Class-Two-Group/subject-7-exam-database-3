const sun = document.getElementById("suns");
sun.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("dd");
  window.location.href = "./public/HTML/index.html";
  // fetch("/Gologin", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify("로그인 요청"),
  // });
});
// const sun = document.querySelector(".sun");
const can = document.querySelector(".can");

sun.addEventListener("click", () => {
  can.style.backgroundColor = "red";
});

document.addEventListener("DOMContentLoaded", function () {
  const radiationlamp = document.querySelector(".radiationlamp");
  const radiationlamplight = document.querySelector(".radiationlamplight");
  const animallamp = document.querySelector(".animallamp");
  const animallamplight = document.querySelector(".animallamplight");
  const timelamp = document.querySelector(".timelamp");
  const timelamplight = document.querySelector(".timelamplight");
  const crimelamp = document.querySelector(".crimelamp");
  const crimelamplight = document.querySelector(".crimelamplight");
  const spacelamp = document.querySelector(".spacelamp");
  const spacelamplight = document.querySelector(".spacelamplight");

  radiationlamp.addEventListener("click", function () {
    // 클릭할 때마다 radiationlamplight의 표시 상태를 토글합니다.
    radiationlamplight.style.display =
      radiationlamplight.style.display === "none" ? "block" : "none";
  });
  animallamp.addEventListener("click", function () {
    // 클릭할 때마다 radiationlamplight의 표시 상태를 토글합니다.
    animallamplight.style.display =
      animallamplight.style.display === "none" ? "block" : "none";
  });
  timelamp.addEventListener("click", function () {
    // 클릭할 때마다 radiationlamplight의 표시 상태를 토글합니다.
    timelamplight.style.display =
      timelamplight.style.display === "none" ? "block" : "none";
  });
  crimelamp.addEventListener("click", function () {
    // 클릭할 때마다 radiationlamplight의 표시 상태를 토글합니다.
    crimelamplight.style.display =
      crimelamplight.style.display === "none" ? "block" : "none";
  });
  spacelamp.addEventListener("click", function () {
    // 클릭할 때마다 radiationlamplight의 표시 상태를 토글합니다.
    spacelamplight.style.display =
      spacelamplight.style.display === "none" ? "block" : "none";
  });
});
