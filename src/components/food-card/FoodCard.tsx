import "./FoodCard.css";
import { Card } from "@mui/material";
import {
  FastfoodOutlined,
  LocalFireDepartmentOutlined,
} from "@mui/icons-material";

const FoodCard = () => {
  return (
    <Card className="food-card" raised={false} sx={{ borderRadius: ".75rem" }}>
      <span className="food-card-image-container">
        <img className="food-image" src="https://i.imgur.com/8ewJgNK.png" alt="Food" />
      </span>
      <span className="food-card-meal-indicator"></span>
      <span className="food-card-details-container">
        <div className="food-title">Spaghetti</div>
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
