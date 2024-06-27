document.addEventListener('DOMContentLoaded', () => {
  const starsCount = 20;

  function createStar() {
    const star = createNode('div', 'star');
    setSize(star);
    randPosition(star);
    document.body.appendChild(star);

    star.addEventListener('animationend', () => {
      star.remove();
    });

    setKeyFrameDuration(star);
  }

  async function generateStars() {
    createStar();
    setTimeout(generateStars, Math.random() * 1000 + 500);
  }

  for (let i = 0; i < starsCount; i++) {
    generateStars();
  }
});

const setKeyFrameDuration = (htmlElement) => {
  const keyFrameDuration = Math.random() * 2 + 1;
  htmlElement.style.animationDuration = `${keyFrameDuration}s`;
}

const createNode = (tagName, ...className) => {
  const node = document.createElement(tagName);
  if (className !== null && className !== undefined) {
    node.classList.add(className);
  }
  return node;
}

const setSize = (htmlElement) => {
  const size = Math.random() * 10 + 10; // 10~20 px로 출력 되게끔;
  htmlElement.style.width = `${size}px`;
  htmlElement.style.height = `${size}px`;
}

const randPosition = (htmlElement) => {
  htmlElement.style.top = `${Math.random() * window.innerHeight}px`;
  htmlElement.style.left = `${Math.random() * window.innerWidth}px`;
}