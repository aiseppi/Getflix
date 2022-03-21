import React, { useState } from "react";
import Rating from "../Rating/Rating";
import { Modal, Typography, Box } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";

const StyledCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "20px",
  borderRadius: "20px",
  width: "250x",
  height: "400px",
  fontSize: "1rem",

  "@media (min-width: 500px)": {
    width: "200px",
    height: "350px"
  },

  "& .wrapper": {
    width: "100%"
  },

  "& .poster-image": {
    width: "100%",
    height: "300px",
    borderRadius: "5px",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
  },

  "& .item-info-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "right",
    fontSize: "0.75rem",
    color: "black",
    textAlign: "left",
    paddingRight: "10px"
  },

  "& .title": {
    fontWeight: "bold",
    textAlign: "right",
    minWidth: 0
  },
  "& .release-date": {
    textAlign: "right"
  }
});
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  outline: 0,

  "& Box": {
    outline: 0
  }
});

const StyledTopBox = styled(Box)({
  backgroundColor: "green",
  height: "35%"
});
const StyledOuterBox = styled(Box)({
  backgroundColor: "#FAF3F3",
  height: "50%",
  width: "80%",
  // padding: "1rem",
  position: "relative",
  zIndex: 1,

  "@media (min-width: 1400px)": {
    width: "40%"
  }
});

const StyledBackdropBox = styled(Box)({
  position: "absolute",
  zIndex: 2,
  top: 0,
  left: 0,
  width: "100%",
  height: "35%",
  backgroundPosition: "50% 50%",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat"
});

const StyledTextOverlayBox = styled(Box)({
  position: "absolute",
  zIndex: 3,
  top: 0,
  left: 0,
  width: "100%",
  height: "35%",
  backgroundColor: "rgb(0, 0, 0, 0.5)"
});

const StyledBottomBox = styled(Box)({
  height: "65%",
  width: "100%"
  // padding: "0.5rem"
});

const StyledOverlayText = styled(Typography)({
  position: "absolute",
  color: "#FFF",
  fontSize: "1.15rem",
  top: "80%",
  left: "10px",
  "@media (min-width: 700px": {
    fontSize: "1.75rem",
    top: "75%"
  },
  "@media (min-width: 1200px)": {
    fontSize: "1.75rem",
    top: "75%"
  }
});

const StyledGenres = styled(Typography)({});
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

  let overview = item.overview.toString().replace(/&amp;/g, "&");

  const timeConvert = () => {
    let num = runtime;
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return runtime ? `${rhours}h ${rminutes}m` : "";
  };
  let genresList = genres
    ? genres.map((item, index) => {
        if (genres.length != index + 1) {
          return item.name + " • ";
        } else return item.name + " • " + timeConvert();
      })
    : [];

  let releaseYear = new Date(item.release_date).getFullYear();

  return (
    <div>
      <StyledCard id="cardContentMainContainer" onClick={handleOpen}>
        <div className="wrapper">
          <img
            className="poster-image"
            id="posterImage"
            src={posterPath}
            alt="poster"
          />
        </div>
        <div className="item-info-container" id="itemInfoContainer">
          <span className="title" id="title">
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
      </StyledCard>

      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledOuterBox>
          <StyledTopBox>
            <StyledBackdropBox sx={{ backgroundImage: `url(${backdropPath})` }}>
              {/* <StyledImage src={backdropPath} /> */}
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
          </StyledTopBox>
          <StyledBottomBox>
            <StyledGenres>{genresList}</StyledGenres>
            <Typography
              className="tagline"
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              {overview}
            </Typography>
            <Typography className="overview"></Typography>
          </StyledBottomBox>
        </StyledOuterBox>
      </StyledModal>
    </div>
  );
}
