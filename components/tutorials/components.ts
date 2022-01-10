import { Card as CardAksara, theme, UnstyledAnchor } from '@aksara-ui/react'
import styled from 'styled-components'

export const Cards = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 32px;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    iframe {
      width: 100% !important;
      height: 300px !important;
      margin-top: 24px;
    }
  }

  @media only screen and (max-width: 1440px) {
    iframe {
      width: 400px;
      height: 250px;
    }
  }

  @media only screen and (min-width: 1920px) {
    iframe {
      width: 550px;
      height: 300px;
    }
  }
`

export const ProductBadge = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 12px;
  height: 32px;
  border-radius: 8px;
  width: fit-content;
  align-items: center;
  border: 1px solid ${theme.colors.grey03};
  padding: 12px 8px;
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`
export const Anchor = styled(UnstyledAnchor)`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: ${theme.colors.blue06};
  cursor: pointer;
  :hover {
    color: ${theme.colors.blue08};
    text-decoration: underline;
  }
  svg {
    margin-left: 8px;
  }
  path {
    :hover {
      fill: ${theme.colors.blue08};
    }
    fill: ${theme.colors.blue06};
  }
`

export const Card = styled(CardAksara)`
  border-radius: 8px;
  border: 1px solid ${theme.colors.grey03};
  cursor: default;
  @media only screen and (max-width: 1024px) {
    max-width: 100% !important;
  }
  @media only screen and (min-width: 1440px) {
    max-width: 355px;
  }
  margin-top: 12px;
`
