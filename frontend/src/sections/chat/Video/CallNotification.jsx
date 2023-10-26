import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetVideoCallQueue,
  UpdateVideoCallDialog,
} from "../../../app/slices/videoCall";
import { socket } from "../../../socket";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CallNotification = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const [call_details] = useSelector((state) => state.videoCall.call_queue);

  const handleAccept = () => {
    socket.emit("video_call_accepted", { ...call_details });
    dispatch(UpdateVideoCallDialog({ state: true }));
  };

  const handleDeny = () => {
    socket.emit("video_call_denied", { ...call_details });
    dispatch(ResetVideoCallQueue());
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeny}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Stack direction="row" spacing={24} p={2}>
            <Stack>
              <Avatar
                sx={{ height: 100, width: 100 }}
                src={`https://alliza.s3.us-east-1.amazonaws.com/${call_details?.from_user?.avatar}`}
              />
            </Stack>
            <Stack>
              <Avatar
                sx={{ height: 100, width: 100 }}
                src={`https://alliza.s3.us-east-1.amazonaws.com/${user?.avatar}`}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccept} variant="contained" color="success">
            Accept
          </Button>
          <Button onClick={handleDeny} variant="contained" color="error">
            Deny
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CallNotification;