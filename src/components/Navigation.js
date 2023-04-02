import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../color";
import { FiTwitter, FiUser } from "react-icons/fi";

const Navigation = ({ userObj }) => {
  return (
    <StyledNavigation>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FiTwitter />
              <div>Home</div>
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
  justify-content: center;
  align-items: center;
  background-color: ${theme.bg};
  padding-top: 5vh;

  ul {
    display: flex;
    list-style: none;
    padding: 0;

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

      svg:hover {
        fill: ${theme.pink};
      }
      div {
        color: black;
        font-size: 15px;
        text-align: center;
        font-weight: 600;
      }
    }
  }
`;
