export default function ScreenHeader({ title, subtitle, className }) {
  return (
    <>
      <h1
        className={`text-[32px] sm:text-[40px] font-black text-center mb-3 ${className}`}
        style={{ fontFamily: "title" }}
      >
        {title}
      </h1>
      <p
        className={`text-center text-[16px] sm:text-[20px] text-gray-600 mb-8 ${className}`}
        style={{ fontFamily: "body" }}
      >
        {subtitle}
      </p>
    </>
  );
}
