import React from "react";
import styled from "styled-components";
import { COLOR } from "../../theme";

const NavbarContainer = styled.div`
  position: fixed;
  padding: 10px;
  width: 100%;
  background-color: ${COLOR.white};
  border-bottom: 1px solid ${COLOR.grey};
  z-index: 99;
`;
const Logo = styled.div`
  font-weight: bold;
  font-size: 2rem;
`;

const NavContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfilePic = styled.img`
  height: 3rem;
  border-radius: 50%;
`;
const Padder = styled.div`
  height: 51px;
`;
export default (props) => (
  <>
    <NavbarContainer>
      <div class="container">
        <NavContentContainer>
          <Logo>เลิร์นเอเบิล</Logo>
          <div>
            <div class="d-flex">
              <ProfilePic src="https://scontent.fbkk24-1.fna.fbcdn.net/v/t1.0-9/79516734_1157819611090481_4370206700595052544_n.jpg?_nc_cat=104&_nc_sid=174925&_nc_eui2=AeH5mIgcnoTg_xLhM-_YMzm7N3Jcgo9GXcU3clyCj0ZdxQQumI1WNTyK7zQaFe4F9IhuyZR45QsARatYlUyU-cui&_nc_ohc=aKCkJaVjlAUAX9uLLUI&_nc_ht=scontent.fbkk24-1.fna&oh=d6409cf34ae576b16501cf3a3218785e&oe=5ECDD2FB" />
            </div>
          </div>
        </NavContentContainer>
      </div>
    </NavbarContainer>
    <Padder></Padder>
  </>
);
