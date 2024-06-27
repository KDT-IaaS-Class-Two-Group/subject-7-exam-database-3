document.addEventListener('DOMContentLoaded', () => {
  const starsCount = 20;
  /**
   * ? createStar : 생성한 모듈을 호출하여 로직을 실행하는 함수, 한번의 동작으로 별 생성, 제거를 수행하며 애니메이션을 부여하는 역할
   */
  const createStar = () => {
    const star = createNode('div', 'star');
    setSize(star);
    randPosition(star);
    document.body.appendChild(star);
    star.addEventListener('animationend', () => {
      star.remove();
    });
    setKeyFrameDuration(star);
  };
  /**
   * 재귀를 통해 createStar를 호출한다. 
   */
  const generateStars = async () => {
    createStar();
    setTimeout(generateStars, Math.random() * 1000 + 500);
  };

  for (let i = 0; i < starsCount; i++) {
    generateStars();
  }
});


/**
 * ? setKeyFrameDuration : 입력받은 노드의 애니메이션 길이를 지정해준다.
 * @param {*} htmlElement : type : HTMLElement
 * @returns : void
 */
const setKeyFrameDuration = (htmlElement) => {
  const keyFrameDuration = Math.random() * 2 + 1;
  htmlElement.style.animationDuration = `${keyFrameDuration}s`;
}

/**
 * ? createNode : 입력받은 데이터들을 기반으로 노드를 생성한다.
 * @param {*} tagName : string
 * @param  {...any} className : string
 * @returns : HTMLElement
 */

const createNode = (tagName, ...className) => {
  const node = document.createElement(tagName);
  if (className !== null && className !== undefined) {
    node.classList.add(className);
  }
  return node;
}

/**
 * ? setSize : html 태그들의 위치를 지정해준다.
 * @param {*} htmlElement : HTMLElement
 */
const setSize = (htmlElement) => {
  const size = Math.random() * 10 + 10; // 10~20 px로 출력 되게끔;
  htmlElement.style.width = `${size}px`;
  htmlElement.style.height = `${size}px`;
}

/**
 * ? randPosition : 랜덤한 위치로 포지션값을 지정해준다.
 * @param {*} htmlElement : HTMLElement
 */
const randPosition = (htmlElement) => {
  htmlElement.style.top = `${Math.random() * window.innerHeight}px`;
  htmlElement.style.left = `${Math.random() * window.innerWidth}px`;
}