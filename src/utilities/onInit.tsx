import {useEffect, useState} from "react";

// only fires at the birth of the component,
// if you return a function within fn (input), it will invoke that after the component's destroy event
// It also returns a boolean to check if the component is initialized.
// ** NOTE: **    When using React.StrictMode this function runs twice,
//                that's because React renders components twice on this mode,
//                (only on dev but not production) in order to detect any problems and errors inside the codes
export default function useOnInit(fn: () => void | (() => void)) {
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        setInitialized(true);
        if (!initialized) {
            return fn();
        }
    }, []);
    return initialized;
}
