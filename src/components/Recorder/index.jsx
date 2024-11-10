import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  styled,
  Paper,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import MicNoneIcon from "@mui/icons-material/MicNone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

const RecorderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const WebcamContainer = styled(Paper)({
  overflow: "hidden",
  borderRadius: "8px",
});

const StyledWebcam = styled(Webcam)({
  width: "100%",
  height: "auto",
  aspectRatio: "16/9",
  objectFit: "cover",
  display: "block",
});

const ControlsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const VoiceMeter = styled(LinearProgress)(({ theme }) => ({
  flexGrow: 1,
  height: 4,
  borderRadius: 2,
  backgroundColor: theme.palette.grey[800],
  ".MuiLinearProgress-bar": {
    backgroundColor: theme.palette.error.main,
  },
}));

const RecordButton = styled(Button)({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  padding: "10px 20px",
});

const Timer = styled(Typography)({
  color: "white",
  minWidth: "50px",
});

const VideoRecorder = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const timerRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  }, []);

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [recording]);

  const setupAudioAnalyser = async (stream) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    const updateMeter = () => {
      if (analyserRef.current && recording) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const average =
          dataArrayRef.current.reduce((a, b) => a + b) /
          dataArrayRef.current.length;
        setAudioLevel(average / 128);
        requestAnimationFrame(updateMeter);
      }
    };
    updateMeter();
  };

  const handleStartCaptureClick = useCallback(async () => {
    setRecording(true);
    setTimer(0);
    const stream = webcamRef.current.stream;
    await setupAudioAnalyser(stream);
    mediaRecorderRef.current = RecordRTC(stream, {
      type: "video",
    });
    mediaRecorderRef.current.startRecording();
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
  }, [handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    setRecording(false);
    mediaRecorderRef.current.stopRecording(() => {
      const blob = mediaRecorderRef.current.getBlob();
      setRecordedChunks([blob]);
    });
  }, []);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <RecorderContainer>
      <Typography
        sx={{ color: "white", alignItems: "center", display: "flex", gap: 1 }}
      >
        <VideocamOutlinedIcon sx={{ color: "color" }} />2 Recordings remaining
      </Typography>
      <WebcamContainer elevation={3}>
        <StyledWebcam audio={true} ref={webcamRef} mirrored />
      </WebcamContainer>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <MicNoneIcon
          sx={{
            color: "white",
          }}
        />
        <VoiceMeter variant="determinate" value={audioLevel * 100} />
      </Box>

      <ControlsContainer>
        <RecordButton
          variant="contained"
          startIcon={recording ? <StopIcon /> : <PlayArrowIcon />}
          onClick={recording ? handleStopCaptureClick : handleStartCaptureClick}
        >
          {recording ? "Stop Recording" : "Start Recording"}
        </RecordButton>

        <Timer
          variant="body1"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {" "}
          <FiberManualRecordIcon fontSize="small" sx={{ color: "#728094" }} />
          {formatTime(timer)}
        </Timer>
      </ControlsContainer>
      <Typography sx={{ fontSize: "14px ", color: "#728094" }}>
        <i>
          Your recording is automatically submitted after the recording is ended
        </i>
      </Typography>
    </RecorderContainer>
  );
};

export default VideoRecorder;
