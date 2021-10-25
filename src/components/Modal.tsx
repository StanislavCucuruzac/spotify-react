import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel'
import { Select, MenuItem } from '@material-ui/core'


function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal({ showModal, setShowModal, handleClose }: any) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const body = (
        <div>
            <h4>Playlist Name</h4>
            <InputLabel id="demo-simple-select-label">Name of Artist</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //  value={artistId}
                label="Name of Artist"
            //   onChange={handleChangeSelect}
            >
                {/* {artists.map((artist: any) =>{ */}
                <MenuItem value={1}>{"hello"}</MenuItem>
                {/* })}                                                      */}
            </Select>
            <SimpleModal />
        </div>
    );

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}