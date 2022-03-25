import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 120,
  // maxWidth: 120,
  margin: 2,
  minHeight: 150,
  backgroundColor: "none",
  padding: 0
}));

const StyledCastName = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "0.75rem",
  marginTop: 2
  // marginBottom: 0,
}));

const StyledCastCharacter = styled(Typography)(({ theme }) => ({
  fontSize: "0.80rem"
}));
export default function Cast({ castMember }) {
  let imagePath = castMember?.profile_path
    ? `https://image.tmdb.org/t/p/original/${castMember.profile_path}`
    : "https://drpp-ny.org/dev/wp-content/uploads/2014/07/sorry-image-not-available.png";
  return (
    <StyledCard>
      <CardMedia
        component="img"
        alt={`image of ${castMember.name}`}
        height="120"
        width="90"
        src={`${imagePath}`}
      />
      <CardContent
        sx={{
          textAlign: "center",
          margin: 0,
          padding: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <StyledCastName variant="h5" component="div">
          {castMember.name}
        </StyledCastName>
        <StyledCastCharacter
          variant="body2"
          color="text.secondary"
          component="div"
        >
          {castMember.character}
        </StyledCastCharacter>
      </CardContent>
    </StyledCard>
  );
}
