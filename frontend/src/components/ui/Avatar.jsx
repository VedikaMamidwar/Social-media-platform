function Avatar({ src, alt, size = "w-12 h-12" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${size} rounded-full object-cover`}
    />
  );
}

export default Avatar;