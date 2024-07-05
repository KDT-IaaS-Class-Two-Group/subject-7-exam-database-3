const contentView = (productName, price, stock) => {
  return `    <div class="content">
                  <span>상품명 : ${productName}</span>
                  <input type="text" placeholder="Enter amount">
                  <div class="buttons">
                    <button>+</button>
                    <button>-</button>
                  </div>
                  <p>가격: ${price}</p>
                  <p>재고: ${stock}</p>
                  <button>삭제</button>
                </div>`;
}
