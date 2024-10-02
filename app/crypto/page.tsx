"use client";

import { useEffect, useState } from "react";
import { Headingdesig } from "../components/ui/headheading";

export default function Crypto() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures that the component renders only on the client.
  }, []);

  // Prevent rendering on the server to avoid hydration mismatch.
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-start justify-between p-3">
      <Headingdesig title="Main Heading" subtitle="This is a subheading" />
    </div>
  );
}