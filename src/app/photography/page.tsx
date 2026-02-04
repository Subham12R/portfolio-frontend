import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { photographyImages } from '@/data/gallery'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Photography',
  description: 'Personal photography collection',
}

export default function PhotographyPage() {
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
            Photography
          </h1>
          <p className="text-text-secondary">
            Capturing moments through the lens
          </p>
        </div>

        {/* Gallery */}
        <GalleryGrid images={photographyImages} />
      </div>
    </section>
  )
}
