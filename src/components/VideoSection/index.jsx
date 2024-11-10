import React from "react";
import Box from "@mui/material/Box";
import Recorder from "../Recorder/index";
import Typography from "@mui/material/Typography";
import TextBox from "../TextBox";
export default function Videosection() {
  return (
    <Box
      sx={{
        backgroundColor: "#010617",
        height: { md: "100vh", xs: "100%" },
        paddingX: { md: "20%", xs: "25px" },
        paddingY: "40px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "white",
        }}
      >
        Question 1
      </Typography>
      <Typography
        sx={{
          color: "white",
          mb: 4,
        }}
      >
        Can you describe a challenging project you worked on and how you
        overcome obstacles to complete it?
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            width: { md: "50%", xs: "100%" },
          }}
        >
          <Recorder />
        </Box>
        <Box
          sx={{
            width: { md: "50%", xs: "100%" },
          }}
        >
          <TextBox />
        </Box>
      </Box>
    </Box>
  );
}
