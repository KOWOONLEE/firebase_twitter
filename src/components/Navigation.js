import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../color";
import { FiTwitter, FiUser } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";

const Navigation = ({ userObj }) => {
  return (
    <StyledNavigation>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FiTwitter />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FiUser />
              <div>{userObj.displayName}의 Profile</div>
            </Link>
          </li>
        </ul>
      </nav>
    </StyledNavigation>
  );
};
export default Navigation;

const StyledNavigation = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${theme.bg};

  ul {
    display: flex;
    list-style: none;

    li {
      width: 6vw;
      text-align: center;

      a {
        text-decoration: none;
      }
      svg {
        width: 4vw;
        height: 4vh;
        fill: ${theme.red};
      }
      div {
        color: black;
        font-size: 15px;
        text-align: center;
      }
    }
  }
`;
