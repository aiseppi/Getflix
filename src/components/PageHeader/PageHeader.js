import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from "@mui/icons-material/Movie";
import TvTwoToneIcon from "@mui/icons-material/TvTwoTone";
import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TheatersTwoToneIcon from "@mui/icons-material/TheatersTwoTone";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "purple",
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
      {/* <div id="logoContainer">
        <TheatersTwoToneIcon
          className={classes.icon}
          sx={{ fontSize: 95, transform: "rotate(90deg)" }}
        />
        <Typography
          className={classes.iconTypography}
          sx={{
            fontSize: 14.5,
            letterSpacing: "",
            fontFamily: "Roboto Condensed, sans-serif",
            fontWeight: "bolder",
            display: "flex",
            flexDirection: "wrap"
          }}
        >
          GETFLIX
        </Typography> */}
      <Typography
        sx={{
          fontFamily: "Roboto Condensed, sans-serif",
          fontSize: 50,
          color: "purple",
          letterSpacing: "8px",
          fontWeight: "bolder"
        }}
      >
        GETFLIX
      </Typography>
      {/* </div> */}
    </div>
  );
}
