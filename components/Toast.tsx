"use client";

export function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  const color =
    type === "error"
      ? "bg-rose-600"
      : "bg-emerald-600";
  return (
    <div
      className={`fixed top-4 right-4 z-50 cursor-pointer rounded-lg ${color} px-4 py-2 text-sm font-medium text-white shadow-lg`}
      onClick={onClose}
      role="alert"
    >
      {message}
    </div>
  );
}
