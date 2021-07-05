import styled from "styled-components";
import { MEDIA_QUERY_SM } from "../constants/breakpoint";

export const Wrapper = styled.div`
  margin: 0px auto;
  min-height: calc(100vh - 206px); /*減去 footer + header */

  ${MEDIA_QUERY_SM} {
    min-height: calc(100vh - 216px);
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 30px;
  max-width: 960px;

  ${MEDIA_QUERY_SM} {
    padding: 20px 30px;
  }
`;

export const EmptyDataTitle = styled.p`
  font-size: 22px;
  color: #ccc;
  text-align: center;
`;

export const ResultPageTitleContainer = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-size: 22px;
  color: ${({ theme }) => theme.text.primary};

  svg {
    font-size: 22px;
  }

  ${MEDIA_QUERY_SM} {
    font-size: 20px;

    svg {
      font-size: 20px;
    }
  }
`;

export const ResultPageTitle = styled.span`
  margin: 0 5px;
  font-size: 22px;
  border-bottom: 1px dotted ${({ theme }) => theme.text.second};
`;
