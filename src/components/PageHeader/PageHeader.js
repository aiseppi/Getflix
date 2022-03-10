import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from "@mui/icons-material/Movie";
import TvTwoToneIcon from "@mui/icons-material/TvTwoTone";
import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TheatersTwoToneIcon from "@mui/icons-material/TheatersTwoTone";
// import logomain from "./media/logo/logomain.png";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#5F0F4E",
    position: "absolute",
    top: "0%",
    left: "1%"
  },
  iconTypography: {
    color: "purple",
    position: "absolute",
    top: "4.5%",
    left: "3.2%",
    display: "flex",
    flexDirection: "wrap"
  }
}));

export default function PageHeader() {
  const classes = useStyles();
  return (
    <div>
      <img src="./media/logo/logomain.png" />
      {/* <Typography
        sx={{
          fontFamily: "Roboto Condensed, sans-serif",
          fontSize: 50,
          color: "purple",
          letterSpacing: "8px",
          fontWeight: "bolder"
        }}
      >
        GETFLIX
      </Typography> */}
      {/* </div> */}
    </div>
  );
}
