export const contentView = (id, product) => {
  return `    <div class="content">
                  <p>구매내역  | </p>
                  <span>사용자 : ${id}</span>
                  <p>상품: ${product}</p>
                  <button>삭제</button>
                </div>`;
}
