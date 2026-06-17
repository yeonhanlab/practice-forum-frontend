import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: ${props => props.theme.colors.background.paper};
    border-top: 1px solid ${props => props.theme.colors.divider};
`;

function MainFooter() {
    return <FooterContainer></FooterContainer>;
}

export default MainFooter;
