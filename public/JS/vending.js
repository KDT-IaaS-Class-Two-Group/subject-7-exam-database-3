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
