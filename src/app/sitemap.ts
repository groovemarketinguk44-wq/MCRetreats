import { MetadataRoute } from 'next'
import { getSettings } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const settings = getSettings()
  const base = (settings.siteUrl as string) || 'https://mcretreats.com'

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/experience`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/venue`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/apply`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
