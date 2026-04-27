import { MetadataRoute } from 'next'
import { getSettings } from '@/lib/content'

export default function robots(): MetadataRoute.Robots {
  const settings = getSettings()
  const base = (settings.siteUrl as string) || 'https://mcretreats.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/success'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
