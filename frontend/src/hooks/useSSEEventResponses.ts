import { useEffect, useRef } from "react";

export const useSSEEventResponses = (callback: (data: string) => void) => {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!eventSourceRef.current) {
      console.log("Opening SSE connection");
      eventSourceRef.current = new EventSource(
        "http://localhost:3000/events/responses"
      );

      eventSourceRef.current.onmessage = (event) => {
        callback(event.data);
      };

      eventSourceRef.current.onerror = () => {
        eventSourceRef.current?.close();
        eventSourceRef.current = null;
      };
    }

    return () => {
      if (eventSourceRef.current) {
        console.log("Closing SSE connection");
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [callback]);
};
