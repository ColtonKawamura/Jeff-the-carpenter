"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=3")) {
      toast("Welcome to Jeff's Carpentry", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=3; max-age=31536000; path=/";
        },
        description: (
           <>
            Custom furniture, built to order in a garage.{" "}
            <a
             href="/order"
             className="text-blue-600 hover:underline"
            >
              Request a build
            </a>
            .
           </>
        ),
      });
    }
  }, []);

  return null;
}
