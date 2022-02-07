import * as React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { space } from 'utils/variables';
import { theme, InputSearchbox as InputSearchboxAksara } from '@aksara-ui/react';
import InputText from '../InputText';

interface SearchPageProps {
  lng?: string;
  layout?: string;
  fuseSearch?: { fuse: any; name: string };
  onSearchClear?: () => void;
}

interface SearchPageState {
  query: string;
  results: any[];
  isInputFocused: boolean;
}

const ResultTitle = styled('h4')`
  margin-top: 0;
  margin-bottom: 0;
`;

const ResultExcerpt = styled('p')`
  font-family: 'SF Pro Text' !important;
  font-style: normal;
  font-weight: normal;
  color: ${theme.colors.greymed04};
  font-size: 10px;
  line-height: 16px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SearchResult = styled('div')`
  padding: 12px 8px;
  border-bottom: 1px solid ${theme.colors.grey02};
`;

const SearchResultLink = styled(Link)`
  color: inherit;

  ${SearchResult} {
    border-bottom: 1px solid ${theme.colors.grey02};
  }

  &:last-child {
    ${SearchResult} {
      border-bottom: none;
    }
  }

  &:hover,
  &:focus {
    text-decoration: none;
  }

  &:hover {
    ${ResultTitle} {
      text-decoration: underline;
    }

    ${SearchResult} {
      background-color: ${theme.colors.grey05};
    }
  }
`;

const SearchResultsDesktop = css`
  position: absolute;
  width: 100%;
  height: 400px;
  overflow-y: auto;
  z-index: 50;
  margin-top: 11px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  input:focus {
    width: 550px;
  }
`;

const SearchResultsMobile = css`
  position: absolute;
  right: 16px;
  width: calc(100vw - 32px);
  height: 315px;
  margin-top: 0;
  overflow-y: auto;
  z-index: 50;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const SearchResults = styled('div')<SearchPageProps>`
  padding: 0;
  border: 1px solid ${theme.colors.greylight05};
  background-color: ${theme.colors.white};

  ${(props) => props.layout === 'desktop' && SearchResultsDesktop}
  ${(props) => props.layout === 'mobile' && SearchResultsMobile}
`;

const SearchInputTextDesktop = css`
  input:focus {
    width: 550px;
  }
`;

const SearchInputText = styled(InputText)<SearchPageProps>`
  input {
    color: ${theme.colors.grey05};
    border-radius: 32px;
    border: 1px solid ${theme.colors.greylight05};
  }
  ::-webkit-input-placeholder {
    color: ${theme.colors.grey05};
  }
  ::placeholder {
    color: ${theme.colors.grey05};
    opacity: 1;
  }
  ${(props) => props.layout === 'desktop' && SearchInputTextDesktop}
`;

const RootDesktop = css`
  position: relative;

  &:not(:last-child) {
    margin-right: ${space.md}px;
  }
`;

const RootMobile = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;

  .header {
    display: flex;
    align-items: center;
    height: 63px;
    padding: 16px;
    background-color: ${theme.colors.white};

    > div {
      display: block;
      width: 100%;
      margin-right: 0;
    }
  }
`;

const Root = styled('div')<SearchPageProps>`
  ${(props) => props.layout === 'desktop' && RootDesktop}
  ${(props) => props.layout === 'mobile' && RootMobile}
`;

export default class SearchBox extends React.Component<SearchPageProps, SearchPageState> {
  static defaultProps = {
    lng: 'en',
    layout: 'default',
  };

  constructor(props: SearchPageProps) {
    super(props);

    this.state = {
      query: '',
      results: [],
      isInputFocused: false,
    };

    this.onEscKeypress = this.onEscKeypress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEscKeypress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscKeypress, false);
  }

  onEscKeypress(event: KeyboardEvent) {
    const { onSearchClear } = this.props;

    if (event.keyCode === 27) {
      if (onSearchClear) {
        onSearchClear();
      }
    }
  }

  getSearchResults(query?: string) {
    if (!query) {
      return [];
    }
    const {
      fuseSearch: { fuse },
    } = this.props;
    return fuse.search(query, { limit: 5 });
  }

  search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearchClear } = this.props;

    if (!event.target.value) {
      if (onSearchClear) {
        onSearchClear();
      }
    } else {
      const query = event.target.value;
      const results = this.getSearchResults(query);
      this.setState({ results, query });
    }
  };

  render() {
    const { layout, onSearchClear, fuseSearch } = this.props;
    const { query, results, isInputFocused } = this.state;
    const ref = React.createRef<HTMLInputElement>();

    return (
      <Root layout={layout}>
        <div className="header">
          <SearchInputText
            layout={layout}
            placeholder={layout === 'default' ? "Type what you're looking for..." : 'Search...'}
            value={query}
            onChange={this.search}
            ref={ref}
            onSearchClear={() => {
              // Don't even ask.
              if (ref.current) {
                ref.current.value = '';
              }
              this.setState({ results: [], query: '' });

              if (onSearchClear) {
                onSearchClear();
              }
            }}
            onBlur={() => this.setState({ isInputFocused: false })}
            onFocus={() => this.setState({ isInputFocused: true })}
          />
        </div>
        {isInputFocused && results && results.length !== 0 && (
          <SearchResults layout={layout}>
            {results.map(({ item: page }) => {
              return (
                <SearchResultLink href={page.absolutePath} key={page.title}>
                  <SearchResult>
                    <ResultTitle>{page.title}</ResultTitle>
                    {page.excerpt && <ResultExcerpt>{page.excerpt}</ResultExcerpt>}
                  </SearchResult>
                </SearchResultLink>
              );
            })}
          </SearchResults>
        )}
      </Root>
    );
  }
}
