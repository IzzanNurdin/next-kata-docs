import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Text, Heading } from 'components/foundations';
import { space, breakpoints, colors } from 'utils/variables';
import { MenuNode } from 'interfaces/nodes';
import { Box } from '@aksara-ui/react';

const Wrapper = styled('aside')`
  margin-top: ${space.xl}px;
  margin-bottom: ${space.xl}px;
  border-collapse: collapse;
  border-radius: 4px;
`;

const WrapperInner = styled('div')`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PaginationButton = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: ${colors.grey02};

  svg {
    g {
      fill: ${colors.grey07};
    }
  }

  &:first-child {
    margin-top: 16px;
    margin-right: 24px;
  }

  &:last-child {
    margin-top: 16px;
    margin-left: 24px;
  }
`;

const PaginationTitle = styled(Heading)`
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const PaginationHeading = styled(Text)``;

const PaginationLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  &:hover {
    ${PaginationButton} {
      background-color: ${colors.grey03};

      svg {
        g {
          fill: ${colors.grey07};
        }
      }
    }

    ${PaginationTitle} {
      color: ${colors.blue06};
    }
  }

  &:focus {
    ${PaginationButton} {
      background-color: ${colors.blue07};

      svg {
        g {
          fill: ${colors.white};
        }
      }
    }

    ${PaginationTitle} {
      color: ${colors.grey07};
    }
  }
`;

const PaginationItem = styled('div')`
  display: flex;
  position: relative;
  flex: 1 0 auto;
  align-items: center;
  padding: 0 ${space.md}px;
  overflow: hidden;
  background-color: ${colors.grey01};
  border-radius: 4px;
  padding: 24px;

  &:first-child {
    justify-content: flex-start;
    text-align: left;
  }

  &:last-child {
    margin-top: ${space.md}px;
    justify-content: flex-end;
    text-align: right;
  }

  @media (min-width: ${breakpoints.md}px) {
    flex: 1 0 50%;

    &:not(:first-child) {
      border-left: none;
    }

    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
    }

    &:last-child {
      margin-top: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: none;
    }
  }
`;

const PaginationBlock = styled('div')``;

interface PaginationProps {
  prevPage?: MenuNode;
  nextPage?: MenuNode;
}

const Pagination: React.FC<PaginationProps> = ({ prevPage, nextPage }) => (
  <Wrapper>
    <WrapperInner>
      {prevPage && (
        <PaginationItem>
          <PaginationLink href={prevPage.url}>
            <Box display="flex" cursor={'pointer'}>
              <PaginationButton>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <defs>
                    <path
                      id="ic-chevron-left"
                      d="M.238 8.565l7.329 7.187a.837.837 0 0 0 1.164 0 .795.795 0 0 0 0-1.14L1.984 7.994l6.747-6.617a.796.796 0 0 0 0-1.141.837.837 0 0 0-1.165 0L.237 7.423a.804.804 0 0 0 .001 1.142z"
                    />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(8 4)">
                    <mask id="ic-chevron-left-mask" fill="#fff">
                      <use xlinkHref="#ic-chevron-left" />
                    </mask>
                    <use fill="none" fillRule="nonzero" xlinkHref="#ic-chevron-left" />
                    <g fill="none" mask="url(#ic-chevron-left-mask)">
                      <path d="M-8-4h24v24H-8z" />
                    </g>
                  </g>
                </svg>
              </PaginationButton>
              <PaginationBlock>
                <PaginationHeading size={200} color="grey04" display="block">
                  Previous
                </PaginationHeading>
                <PaginationTitle size={400}>{prevPage.title}</PaginationTitle>
              </PaginationBlock>
            </Box>
          </PaginationLink>
        </PaginationItem>
      )}

      {nextPage && (
        <PaginationItem>
          <PaginationLink href={nextPage.url}>
            <Box display="flex" cursor={'pointer'}>
              <PaginationBlock>
                <PaginationHeading size={200} color="grey04" display="block">
                  Next
                </PaginationHeading>
                <PaginationTitle size={400}>{nextPage.title}</PaginationTitle>
              </PaginationBlock>
              <PaginationButton>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <defs>
                    <path
                      id="ic-chevron-right"
                      d="M8.742 7.423L1.414.236a.837.837 0 0 0-1.165 0 .795.795 0 0 0 0 1.14l6.747 6.618L.25 14.61a.796.796 0 0 0 0 1.141.837.837 0 0 0 1.165 0l7.328-7.187a.803.803 0 0 0 0-1.142z"
                    />
                  </defs>
                  <g fill="none" fillRule="evenodd" transform="translate(8 4)">
                    <mask id="ic-chevron-right-mask" fill="#fff">
                      <use xlinkHref="#ic-chevron-right" />
                    </mask>
                    <use fill="none" fillRule="nonzero" xlinkHref="#ic-chevron-right" />
                    <g fill="none" mask="url(#ic-chevron-right-mask)">
                      <path d="M-8-4h24v24H-8z" />
                    </g>
                  </g>
                </svg>
              </PaginationButton>
            </Box>
          </PaginationLink>
        </PaginationItem>
      )}
    </WrapperInner>
  </Wrapper>
);

export default Pagination;
