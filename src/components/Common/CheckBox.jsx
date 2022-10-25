import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";
import styled from "styled-components";

export default function CheckBox({ size, color, isChecked, setIsChecked }) {
  color = color ? color : "rgb(70, 70, 70)";

  return (
    <Container
      onClick={() => {
        setIsChecked(!isChecked);
      }}
    >
      {isChecked ? <BiCheckboxSquare color={color} size={size} /> : <BiCheckbox color={color} size={size} />}
    </Container>
  );
}

const Container = styled.div`
  & {
    display: flex;

    margin: 0px 10px;
  }
`;
