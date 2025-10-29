import { Helmet } from 'react-helmet-async';

import { SeoMetaProps } from '../types';

const defaultTitle = 'FusionHub - Your Source for Tech Blogs';
const defaultDescription =
  'FusionHub is your go-to platform for the latest tech blogs, tutorials, and industry insights.';
const defaultImage = 'https://fuzionhub.netlify.app/og-image.jpg';
const defaultUrl = 'https://fuzionhub.netlify.app/';

const SeoMeta = ({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultImage,
  url = defaultUrl,
  keywords,
  schema,
}: SeoMetaProps) => {
  const structuredData = schema
    ? JSON.stringify(schema)
    : JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'fusionHub',
        url: defaultUrl,
        description: defaultDescription,
        applicationCategory: 'BloggingApplication',
        operatingSystem: 'All',
        image: defaultImage,
        publisher: {
          '@type': 'Organization',
          name: 'fusionHub Inc.',
          logo: 'https://yourapp.com/assets/logo.png',
        },
      });

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      {keywords && <meta name='keywords' content={keywords} />}
      <meta name='robots' content='index, follow' />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content='website' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      <script type='application/ld+json'>{structuredData}</script>
    </Helmet>
  );
};

export default SeoMeta;
