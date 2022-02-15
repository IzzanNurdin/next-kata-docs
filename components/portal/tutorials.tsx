import { Box, Heading, theme, UnstyledAnchor } from '@aksara-ui/react';
import { Cards } from 'components/tutorials/components';
import { MarkdownContent } from 'interfaces/next';
import React from 'react';
import { HeaderSegment } from './components';
import { TutorialCard } from 'components/tutorials/TutorialCard';
import { Tutorials as ITutorials } from 'contentlayer/generated';

interface TutorialsProps {
  tutorials?: ITutorials[];
}

const Tutorials: React.FC<TutorialsProps> = ({ tutorials }) => {
  return (
    <Box>
      <HeaderSegment>
        <Heading scale={700} fontSize={24}>
          Tutorials
        </Heading>
        <UnstyledAnchor
          fontSize={16}
          href="/tutorials"
          cursor="pointer"
          color={theme.colors.blue07}
          _hover={{ textDecoration: 'underline', color: theme.colors.blue09, fontWeight: 500 }}
          fontWeight={500}
        >
          See all
        </UnstyledAnchor>
      </HeaderSegment>
      <Cards>
        {tutorials.map((tutorial, idx) => {
          return <TutorialCard key={tutorial.id} index={idx} tutorial={tutorial} />;
        })}
      </Cards>
    </Box>
  );
};

export default Tutorials;
