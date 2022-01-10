import { Box, Heading, theme, Text } from '@aksara-ui/react'
import PortalHero from 'public/assets/images/portal-hero.svg'
import { PRODUCTS as productList } from 'utils/constants'
import { layerIndexes } from 'utils/variables'
import { Anchor, DocsCard, HeroWrapper } from './components'

export default function Portal() {
  return (
    <Box backgroundColor={theme.colors.blue07} mb={96} display="flex" paddingBottom={48}>
      <HeroWrapper>
        <PortalHero />
      </HeroWrapper>
      <Box display="flex" width="100%" flexDirection="column" alignItems="center" justifyContent="center" zIndex={layerIndexes.flat}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={48} color={theme.colors.white}>
          <Heading fontWeight={700} fontSize={36} color={theme.colors.white}>
            Kata Product Documentations 👋
          </Heading>
          <Text fontWeight={400} fontSize={16} mt={12}>
            Find the comprehensive document and tutorials for our products
          </Text>
        </Box>
        <Box display="flex" justifyContent="center" width="70%" flexDirection="row" mt={48} fontWeight={700} flexWrap="wrap">
          {productList.map((product, idx) => (
            <Anchor key={`${product.name}-${idx}`} href={product.extendedUrl} target={product.extendedUrl && "_blank"}>
              <DocsCard key={`${idx}-${product.name}`} >
                <Box display="flex" alignItems="center">
                  <img src={product.imgPath} /> {product.name}
                </Box>
              </DocsCard>
            </Anchor>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
