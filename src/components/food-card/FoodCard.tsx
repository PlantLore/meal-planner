import "./FoodCard.css";
import { Card } from "@mui/material";
import {
  FastfoodOutlined,
  LocalFireDepartmentOutlined,
} from "@mui/icons-material";

const FoodCard = () => {
  return (
    <Card className="food-card" sx={{ borderRadius: "10rem 0 0 10rem" }}>
      <span className="food-card-image-container">
        <img className="food-image" src="https://i.imgur.com/8ewJgNK.png" />
      </span>
      <span className="food-card-details-container">
        <p>Spaghetti</p>
        <span className="food-fact-container">
          <LocalFireDepartmentOutlined></LocalFireDepartmentOutlined>: 600
        </span>
        <span className="food-fact-container">
          <FastfoodOutlined></FastfoodOutlined>: 4
        </span>
      </span>
    </Card>
  );
};

export default FoodCard;
