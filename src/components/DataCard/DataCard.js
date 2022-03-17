import React, { useState } from "react";
import Rating from "../Rating/Rating";
import { Modal, Typography, Box } from "@mui/material";
import "./DataCard.css";
import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";
import { styled } from "@mui/system";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

const StyledOuterBox = styled(Box)({
  backgroundColor: "#FAF3F3",
  height: "50%",
  width: "50%",
  padding: "1rem",
  position: "relative",
  zIndex: 1,

  "@media (max-width: 500px)": {
    width: "30%",
    backgroundColor: "red"
  }
});

const StyledBackdropBox = styled(Box)({
  position: "absolute",
  zIndex: 2,
  top: 0,
  left: 0,
  width: "100%",
  height: "30%",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center"
});

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover"
});

const StyledTextOverlayBox = styled(Box)({
  position: "absolute",
  zIndex: 3,
  top: 0,
  left: 0,
  width: "100%",
  height: "30%",
  backgroundColor: "rgb(0, 0, 0, 0.5)"
});

const StyledOverlayText = styled(Typography)({
  color: "#FFF",
  fontSize: "1rem"
});

export default function DataCard({ item }) {
  let apiKey = "96cf33fdedaec4865a18d38e84e62ffc";
  let posterPath = item.poster_path
    ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
    : "https://drpp-ny.org/dev/wp-content/uploads/2014/07/sorry-image-not-available.png";
  let backdropPath = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
    : "none";

  const [open, setOpen] = useState(false);
  const [itemDetails, setitemDetails] = useState();
  const [genres, setGenres] = useState();
  const [runtime, setRuntime] = useState();
  // const classes = useStyles();

  const getMovieDetails = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}&language=en-US`
      )
      .then((dataResponse) => {
        let { data } = dataResponse;
        setitemDetails(data);
        setGenres(data.genres);
        setRuntime(data.runtime);
        setTimeout(() => {
          console.log(itemDetails);
        }, 2000);
      });
  };

  const getTVDetails = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${item.id}?api_key=${apiKey}&language=en-US`
      )
      .then((dataResponse) => {
        let { data } = dataResponse;
        setitemDetails(data);
        setGenres(data.genres);
        setRuntime(data.runtime);
        setTimeout(() => {
          console.log(itemDetails);
        }, 1000);
      });
  };
  const handleOpen = () => {
    if (item.media_type === "movie") {
      getMovieDetails();
    } else if (item.media_type === "tv") {
      getTVDetails();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // let overview = item.overview.toString().replace(/&amp;/g, "&");

  let genresList = genres
    ? genres.map((item, index) => {
        if (genres.length != index + 1) {
          return item.name + " • ";
        } else return item.name;
      })
    : [];

  const timeConvert = () => {
    let num = runtime;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return runtime ? `(${rhours}h ${rminutes}m)` : "";
  };

  let releaseYear = new Date(item.release_date).getFullYear();

  return (
    <div>
      <div id="cardContentMainContainer" onClick={handleOpen}>
        <div className="wrapper">
          <img id="posterImage" src={posterPath} alt="poster" />
        </div>
        <div id="itemInfoContainer">
          <span id="title">
            {item.original_title ? item.original_title : item.name}
          </span>
          {item.release_date ? (
            <span className="release-date">
              {item.release_date ? item.release_date : "N/A"}
            </span>
          ) : (
            <span className="release-date">
              {item.first_air_date ? item.first_air_date : "N/A"}
            </span>
          )}
        </div>
      </div>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledOuterBox>
          <StyledBackdropBox>
            <StyledImage src={backdropPath} />
          </StyledBackdropBox>

          <StyledTextOverlayBox>
            <StyledOverlayText
              // className={classes.overlayText}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {item.original_title ? item.original_title : item.name}{" "}
              {releaseYear ? `(${releaseYear})` : ""}
            </StyledOverlayText>
          </StyledTextOverlayBox>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </StyledOuterBox>
      </StyledModal>
    </div>
  );
}
