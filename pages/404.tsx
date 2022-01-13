import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { Page, NotFoundWrapper } from 'components/layout/Page';
import { Heading, Text } from 'components/foundations';
import styled from 'styled-components';

const NotFoundPage: React.FC = () => (
  <Page>
    <Head>
      <title>404: Page Not Found</title>
    </Head>
    <NotFoundWrapper>
      <Inner>
        <Heading as="h1" size={800} color="grey09" m={0}>
          404
        </Heading>
        <Text as="p" size={400} color="grey07">
          We can&apos;t find the page you&apos;re looking for.
        </Text>
        <Text as="p" size={400} color="grey07">
          <Link href="/">Go back?</Link>
        </Text>
      </Inner>
    </NotFoundWrapper>
  </Page>
);

export default NotFoundPage;

const Inner = styled('div')`
  text-align: center;
`;