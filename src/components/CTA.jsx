function CTA({
  name = "",
  color = "",
  onClick = null,
  type = "button",
  disabled = false,
  className = "",
  variant = "filled",
  isLoading = false,
}) {
  const isOutline = variant === "outline";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-sm lg:text-[16px] cursor-pointer px-4 py-2 lg:px-6 lg:py-3 font-[body] rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
      style={{
        backgroundColor: isOutline ? "white" : `var(--${color})`,
        color: isOutline ? `var(--${color})` : "var(--white)",
        border: isOutline ? `1px solid var(--${color})` : "none",
        opacity: isLoading || disabled ? 0.5 : 1,
      }}
    >
      {isLoading ? "Loading..." : name}
    </button>
  );
}

export default CTA;
