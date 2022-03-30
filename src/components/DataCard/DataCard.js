import React, { useState } from "react";
import { Modal, Typography, Box } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "react-circular-progressbar/dist/styles.css";
import Cast from "../Cast/Cast.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const StyledCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "20px",
  borderRadius: "20px",
  width: "280px",
  height: "425px",
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
    height: "400px",
    borderRadius: "5px",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",

    "@media (min-width: 500px)": {
      width: "100%",
      height: "300px"
    }
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
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  outline: 0,
  width: "100%",
  height: "50%",
  margin: "auto 0",
  backgroundColor: "black",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",

  "& Box": {
    outline: 0
  },

  [theme.breakpoints.up("sm")]: {
    height: "45%"
  },

  [theme.breakpoints.up("md")]: {
    height: "50%"
  }
  // [theme.breakpoints.up("xl")]: {
  //   height: "60%"
  // }
}));

const StyledOverlay = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 2,
  backgroundColor: "rgb(95, 15, 78,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  outline: 0
}));

const StyledContentBox = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "90%",
  backgroundColor: "rgb(0,0,0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  outline: 0,
  borderRadius: "0.5rem",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

  [theme.breakpoints.up("sm")]: {
    width: "90%",
    height: "100%",
    borderRadius: 0,
    justifyContent: "flex-start"
  },
  [theme.breakpoints.up("lg")]: {
    width: "80%"
  },
  [theme.breakpoints.up("xl")]: {
    width: "60%"
  }
}));

const StyledImgAndRatingBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "50%",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  position: "relative",
  display: "none",

  [theme.breakpoints.up("sm")]: {
    display: "block",
    width: "45%"
  },
  [theme.breakpoints.up("md")]: {
    width: "32%"
  }
}));
const StyledPosterImage = styled("img")({
  height: "100%",
  width: "100%",
  position: "absolute",
  zIndex: 1
});
const StyledProgressBox = styled(Box)(({ theme }) => ({
  height: "40px",
  width: "40px",
  position: "absolute",
  zIndex: 2,
  right: 5,
  top: 5,

  [theme.breakpoints.up("sm")]: {
    height: "50px",
    width: "50px"
  },
  [theme.breakpoints.up("lg")]: {
    height: "60px",
    width: "60px"
  }
}));

const StyledDetailsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  color: "FFF",
  paddingLeft: "0.5rem",
  overflow: "auto",
  overflowX: "hidden",
  "::-webkit-scrollbar": {
    width: 0,
    background: "transparent"
  },
  [theme.breakpoints.up("sm")]: {
    width: "55%"
  },
  [theme.breakpoints.up("md")]: {
    width: "68%"
  }
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.25rem",

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.45rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem"
  },

  [theme.breakpoints.up("lg")]: {
    fontSize: "1.7rem"
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2rem"
  }
}));

const StyledGenresLength = styled(Typography)(({ theme }) => ({
  color: "FFF",
  fontSize: "0.90rem",
  opacity: "70%",
  [theme.breakpoints.up("sm")]: {
    fontSize: ""
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem"
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.1rem"
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.3rem"
  }
}));

const StyledTagline = styled(Typography)(({ theme }) => ({
  fontStyle: "italic",
  marginTop: "1rem",
  color: "#e52a6f",
  fontWeight: "bold",

  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem"
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.3rem"
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.5rem"
  }
}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: "#FFF",
  marginTop: "1rem",

  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem"
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.3rem"
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.5rem"
  }
}));
const StyledOverview = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  opacity: "70%",

  [theme.breakpoints.up("md")]: {
    fontSize: "1.1rem"
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.2rem"
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.4rem"
  }
}));

export default function DataCard({ item }) {
  let apiKey = "96cf33fdedaec4865a18d38e84e62ffc";
  let posterPath = item?.poster_path
    ? `https://image.tmdb.org/t/p/original/${item?.poster_path}`
    : "https://drpp-ny.org/dev/wp-content/uploads/2014/07/sorry-image-not-available.png";
  let backdropPath = item?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${item?.backdrop_path}`
    : "none";

  const [open, setOpen] = useState(false);
  const [itemDetails, setitemDetails] = useState();
  const [genres, setGenres] = useState();
  const [runtime, setRuntime] = useState();
  const [seasonsInfo, setSeasonsInfo] = useState();
  const [cast, setCast] = useState();
  // const [ratingColor, setRatingColor] = useState();

  const getMovieDetails = () => {
    let endpoints = [
      `https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}&language=en-US`,
      `https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${apiKey}&language=en-US`
    ];

    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread((...allData) => {
        let details = allData[0].data;
        let { cast } = allData[1].data;
        setitemDetails(details);
        setGenres(details?.genres);
        setRuntime(details?.runtime);
        setCast(cast);
      })
    );
  };

  const getTVDetails = () => {
    let endpoints = [
      `https://api.themoviedb.org/3/tv/${item.id}?api_key=${apiKey}&language=en-US`,
      `https://api.themoviedb.org/3/tv/${item.id}/credits?api_key=${apiKey}&language=en-US`
    ];

    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread((...allData) => {
        let details = allData[0].data;
        let { cast } = allData[1].data;
        console.log(details);
        console.log(cast);
        setitemDetails(details);
        setGenres(details.genres);
        setRuntime(details.runtime);
        setCast(cast);
        if (details.hasOwnProperty("number_of_seasons")) {
          setSeasonsInfo({
            seasons: details.number_of_seasons,
            episodes: details.number_of_episodes
          });
        }
      })
    );
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

  let overview = item.overview
    ? item.overview?.toString().replace(/&amp;/g, "&")
    : `Overview not available for "${
        item.original_title ? item.original_title : item.name
      }".`;

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
          return item.name + ", ";
        } else
          return timeConvert()
            ? item.name + "  " + "  •  " + "  " + timeConvert()
            : item.name + " ";
      })
    : [];

  let castList = cast
    ? cast.map((castMember, index) => {
        return (
          <Cast key={castMember.cast_id + `${index}`} castMember={castMember}>
            {" "}
          </Cast>
        );
      })
    : [];

  let percentage = item.vote_average ? item.vote_average * 10 : "";

  const getRatingColor = (percentage) => {
    if (percentage >= 75) {
      return "green";
    } else if (percentage <= 74 && percentage >= 55) {
      return "yellow";
    } else return "red";
  };

  let ratingColor = getRatingColor(percentage);

  let userScore = () => {
    if (percentage != "") {
      return (
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          background
          styles={buildStyles({
            backgroundColor: "rgb(0,0,0,0.5)",
            textSize: "2rem",
            textColor: "#FFF",
            pathColor: `${ratingColor}`,
            trailColor: " rgb(0,0,0,0.5)",
            border: "none"
          })}
        />
      );
    }
  };
  let releaseYear = new Date(item.release_date).getFullYear();
  let tagline = itemDetails?.tagline ? itemDetails.tagline : " ";
  let seasonsAndEpisodes = `${seasonsInfo?.seasons} Season(s)  ••  ${seasonsInfo?.episodes} Episodes`;

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
        sx={{ backgroundImage: `url(${backdropPath})` }}
      >
        <StyledOverlay>
          <StyledContentBox>
            <StyledImgAndRatingBox>
              <StyledPosterImage src={posterPath} />
              <StyledProgressBox>{userScore()}</StyledProgressBox>
            </StyledImgAndRatingBox>
            <StyledDetailsContainer>
              <StyledTitle sx={{ color: "white" }}>
                {item.original_title ? item.original_title : item.name}
                {releaseYear ? ` (${releaseYear})` : ""}
              </StyledTitle>
              <StyledGenresLength sx={{ color: "#FFF" }}>
                {genresList}
              </StyledGenresLength>
              <Typography sx={{ color: "#FFF" }}>
                {itemDetails?.hasOwnProperty("number_of_seasons")
                  ? `${seasonsAndEpisodes}`
                  : " "}
              </Typography>
              <StyledTagline>{tagline}</StyledTagline>
              <StyledHeader>Overview:</StyledHeader>
              <StyledOverview sx={{ color: "#FFF" }}>{overview}</StyledOverview>
              <StyledHeader>Cast:</StyledHeader>
              <Slider
                dots={false}
                rows={1}
                infinite={true}
                slidesToShow={2}
                variableWidth={true}
                // infinite={false}
                autoplay={false}
                autoplaySpeed={3000}
                swipeToSlide={true}
                pauseOnFocus={true}
              >
                {castList}
              </Slider>
            </StyledDetailsContainer>
          </StyledContentBox>
        </StyledOverlay>
      </StyledModal>
    </div>
  );
}
