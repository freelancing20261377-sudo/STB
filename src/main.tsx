import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global handler to make undefined buttons "functional"
document.addEventListener("click", (e) => {
  const button = (e.target as Element).closest("button");
  if (!button) return;
  // If button is inside a form and handles submit, let it be
  if (button.type === "submit") return;

  // React attaches an internal property to DOM elements that stores its props
  const reactPropsKey = Object.keys(button).find((key) =>
    key.startsWith("__reactProps"),
  );
  if (reactPropsKey) {
    const props = (button as any)[reactPropsKey];
    // If the button has no onClick handler attached by React
    if (!props.onClick && !props.onMouseDown && !props.onPointerDown) {
      alert("Feature coming soon!");
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
