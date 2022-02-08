import React from "react";
import "font-awesome/css/font-awesome.min.css";
import FontAwesome from "react-fontawesome";
import { faStar } from "@fortawesome/fontawesome-free-solid";
import "./Rating.css";
import StarIcon from "@mui/icons-material/Star";
import { shadows } from "@mui/system";

export default function Rating({ rating, count }) {
  return (
    <div>
      <span id="ratingSpan" className="fa-layers fa-fw">
        <StarIcon
          id="starIcon"
          style={{ color: "rgb(212, 169, 27)", fontSize: "70px" }}
          sx={{ boxShadow: 10 }}
        />
        <span id="rating" className="fa-layers-text fa-inverse">
          {rating}
        </span>
      </span>
    </div>
  );
}
