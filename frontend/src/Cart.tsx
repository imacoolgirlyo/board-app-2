import { useState } from "react";

interface Item {
  name: string;
  price: number;
}

const Cart = () => {
  const [items, setItems] = useState<Item[]>([]);

  /**
   * 처음에는 장바구니를 배열로 만든다.
   * 1. 장바구니에 담긴 가격 계산
   * 2. 바구니 총 가격이 20이 넘는 제품 옆에 free icon 붙이기
   * 3. 세금 계산하기.
   * 장바구니에 아이템 추가
   * 아이템 삭제
   * 블랙 프라이데이 행사로 인해, 장바구니에 제품을 담을 때 행사 가격으로 적용
   */
  return (
    <div>
      {items.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};

export default Cart;
