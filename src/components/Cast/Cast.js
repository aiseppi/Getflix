import React from "react";
import { Typography, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { styled } from "@mui/styles";

const StyledCard = styled(Card)({
  minWidth: 120,
  margin: 2,
  maxHeight: 200,
  backgroundColor: "none"
});

const StyledCastName = styled(Typography)({
  fontWeight: "bold"
});

const StyledCastCharacter = styled(Typography)({});
export default function Cast({ castMember }) {
  let imagePath = castMember?.profile_path
    ? `https://image.tmdb.org/t/p/original/${castMember.profile_path}`
    : "https://drpp-ny.org/dev/wp-content/uploads/2014/07/sorry-image-not-available.png";
  console.log(imagePath);
  return (
    <StyledCard>
      <CardMedia
        component="img"
        alt={`image of ${castMember.name}`}
        height="140"
        width="90"
        src={`${imagePath}`}
      />
      <CardContent sx={{ textAlign: "center", margin: 0, padding: 0.5 }}>
        <StyledCastName gutterBottom variant="h5" component="div">
          {castMember.name}
        </StyledCastName>
        <StyledCastCharacter variant="body2" color="text.secondary">
          {castMember.character}
        </StyledCastCharacter>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </StyledCard>
  );
}
