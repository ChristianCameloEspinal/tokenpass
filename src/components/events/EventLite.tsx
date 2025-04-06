import React from "react";
import * as Styled from "../style/style";
import { EventType } from "../../utils/types";
import { useNavigate } from "react-router-dom";

type EventFullProps = {
  data: EventType;
};

export default function EventLite({ data }: EventFullProps) {

  const navigate = useNavigate();

  const {
    id,
    eventName,
    eventDate,
    location,
    type,
    lastPrice,
    currentPrice,
    eventDescription,
  } = data;

  const handleClick = () => {
    navigate(`/event/${id}`);
  }

  return (
    <Styled.EventFrame onClick={handleClick}>
      <Styled.FrameHorizontalPadd>
        <Styled.FrameVertical>
          <Styled.TextHint>{eventDate}</Styled.TextHint>
          <Styled.TextSubtitle>{eventName}</Styled.TextSubtitle>
          <Styled.TextLink>{location}</Styled.TextLink>
        </Styled.FrameVertical>
        <Styled.FrameVertical style={{ textAlign: "right" }}>
          <Styled.TextHint>{type}</Styled.TextHint>
          <Styled.TextHint>Last price ${lastPrice.toFixed(2)}</Styled.TextHint>
          <Styled.TextSubtitle>${currentPrice.toFixed(2)}</Styled.TextSubtitle>
        </Styled.FrameVertical>
      </Styled.FrameHorizontalPadd>
    </Styled.EventFrame>
  );
}
