import { useEffect, useState } from "react";
import GroceryListDisplay from "../../components/grocery-list-display/GroceryListDisplay";
import { GroceryList } from "../../models/GroceryList";
import "./GroceryListView.css";
import { useParams } from "react-router";
import { getGroceryListById } from "../../services/groceryService";
import GroceryListDisplaySkeleton from "../../components/grocery-list-display/GroceryListDisplaySkeleton";

const GroceryListView = () => {
  const [groceryList, setGroceryList] = useState<GroceryList>();

  let { groceryListId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      groceryListId
        ? setGroceryList(getGroceryListById(+groceryListId))
        : setGroceryList(getGroceryListById(1));
    }, 250);
  }, [groceryListId]);

  return <div className="max-page-content">
    {groceryList ?
      <GroceryListDisplay groceryList={groceryList} onChange={(groceryList: GroceryList) => { setGroceryList(groceryList); }} /> :
      <GroceryListDisplaySkeleton />
    }

  </div>;
};

export default GroceryListView;
