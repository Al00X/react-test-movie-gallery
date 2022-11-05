/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef} from "react";

// only fires at the birth of the component,
// if you return a function within fn (input), it will invoke that after the component's destroy event.
//
// ** NOTE: **    When using React.StrictMode this function runs twice,
//                that's because React renders components twice on this mode,
//                (only on dev but not production) in order to detect any problems and errors inside the codes.
export default function useOnInit(fn: () => void | (() => void)) {
    const initialized = useRef(false);
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            return fn();
        }
    }, []);
}
