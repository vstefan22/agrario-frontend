export function LoadingSpinner() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999, // Ensures it is above other elements
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent"></div>
    </div>
  );
}
