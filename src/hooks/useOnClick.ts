import { useEffect } from "react";

type Event = MouseEvent | TouchEvent;

interface OnClickProps<T> {
    ref: React.RefObject<T>;
    handler: (event: Event) => void;
}

export function useOnClick<T extends HTMLElement = HTMLElement>({
    ref,
    handler,
}: OnClickProps<T>) {
    useEffect(() => {
        const listener = (event: Event) => {
            const element = ref?.current;

            // blocks if there is no element or
            // if the current click is inside the current element.
            if (!element || element.contains((event?.target as Node) || null)) {
                return;
            }

            // calls the handler if the click is outside the current element.
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
