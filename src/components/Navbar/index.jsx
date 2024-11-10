import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0E1729",
          p: 1,
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Logo
          </Typography>
          <Box
            sx={{
              textAlign: "right",
            }}
          >
            <Typography>
              Candidate Name:{" "}
              <span
                style={{
                  color: "#728094",
                }}
              >
                John Doe
              </span>
            </Typography>
            <Typography>
              ID:{" "}
              <span
                style={{
                  color: "#728094",
                }}
              >
                ABCD2716271
              </span>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
