import React, { useState, useEffect } from "react";
import Rating from "../Rating/Rating";
import { makeStyles } from "@mui/styles";
import { Modal, Typography, Box } from "@mui/material";
import "./DataCard.css";
import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

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
  const classes = useStyles();

  // useEffect(()=> {
  //   getMovieDetails();
  //   async function getMovieDetails(){
  //     const response = await fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}&language=en-US`);
  //     const data = await response.json();
  //     console.log(data);
  //   }
  // }, [setOpen]);

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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modal}
      >
        <Box
          sx={{
            position: "relative",
            width: 600,
            height: 200,
            borderRadius: 2
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              border: "2px solid #FFFFFF",
              boxShadow: (theme) => theme.shadows[5],
              padding: 2,
              position: "absolute",
              backgroundImage: `url(${backdropPath})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "blur(2px)",
              webkitFilter: "blur(2px)",
              zIndex: -1,
              width: "100%",
              height: "100%",
              borderRadius: 2
            }}
          ></Box>
          <Box
            sx={{
              zIndex: 3,
              color: "White",
              padding: 2,
              width: "100%",
              height: "100%",
              border: "2px solid #FFFFFF",
              borderRadius: 2,
              overflow: "scroll",
              backgroundColor: "rgba(0,0,0, 0.5)"
            }}
          >
            <div class="modal-title-container">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {item.original_title ? item.original_title : item.name}{" "}
                {timeConvert()}
              </Typography>
              <Typography>{genresList}</Typography>
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {item.overview.toString().replace(/&amp;/g, "&")}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
