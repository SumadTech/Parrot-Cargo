export type GalleryImage = {
  id: number;
  src: string;
  altKey: string;
  className: string;
};

export type GalleryColumn = GalleryImage[];

export const galleryColumns: GalleryColumn[] = [
  [
    {
      id: 1,
      src: "/images/gallery/gallery (1).png",
      altKey: "image1",
      className: "aspect-[4/5]",
    },
    {
      id: 4,
      src: "/images/gallery/gallery (4).png",
      altKey: "image4",
      className: "aspect-[4/3]",
    },
    {
      id: 7,
      src: "/images/gallery/gallery (7).png",
      altKey: "image7",
      className: "aspect-[4/3]",
    },
    {
      id: 8,
      src: "/images/gallery/gallery (8).png",
      altKey: "image8",
      className: "aspect-[4/3]",
    },
  ],
  [
    {
      id: 2,
      src: "/images/gallery/gallery (2).png",
      altKey: "image2",
      className: "aspect-[4/6]",
    },
    {
      id: 5,
      src: "/images/gallery/gallery (5).png",
      altKey: "image5",
      className: "aspect-[4/2]",
    },
    {
      id: 6,
      src: "/images/gallery/gallery (6).png",
      altKey: "image6",
      className: "aspect-[4/5]",
    },
  ],
  [
    {
      id: 3,
      src: "/images/gallery/gallery (3).png",
      altKey: "image3",
      className: "aspect-[4/4]",
    },
    {
      id: 9,
      src: "/images/gallery/gallery (9).png",
      altKey: "image9",
      className: "aspect-[4/4]",
    },
    {
      id: 10,
      src: "/images/gallery/gallery (7).png",
      altKey: "image7",
      className: "aspect-[4/6]",
    },
  ],
];