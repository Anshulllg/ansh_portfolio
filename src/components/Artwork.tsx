import BlurFade from "@/components/ui/blur-fade";

const images = Array.from({ length: 9 }, (_, i) => {
  return `/art/artwork-${i + 1}.jpg`; 
});

export function Artwork() {
  return (
    <section id="photos">
      <div className="max-w-7xl mx-auto columns-2 gap-4 sm:columns-3">
        {images.map((imageUrl, idx) => (
          <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
            <img
              className="mb-4 w-full h-auto max-h-96 rounded-lg object-cover" 
              src={imageUrl}
              alt={`Artwork image ${idx + 1}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
