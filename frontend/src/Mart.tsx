import { it } from "node:test";
import { useState } from "react";
import styled from "styled-components";

interface Item {
  photoUrl: string;
  name: string;
  price: number;
}

const itemList = [
  {
    name: "Nike shoes",
    price: 30,
    photoUrl:
      "https://static.nike.com/a/images/t_default/aac777fa-ef84-488a-86b0-e8a1c7b52bad/pegasus-39-mens-road-running-shoes-jXTgc9.png",
  },
  {
    name: "iPad",
    price: 80,
    photoUrl:
      "https://images.immediate.co.uk/production/volatile/sites/3/2022/03/iPad-Air-5-main--190e689.jpg?quality=90&resize=620,414",
  },
  {
    name: "Sofa",
    price: 100,
    photoUrl:
      "https://www.ikea.com/kr/en/images/products/soederhamn-3-seat-sofa-viarp-beige-brown__0802692_pe768543_s5.jpg?f=s",
  },
];

const Mart = () => {
  const [items, setItems] = useState<Item[]>(itemList);
  const [shoppingCart, setShoppingCart] = useState<Item[]>([]);

  function findItemsById(id: any) {
    return items.find((item, index) => index === id);
  }
  const handleBuyNowButton = (id: number) => {
    const item = findItemsById(id);

    if (item) {
      setShoppingCart((cart) => [...cart, item]);
    }
  };

  const calculateCartTotal = (list: Item[]) => {
    let total = 0;

    list.forEach((item) => {
      total = total + item.price;
    });

    return total;
  };

  // 만약에 카트에 있는 금액이 100이 넘는다면 무료 아이콘 붙여주기
  const checkCartTotalisOver100 = (id: number, shoppingCart: Item[]) => {
    const item = findItemsById(id);

    if (item) {
      return calculateCartTotal(shoppingCart) + item?.price >= 100;
    }
  };

  return (
    <Block>
      <Header>
        <div>MegaMart</div>
        <CartTotal>{calculateCartTotal(shoppingCart)}</CartTotal>
      </Header>
      <ItemList>
        {items.map((item, id) => (
          <Item key={id}>
            <Photo src={item.photoUrl}></Photo>
            <div>
              <Name>{item.name}</Name>
              <PriceTag>${item.price}</PriceTag>
              <button onClick={() => handleBuyNowButton(id)}>Buy Now</button>
              {checkCartTotalisOver100(id, shoppingCart) && (
                <div>배송비 무료!</div>
              )}
            </div>
          </Item>
        ))}
      </ItemList>
    </Block>
  );
};

const CartTotal = styled.div``;

const Item = styled.li`
  display: flex;
`;

const Photo = styled.img`
  width: 200px;
  margin-right: 30px;
`;
const Name = styled.div`
  margin-bottom: 10px;
`;
const PriceTag = styled.div``;

const Block = styled.div`
  width: 700px;
  background-color: white;
`;

const Header = styled.header`
  height: 50px;
  background-color: #5f0080;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  font-size: 18px;
`;

const ItemList = styled.ul``;

export default Mart;
