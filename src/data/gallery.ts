// Gallery data for hackathons and photography

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

// Hackathon gallery images
export const hackathonImages: GalleryImage[] = [
  {
    id: "hack-1",
    src: "/images/hackathons/1.jpg",
    alt: "Hackathon 1",
    caption: "Team collaboration",
  },
  {
    id: "hack-2",
    src: "/images/hackathons/2.jpg",
    alt: "Hackathon 2",
    caption: "Presenting our project",
  },
  {
    id: "hack-3",
    src: "/images/hackathons/3.jpg",
    alt: "Hackathon 3",
    caption: "Late night coding",
  },
  {
    id: "hack-4",
    src: "/images/hackathons/4.jpg",
    alt: "Hackathon 4",
    caption: "Award ceremony",
  },
]

// Photography gallery images
export const photographyImages: GalleryImage[] = [
  {
    id: "photo-1",
    src: "/images/photography/1.jpg",
    alt: "Photography 1",
  },
  {
    id: "photo-2",
    src: "/images/photography/2.jpg",
    alt: "Photography 2",
  },
  {
    id: "photo-3",
    src: "/images/photography/3.jpg",
    alt: "Photography 3",
  },
  {
    id: "photo-4",
    src: "/images/photography/4.jpg",
    alt: "Photography 4",
  },
]
