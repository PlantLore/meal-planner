import { Autocomplete, Button, Card, Dialog, Paper, TextField } from '@mui/material';
import { Grocery } from '../../models/Grocery';
import './GroceryUpsertDialog.css';
import { useState } from 'react';
import { GrocerySection } from '../../models/GrocerySection';
import { upsertGrocery } from '../../services/groceryService';

const GroceryUpsertDialog = ({ open, onClose }: { open: boolean, onClose: (grocery: Grocery | null) => void; }) => {
    const [grocery, setGrocery] = useState<Grocery>(new Grocery());
    const [submitted, setSubmitted] = useState<boolean>(false);

    const validateGrocery = (): boolean => {
        return !!grocery.name;
    };

    const handleClose = (returnValue: Grocery | null) => {
        onClose(returnValue);
    };

    const handleSubmit = () => {
        if (validateGrocery()) {
            upsertGrocery(grocery);
            onClose(grocery);
        } else {
            setSubmitted(true);
        }
    };

    return <Dialog
        open={open}
        PaperProps={{
            sx: { borderRadius: ".75rem", backgroundColor: "var(--paper-color)" },
        }}>
        <Card raised={false} sx={{ borderRadius: ".75rem", backgroundColor: "var(--card-color)", padding: ".75rem" }}>
            <h3>Grocery</h3>
            <TextField
                size='small'
                sx={{ marginBottom: '.75rem' }}
                label='Name'
                defaultValue={grocery.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setGrocery({ ...grocery, name: event.target.value });
                }}
                error={submitted && !grocery.name}
            />
            <Autocomplete
                size='small'
                sx={{ marginBottom: '.75rem' }}
                options={Object.values(GrocerySection)}
                value={grocery.section}
                onChange={(event: React.SyntheticEvent, value: string | null) => {
                    setGrocery({ ...grocery, section: value as GrocerySection || GrocerySection.OTHER });
                }}
                PaperComponent={(props) => <Paper {...props} sx={{ backgroundColor: "var(--card-color)" }} />}
                renderInput={(params) => <TextField
                    {...params}
                    label='Section'
                />}
            />
            <div className="grocery-upsert-dialog-actions-container">
                <Button
                    type="reset"
                    color="error"
                    variant="contained"
                    onClick={() => {
                        handleClose(null);
                    }}
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} type="button" variant="contained">
                    Submit
                </Button>
            </div>
        </Card>
    </Dialog>;
};

export default GroceryUpsertDialog;