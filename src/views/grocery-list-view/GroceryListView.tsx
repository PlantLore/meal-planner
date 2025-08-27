import { useEffect, useState } from "react";
import GroceryListDisplay from "../../components/grocery-list-display/GroceryListDisplay";
import { GroceryList } from "../../models/GroceryList";
import "./GroceryListView.css";
import { useBlocker, useNavigate, useParams } from "react-router";
import { getGroceryListById } from "../../services/groceryService";
import GroceryListDisplaySkeleton from "../../components/grocery-list-display/GroceryListDisplaySkeleton";
import { Button, Fade, Modal, Paper } from "@mui/material";

const GroceryListView = () => {
  const [groceryList, setGroceryList] = useState<GroceryList>();
  const [hasPending, setHasPending] = useState(false);
  const [showNavigationWarning, setShowNavigationWarning] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null);

  const navigate = useNavigate();

  useBlocker(
    ({nextLocation}) => {
      if (hasPending) {
        setNavigationTarget(nextLocation.pathname);
        setShowNavigationWarning(true);
        return true;
      }
      return false;
    }
  );

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
      <GroceryListDisplay 
        groceryList={groceryList} 
        onChange={(groceryList: GroceryList) => { setGroceryList(groceryList); }} 
        onPendingChange={setHasPending}/> :
      <GroceryListDisplaySkeleton />
    }
    <Modal
      open={showNavigationWarning}
      onClose={() => setShowNavigationWarning(false)}>
        <Fade in={showNavigationWarning} timeout={250}>
          <div className="modal-navigation-warning-container">
            <Paper elevation={3} sx={{
              width: 'fit-content',
              maxWidth: '30vw',
              height: 'fit-content',
              backgroundColor: 'var(--card-color)',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: '2px',
              padding: '1rem',
              gap: '1rem',
              fontSize: '1.2rem',
            }}>
              <div>You have unsaved grocery items. Are you sure you want to leave?</div>
              <div className="navigation-warning-actions-container">
                <Button variant="contained" onClick={() => setShowNavigationWarning(false)}>
                  No
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setShowNavigationWarning(false)
                    setHasPending(false);
                    setTimeout(() => {
                      if (navigationTarget != null) navigate(navigationTarget);
                    })
                  }}
                >
                  Yes
                </Button>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>

  </div>;
};

export default GroceryListView;
