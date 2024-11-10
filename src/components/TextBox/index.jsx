import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function TextBox() {
  return (
    <Box sx={{ backgroundColor: "#010617" }}>
      <Typography sx={{ color: "white", mb: 2 }}>
        Recording Transcript
      </Typography>
      {/* <TextField
        id="outlined-multiline-flexible"
        label="Record a video to return a transcript"
        multiline
        fullWidth
        maxRows={4}
        InputProps={{
          readOnly: true,
          sx: {
            color: "#728094",
          },
        }}
        InputLabelProps={{
          sx: {
            color: "#728094",
          },
        }}
        sx={{
          width: "100%",
          height: 500,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#728094",
            },
            "&:hover fieldset": {
              borderColor: "#728094",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#728094",
            },
          },
        }}
      /> */}
      <Box
        sx={{
          borderRadius: "7px",
          border: "1px solid #242F48",
          color: "#728094",
          p: 1,
          height: "365px",
        }}
      >
        <Typography
          sx={{
            color: "#728094",
            fontSize: "14px",
          }}
        >
          <i>Record a video to return a transcript</i>
        </Typography>
      </Box>
    </Box>
  );
}
