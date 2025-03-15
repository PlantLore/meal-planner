import { IconButton, TextField } from '@mui/material';
import './DirectionUpsert.css';
import { Delete } from '@mui/icons-material';
import { Step } from '../../../../models/Step';
import { useState } from 'react';

const DirectionUpsert = ({ step, onChange, onDelete, submitted }: { step: Step, onChange: (step: Step) => void, onDelete: () => void, submitted: boolean; }) => {
    const [blured, setBlured] = useState<boolean>(false);

    return <div className='direction-upsert-container'>
        <TextField
            fullWidth
            multiline
            size='small'
            label='Instructions *'
            defaultValue={step.text}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange({ ...step, text: event.target.value });
            }}
            onBlur={() => { setBlured(true); }}
            error={(submitted || blured) && !step.text}
        />
        <IconButton onClick={onDelete} sx={{ margin: 'auto 0' }}>
            <Delete />
        </IconButton>
    </div>;
};

export default DirectionUpsert;