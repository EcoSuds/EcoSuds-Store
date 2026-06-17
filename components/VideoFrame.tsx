export function VideoFrame({ src, poster, title }: { src: string; poster?: string; title: string }) {
  return (
    <div className="image-frame rounded-[2rem] p-2">
      <video className="aspect-video w-full rounded-[1.55rem] object-cover" controls muted playsInline preload="metadata" poster={poster} aria-label={title}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
