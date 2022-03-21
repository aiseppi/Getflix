import React from "react";
import { styled } from "@mui/system";

const StyledHeaderImg = styled("img")({
  width: "100%"
});

export default function PageHeader() {
  return (
    <div>
      <StyledHeaderImg src="./media/logo/logomain.png" />
    </div>
  );
}
