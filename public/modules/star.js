document.addEventListener('DOMContentLoaded', () => {
  const starContainer = document.getElementById('body');
  const starsCount = 20;
  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    const size = Math.random() * 10 + 10; // 10~20 px로 출력 되게끔;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    // window 내부 랜덤한 위치에서 생성
    star.style.top = `${Math.random() * window.innerHeight}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    starContainer.appendChild(star);
    star.addEventListener('animationend', () => {
      star.remove();
    });
    const blinkDuration = Math.random() * 2 + 1;  // 1~3초
    star.style.animationDuration = `${blinkDuration}s`;
  }

  async function generateStars() {
    createStar();
    setTimeout(generateStars, Math.random() * 1000 + 500);
  }


  for (let i = 0; i < starsCount; i++) {
    generateStars();
  }
});
