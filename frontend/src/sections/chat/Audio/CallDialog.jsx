import React, { useRef } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axios";
import { socket } from "../../../socket";
import { ResetAudioCallQueue } from "../../../app/slices/audioCall";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CallDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const audioStreamRef = useRef(null);

  //* Use params from call_details if available => like in case of receiver's end

  const [call_details] = useSelector((state) => state.audioCall.call_queue);
  const {incoming} = useSelector((state) => state.audioCall);

  const appID = 686730139;
  const server = "wss://webliveroom686730139-api.coolzcloud.com/ws";

  // roomID => ID of conversation => current_conversation.id
  // token => generate on backend & get on App
  // userID => ID of this user
  // userName => slug formed by user's name

  const roomID = call_details?.roomID;
  const userID = call_details?.userID;
  const userName = call_details?.userName;

  const zg = new ZegoExpressEngine(appID, server);

  const streamID = call_details?.streamID;

  const handleDisconnect = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    } else {
      dispatch(ResetAudioCallQueue());

      socket?.off("audio_call_accepted");
      socket?.off("audio_call_denied");
      socket?.off("audio_call_missed");

      // stop publishing local audio stream to remote users, call the stopPublishingStream method with the corresponding stream ID passed to the streamID parameter.
      zg.stopPublishingStream(streamID);
      zg.stopPlayingStream(userID);
      zg.destroyStream(audioStreamRef.current);
      zg.logoutRoom(roomID);

      // handle Call Disconnection => this will be handled as cleanup when this dialog unmounts

      // at the end call handleClose Dialog
      handleClose();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit(
        "audio_call_not_picked",
        { to: streamID, from: userID },
        () => {
          // TODO abort call => Call verdict will be marked as Missed
        }
      );
    }, 30 * 1000);

    socket.on("audio_call_missed", () => {
      handleDisconnect();
    });

    socket.on("audio_call_accepted", () => {
      // clear timeout for "audio_call_not_picked"
      clearTimeout(timer);
    });

    if (!incoming) {
      socket.emit("start_audio_call", {
        to: streamID,
        from: userID,
        roomID,
      });
    }

    socket.on("audio_call_denied", () => {
      handleDisconnect();
    });

    // make a POST API call to server & fetch token

    let this_token;

    async function fetchToken() {
      const response = await axiosInstance.post(
        "/api/users/generate-zego-token",
        {
          userId: userID,
          room_id: roomID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      this_token = response.data.token;

    }

    fetchToken();

    zg.checkSystemRequirements()
      .then((result) => {
        // The [result] indicates whether it is compatible. It indicates WebRTC is supported when the [webRTC] is [true]. For more results, see the API documents.

        // {
        //   webRTC: true,
        //   customCapture: true,
        //   camera: true,
        //   microphone: true,
        //   videoCodec: { H264: true, H265: false, VP8: true, VP9: true },
        //   screenSharing: true,
        //   errInfo: {}
        // }

        const { webRTC, microphone } = result;

        if (webRTC && microphone) {
          zg.loginRoom(
            roomID,
            this_token,
            { userID, userName },
            { userUpdate: true }
          )
            .then(async (result) => {

              // After calling the CreateStream method, you need to wait for the ZEGOCLOUD server to return the local stream object before any further operation.
             const localStream = await zg.createStream({
                camera: { audio: true, video: false },
              });

              audioStreamRef.current = localStream;

              // Get the audio tag.
              const localAudio = document.getElementById("local-audio");
              // The local stream is a MediaStream object. You can render audio by assigning the local stream to the srcObject property of video or audio.
              localAudio.srcObject = localStream;

              // localStream is the MediaStream object created by calling creatStream in the previous step.
              zg.startPublishingStream(streamID, localStream);

              zg.on("publisherStateUpdate", (result) => {
                // Callback for updates on stream publishing status.
                // ...
                // * we can use this info to show connection status
              });

              zg.on("publishQualityUpdate", (streamID, stats) => {
                // Callback for reporting stream publishing quality.
                // ...
                // console.log(streamID, stats);
                // * we can use this info to show local audio stream quality
              });
            })
            .catch((error) => {
              console.log(error);
            });

          // Callback for updates on the current user's room connection status.
          zg.on("roomStateUpdate", (roomID, state, errorCode, extendedData) => {
            if (state === "DISCONNECTED") {
              // Disconnected from the room
              // * Can be used to show disconnected status for a user (especially useful in a group call)
            }

            if (state === "CONNECTING") {
              // Connecting to the room
              // * Can be used to show connecting status for a user (especially useful in a group call)
            }

            if (state === "CONNECTED") {
              // Connected to the room
              // * Can be used to show connected status for a user (especially useful in a group call)
            }
          });

          // Callback for updates on the status of ther users in the room.
          zg.on("roomUserUpdate", async (roomID, updateType, userList) => {
            console.warn(
              `roomUserUpdate: room ${roomID}, user ${
                updateType === "ADD" ? "added" : "left"
              } `,
              JSON.stringify(userList)
            );
            if (updateType !== "ADD") {
            
              handleDisconnect();
            } else {
              // const current_users = JSON.stringify(userList);
              // * We can use current_users_list to build dynamic UI in a group call
              const remoteStream = await zg.startPlayingStream(userID);

              // Get the audio tag.
              const remoteAudio = document.getElementById("remote-audio");
              // The local stream is a MediaStream object. You can render audio by assigning the local stream to the srcObject property of video or audio.

              remoteAudio.srcObject = remoteStream;
              remoteAudio.play();
            }
          });

          // Callback for updates on the status of the streams in the room.
          zg.on(
            "roomStreamUpdate",
            async (roomID, updateType, streamList, extendedData) => {
              if (updateType === "ADD") {
                // New stream added, start playing the stream.
                console.log(
                  "ADD",
                  roomID,
                  updateType,
                  streamList,
                  extendedData
                );

                // * It would be quite useful to create and play multiple audio streams in a group call
              } else if (updateType === "DELETE") {
                // Stream deleted, stop playing the stream.
                console.log(
                  "DELETE",
                  roomID,
                  updateType,
                  streamList,
                  extendedData
                );

                // * Can be used to drop audio streams (more useful in a group call)
              }
            }
          );

          zg.on("playerStateUpdate", (result) => {
            // Callback for updates on stream playing status.
            // ...
            // * Can be used to display realtime status of a remote audio stream (Connecting, connected & Disconnected)
          });

          zg.on("playQualityUpdate", (streamID, stats) => {
            // Callback for reporting stream playing quality.
            // * Can be used to display realtime quality of a remote audio stream
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDisconnect}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Stack direction="row" spacing={24} p={2}>
            <Stack>
              <Avatar
                sx={{ height: 100, width: 100 }}
                src={`https://alliza.s3.us-east-1.amazonaws.com/${call_details?.from_user?.avatar}`}
              />
              <audio id="local-audio" controls={false} />
            </Stack>
            <Stack>
              <Avatar
                sx={{ height: 100, width: 100 }}
                src={`https://alliza.s3.us-east-1.amazonaws.com/${user?.avatar}`}
              />
              <audio id="remote-audio" controls={false} />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisconnect} variant="contained" color="error">
            End Call
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CallDialog;