/* eslint-disable react-hooks/exhaustive-deps */
import {DependencyList, useEffect, useRef} from "react";

// Fires after the component is rendered (ignores the first render and listen to changes only)
export default function useAfterInit(fn: () => void | (() => void), deps?: DependencyList) {
    const initialized = useRef(false);
    useEffect(() => {
        if(initialized.current) {
            fn();
        } else {
            initialized.current = true;
        }
    }, deps)
}
