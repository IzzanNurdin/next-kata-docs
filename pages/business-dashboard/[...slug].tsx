import React from 'react';
import Head from 'next/head';
import { getMdxNode, getMdxPaths } from 'next-mdx/server';
import { Text } from '@aksara-ui/react';

import { Page } from 'components/layout/Page';
import { DocsWrapper } from 'components/docs/DocsWrapper';
import { DocsHeader } from 'components/docs/DocsHeader';

import { FooterWrapper, Footer } from 'components/layout/Footer';
import { TocJsonWrapper } from 'components/docs/TableOfContents';
import remarkSlug from 'remark-slug';
import rehypeAutolinkHeadings from 'remark-autolink-headings';
import { BackToTopButton } from 'components/docs/BackToTopButton';
import { DocsHelpful } from 'components/docs/DocsHelpful';
import { useRouter } from 'next/router';
import { MarkdownContent } from 'components/page/Markdown';
import renderAst from 'utils/renderAst';
import { DocsContainer } from 'components/layout/Container';
import IndexLayout from 'components/layouts';
import Breadcrumb from 'components/breadcrumb/breadcrumb';
import { GetStaticPropsContext, PreviewData } from 'next';

interface TutorialPageTemplateProps {
  post: any;
  toc: any;
  listToc: string[];
}

const TutorialPageTemplate: React.FC<TutorialPageTemplateProps> = ({ post, toc }) => {
  const frontMatter = post.frontMatter;

  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    router.push('/404');
  }

  const onTocSidebarClick = React.useCallback((e: any, url: string) => {
    e.preventDefault();
    router.push(url);
  }, []);

  const isActiveItem = React.useCallback(
    (url: string): boolean => {
      return url === router.asPath;
    },
    [router]
  );

  return (
    <Page docsPage>
      <Head>
        <title>{frontMatter.title} &middot; business-dashboard Documentation</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={post.excerpt} />
      </Head>
      <IndexLayout navHidden>
        {router.isFallback ? (
          <Text>Loading…</Text>
        ) : (
          <DocsWrapper>
            {toc && (
              <div className="table-of-contents">
                <TocJsonWrapper tree={toc} onClick={onTocSidebarClick} isActiveItem={isActiveItem} />
              </div>
            )}
            <DocsContainer>
              <Breadcrumb
                items={[
                  { url: '/', urlDisplay: 'Home' },
                  { url: '/business-dashboard', urlDisplay: 'Business Dashboard' },
                  { url: '#', urlDisplay: frontMatter.title },
                ]}
              />
              <DocsHeader title={frontMatter.title} />
              <MarkdownContent>{renderAst(post.mdx.renderedOutput)}</MarkdownContent>
              <DocsHelpful />
              <FooterWrapper>
                <Footer version={'v3.1.1'} siteLastUpdated={'23 December 2021'} />
              </FooterWrapper>
            </DocsContainer>
            <BackToTopButton href="#" />
          </DocsWrapper>
        )}
      </IndexLayout>
    </Page>
  );
};

export default TutorialPageTemplate;

function getTocItems(toc: any, array: string[] = []) {
  const arrTmp: string[] = array;

  toc.items?.map((tocItem) => {
    arrTmp.push(tocItem.url.split('#')[1]);
    tocItem.items ? arrTmp.concat(getTocItems(tocItem, arrTmp)) : null;
  });

  return arrTmp;
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths('businessDashboard'),
    fallback: false,
  };
}

export async function getStaticProps(context: string | GetStaticPropsContext<NodeJS.Dict<string[]>, PreviewData>) {
  const post = await getMdxNode('businessDashboard', context, {
    mdxOptions: {
      remarkPlugins: [remarkSlug, rehypeAutolinkHeadings],
    },
  });

  const toc = await import('docs/toc-business-dashboard.json');

  if (!toc) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      toc: toc.default,
    },
  };
}
