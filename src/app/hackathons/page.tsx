import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { hackathonImages } from '@/data/gallery'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Hackathons',
  description: 'Photos from hackathons and coding events',
}

export default function HackathonsPage() {
  return (
    <section className="w-full flex justify-center items-center py-20 px-4 lg:px-0">
      <div className="max-w-4xl w-full">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-text-primary mb-2">
            Hackathons
          </h1>
          <p className="text-text-secondary">
            Moments from coding competitions and tech events
          </p>
        </div>

        {/* Gallery */}
        <GalleryGrid images={hackathonImages} />
      </div>
    </section>
  )
}
