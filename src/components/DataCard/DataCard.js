import React, { useState, useEffect } from "react";
import Rating from "../Rating/Rating";
import { Modal, Typography, Box } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "../../AnimatedProgressProvider";
import ChangingProgressProvider from "../../ChangingProgressProvider";
import Cast from "../Cast/Cast.js";

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
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  outline: 0,
  width: "100%",
  height: "30%",
  margin: "auto 0",
  backgroundColor: "black",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",

  "& Box": {
    outline: 0
  },

  "@media (min-width: 768px)": {
    height: "35%"
  },
  "@media (min-width: 1400px)": {
    height: "40%"
  }
});
const StyledOverlay = styled(Box)({
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
});

const StyledContentBox = styled(Box)({
  width: "90%",
  height: "90%",
  backgroundColor: "rgb(0,0,0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  outline: 0,
  borderRadius: "0.5rem",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

  "@media (min-width: 768px)": {
    width: "85%",
    height: "100%",
    borderRadius: 0,
    justifyContent: "flex-start"
  },
  "@media (min-width: 1400px)": {
    width: "70%"
  }
});

const StyledImgAndRatingBox = styled(Box)({
  height: "100%",
  width: "35%",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  backgroundColor: "red",
  position: "relative",

  "@media (min-width: 600px)": {
    width: "31%"
  },

  "@media (min-width: 768px)": {
    width: "35%"
  },
  "@media (min-width: 1100px)": {
    width: "30%"
  },
  "@media (min-width: 1500px)": {
    width: "26%"
  },
  "@media (min-width: 2500px)": {
    width: "20%"
  }
});
const StyledPosterImage = styled("img")({
  height: "100%",
  width: "100%",
  position: "absolute",
  zIndex: 1
});
const StyledProgressBox = styled(Box)({
  height: "40px",
  width: "40px",
  position: "absolute",
  zIndex: 2,
  right: 5,
  top: 5,

  "@media (min-width: 768px)": {
    height: "50px",
    width: "50px"
  },
  "@media (min-width: 1100px)": {
    height: "60px",
    width: "60px"
  }
});

const StyledDetailsContainer = styled(Box)({
  width: "50%",
  height: "100%",
  color: "FFF",
  paddingLeft: "0.5rem",
  overflow: "auto",
  overflowX: "hidden",
  // overflowY: "hidden",
  "::-webkit-scrollbar": {
    width: 0,
    background: "transparent"
  },
  "@media (min-width: 600px)": {
    width: "45%"
  },

  "@media (min-width: 768px)": {
    width: "65%"
  },
  "@media (min-width: 1100px)": {
    width: "60%"
  },
  "@media (min-width: 1500px)": {
    width: "74%"
  }
});

const StyledTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.25rem",
  "@media (min-width: 768px)": {
    fontSize: "1.5rem"
  },
  "@media (min-width: 1400px)": {}
});

const StyledGenresLength = styled(Typography)({
  color: "FFF",
  fontSize: "0.90rem",
  opacity: "70%",

  "@media (min-width: 768px)": {
    fontSize: "0.99rem"
  },
  "@media (min-width: 1400px)": {}
});

const StyledTagline = styled(Typography)({
  fontStyle: "italic",
  marginTop: "1rem",
  color: "#e52a6f",
  fontWeight: "bold",

  "@media (min-width: 768px)": {
    fontSize: "1.2rem"
  },
  "@media (min-width: 1400px)": {}
});

const StyledOverviewHeader = styled(Typography)({
  fontWeight: "bold",
  color: "#FFF",
  marginTop: "1rem",
  "@media (min-width: 768px)": {
    fontSize: "1.2rem"
  },
  "@media (min-width: 1400px)": {}
});
const StyledOverview = styled(Typography)({
  fontSize: "1rem",
  opacity: "70%",

  "@media (min-width: 600px)": {
    fontSize: "1.15rem"
  },

  "@media (min-width: 768px)": {
    fontSize: "1.20rem"
  }
});

const StyledCastList = styled(Box)({
  display: "flex",
  overflow: "scroll",
  overflowY: "hidden",
  marginRight: "1rem",
  "::-webkit-scrollbar": {
    width: 100,
    background: ""
  }
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
  const [seasonsInfo, setSeasonsInfo] = useState();
  const [cast, setCast] = useState();

  // const classes = useStyles();

  // const getMovieDetails = () => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}&language=en-US`
  //     )
  //     .then((dataResponse) => {
  //       let { data } = dataResponse;
  //       setitemDetails(data);
  //       setGenres(data.genres);
  //       setRuntime(data.runtime);
  //     })
  //     .then(console.log(itemDetails));
  // };

  const getMovieDetails = () => {
    let endpoints = [
      `https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}&language=en-US`,
      `https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${apiKey}&language=en-US`
    ];

    Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread((...allData) => {
        let details = allData[0].data;
        let { cast } = allData[1].data;
        console.log(details);
        console.log(cast);
        setitemDetails(details);
        setGenres(details?.genres);
        setRuntime(details?.runtime);
        setCast(cast);
      })
    );
    // axios
    //   .get(

    //   )
    //   .then((dataResponse) => {
    //     let { data } = dataResponse;
    //     setitemDetails(data);
    //     setGenres(data.genres);
    //     setRuntime(data.runtime);
    //   })
    //   .then(console.log(itemDetails));
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

  // const getTVDetails = () => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/tv/${item.id}?api_key=${apiKey}&language=en-US`
  //     )
  //     .then((dataResponse) => {
  //       let { data } = dataResponse;
  //       setitemDetails(data);
  //       setGenres(data.genres);
  //       setRuntime(data.runtime);
  //       if (data.hasOwnProperty("number_of_seasons")) {
  //         setSeasonsInfo({
  //           seasons: data.number_of_seasons,
  //           episodes: data.number_of_episodes
  //         });
  //       }
  //     })
  //     .then(console.log(itemDetails));
  // };

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

  let overview = item.overview?.toString().replace(/&amp;/g, "&");

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
    ? cast.map((castMember) => {
        return (
          <Cast key={item.id} castMember={castMember}>
            {" "}
          </Cast>
        );
      })
    : [];

  let releaseYear = new Date(item.release_date).getFullYear();
  let percentage = item.vote_average * 10;
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
              <StyledProgressBox>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                  background
                  styles={buildStyles({
                    backgroundColor: "rgb(0,0,0,0.5)",
                    textSize: "2rem",
                    textColor: "#FFF",
                    pathColor: "#e52a6f ",
                    trailColor: " #5f0f4e"
                  })}
                />
              </StyledProgressBox>
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
              <StyledOverviewHeader>Overview:</StyledOverviewHeader>
              <StyledOverview sx={{ color: "#FFF" }}>{overview}</StyledOverview>
              <StyledCastList id="castList">{castList}</StyledCastList>
            </StyledDetailsContainer>
          </StyledContentBox>
        </StyledOverlay>
      </StyledModal>
    </div>
  );
}

// const StyledCard = styled(Box)({
//   display: "flex",
//   flexDirection: "column",
//   margin: "20px",
//   borderRadius: "20px",
//   width: "280px",
//   height: "425px",
//   fontSize: "1rem",

//   "@media (min-width: 500px)": {
//     width: "200px",
//     height: "350px"
//   },

//   "& .wrapper": {
//     width: "100%"
//   },

//   "& .poster-image": {
//     width: "100%",
//     height: "400px",
//     borderRadius: "5px",
//     boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",

//     "@media (min-width: 500px)": {
//       width: "100%",
//       height: "300px"
//     }
//   },

//   "& .item-info-container": {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "right",
//     fontSize: "0.75rem",
//     color: "black",
//     textAlign: "left",
//     paddingRight: "10px"
//   },

//   "& .title": {
//     fontWeight: "bold",
//     textAlign: "right",
//     minWidth: 0
//   },
//   "& .release-date": {
//     textAlign: "right"
//   }
// });
// const StyledModal = styled(Modal)({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   flexDirection: "column",
//   outline: 0,

//   "& Box": {
//     outline: 0
//   }
// });

// const StyledTopBox = styled(Box)({
//   backgroundColor: "green",
//   height: "35%"
// });
// const StyledOuterBox = styled(Box)({
//   backgroundColor: "#FAF3F3",
//   height: "50%",
//   width: "80%",
//   // padding: "1rem",
//   position: "relative",
//   zIndex: 1,

//   "@media (min-width: 1400px)": {
//     width: "40%"
//   }
// });

// const StyledBackdropBox = styled(Box)({
//   position: "absolute",
//   zIndex: 2,
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "35%",
//   backgroundPosition: "50% 50%",
//   backgroundSize: "100%",
//   backgroundRepeat: "no-repeat"
// });

// const StyledTextOverlayBox = styled(Box)({
//   position: "absolute",
//   zIndex: 3,
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "35%",
//   backgroundColor: "rgb(0, 0, 0, 0.5)"
// });

// const StyledBottomBox = styled(Box)({
//   height: "65%",
//   width: "100%"
//   // padding: "0.5rem"
// });

// const StyledOverlayText = styled(Typography)({
//   position: "absolute",
//   color: "#FFF",
//   fontSize: "1.15rem",
//   top: "80%",
//   left: "10px",
//   "@media (min-width: 700px": {
//     fontSize: "1.75rem",
//     top: "75%"
//   },
//   "@media (min-width: 1200px)": {
//     fontSize: "1.75rem",
//     top: "75%"
//   }
// });

// const StyledGenres = styled(Typography)({});

// export default function DataCard({ item }) {
//   let apiKey = "96cf33fdedaec4865a18d38e84e62ffc";
//   let posterPath = item.poster_path
//     ? `https://image.tmdb.org/t/p/original/${item.poster_path}`
//     : "https://drpp-ny.org/dev/wp-content/uploads/2014/07/sorry-image-not-available.png";
//   let backdropPath = item.backdrop_path
//     ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
//     : "none";

//   const [open, setOpen] = useState(false);
//   const [itemDetails, setitemDetails] = useState();
//   const [genres, setGenres] = useState();
//   const [runtime, setRuntime] = useState();
//   // const classes = useStyles();

//   const getMovieDetails = () => {
//     axios
//       .get(
//         `https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}&language=en-US`
//       )
//       .then((dataResponse) => {
//         let { data } = dataResponse;
//         setitemDetails(data);
//         setGenres(data.genres);
//         setRuntime(data.runtime);
//         setTimeout(() => {
//           console.log(itemDetails);
//         }, 2000);
//       });
//   };

//   const getTVDetails = () => {
//     axios
//       .get(
//         `https://api.themoviedb.org/3/tv/${item.id}?api_key=${apiKey}&language=en-US`
//       )
//       .then((dataResponse) => {
//         let { data } = dataResponse;
//         setitemDetails(data);
//         setGenres(data.genres);
//         setRuntime(data.runtime);
//         setTimeout(() => {
//           console.log(itemDetails);
//         }, 1000);
//       });
//   };
//   const handleOpen = () => {
//     if (item.media_type === "movie") {
//       getMovieDetails();
//     } else if (item.media_type === "tv") {
//       getTVDetails();
//     }
//     setTimeout(() => {
//       setOpen(true);
//     }, 1000);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   let overview = item.overview.toString().replace(/&amp;/g, "&");

//   const timeConvert = () => {
//     let num = runtime;
//     let hours = num / 60;
//     let rhours = Math.floor(hours);
//     let minutes = (hours - rhours) * 60;
//     let rminutes = Math.round(minutes);
//     return runtime ? `${rhours}h ${rminutes}m` : "";
//   };
//   let genresList = genres
//     ? genres.map((item, index) => {
//         if (genres.length != index + 1) {
//           return item.name + " • ";
//         } else return item.name + " • " + timeConvert();
//       })
//     : [];

//   let releaseYear = new Date(item.release_date).getFullYear();

//   return (
//     <div>
//       <StyledCard id="cardContentMainContainer" onClick={handleOpen}>
//         <div className="wrapper">
//           <img
//             className="poster-image"
//             id="posterImage"
//             src={posterPath}
//             alt="poster"
//           />
//         </div>
//         <div className="item-info-container" id="itemInfoContainer">
//           <span className="title" id="title">
//             {item.original_title ? item.original_title : item.name}
//           </span>
//           {item.release_date ? (
//             <span className="release-date">
//               {item.release_date ? item.release_date : "N/A"}
//             </span>
//           ) : (
//             <span className="release-date">
//               {item.first_air_date ? item.first_air_date : "N/A"}
//             </span>
//           )}
//         </div>
//       </StyledCard>

//       <StyledModal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <StyledOuterBox>
//           <StyledTopBox>
//             <StyledBackdropBox sx={{ backgroundImage: `url(${backdropPath})` }}>
//               {/* <StyledImage src={backdropPath} /> */}
//             </StyledBackdropBox>

//             <StyledTextOverlayBox>
//               <StyledOverlayText
//                 // className={classes.overlayText}
//                 id="modal-modal-title"
//                 variant="h6"
//                 component="h2"
//               >
//                 {item.original_title ? item.original_title : item.name}{" "}
//                 {releaseYear ? `(${releaseYear})` : ""}
//               </StyledOverlayText>
//             </StyledTextOverlayBox>
//           </StyledTopBox>
//           <StyledBottomBox>
//             <StyledGenres>{genresList}</StyledGenres>
//             <Typography>Tagline</Typography>
//             <Typography
//               className="tagline"
//               id="modal-modal-description"
//               sx={{ mt: 2 }}
//             >
//               {overview}
//             </Typography>
//             <Typography className="overview"></Typography>
//           </StyledBottomBox>
//         </StyledOuterBox>
//       </StyledModal>
//     </div>
//   );
// }
