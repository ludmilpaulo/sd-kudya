import { Alert } from "react-native";

export const getAllCartFoods = (items) => {
  let allFoods = [];
  const foodsData = items.map((x) => x.foods);
  foodsData.map((food) => {
    food.map((x) => {
      allFoods = [...allFoods, x];
    });
  });
  return allFoods;
};

export const getTotalCartItemPrice = (items) => {
  let allFoods = [];
  const foodsData = items.map((x) => x.foods);
  foodsData.map((food) => {
    food.map((x) => {
      allFoods = [...allFoods, x];
    });
  });
  return allFoods
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(1);
};
