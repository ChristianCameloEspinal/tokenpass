import styled from 'styled-components';
import './style.css'

export const Page = styled.div.attrs({
  className: "page"
})``;

export const Wrapper = styled.div.attrs({
  className: "wrapper padding xl all"
})``;

export const Title = styled.h1.attrs({
  className: "text-display"
})``;

export const FrameFloating = styled.div.attrs({
  className: "frame-flex vertical padding l all border shadow"
})``;

export const FrameHorizontal = styled.div.attrs({
  className:"frame-flex horizontal gap-m space-between"
})``;

export const FrameHorizontalPadd = styled.div.attrs({
  className:"frame-flex horizontal gap-m padding m all space-between"
})``;

export const FrameVertical = styled.div.attrs({
  className:"frame-flex vertical gap-s"
})``;

export const FrameVerticalFixed = styled.div.attrs({
  className:"frame-flex vertical gap-s"
})`
  position:sticky;
`;

export const FrameVerticalMain = styled.div.attrs({
  className:"frame-flex vertical gap-l"
})``;

export const TextSubtitle = styled.span.attrs({
  className: "text-subtitle"
})``;

export const TextHint = styled.span.attrs({
  className: "text-hint"
})``;

export const TextBody = styled.span.attrs({
  className: "text-body"
})``;

export const Form = styled.form.attrs({
  className : "frame-flex vertical gap-l"
})``;

export const InputBox = styled.div.attrs({
  className : "frame-flex vertical gap-s"
})``;

export const InputField = styled.div.attrs({
  className: "input-field border"
})``;

export const Input = styled.div.attrs({
  className : "frame-flex input padding s all"
})``;

export const Button = styled.button.attrs({
  className: "button primary"
})``;

export const ButtonSmall = styled.button.attrs({
  className: "button primary"
})`
  width:fit-content;
`;


export const ButtonAlternate = styled.button.attrs({
  className: "button secondary"
})``;

export const EventFrame = styled.div.attrs({
  className: "frame-flex vertical border shadow"
})``;

export const TextLink = styled.span.attrs({
  className: "text-link"
})``;

export const EventPhoto = styled.img.attrs({
  className: "event-photo border border-simple shadow"
})``;

export const QuantityInput = styled.div.attrs({
  className: "frame-flex input padding s all"
})``;

export const Separator = styled.div`
  width: 100%;
  border: 1px solid var(--color-muted-light);
  `;