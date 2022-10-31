import {useEffect, useState} from "react";

export default function useOnInit(fn: () => any) {
    const [initialized, setInitialized] = useState(false);
    useEffect(() => {
        setInitialized(true);
        if (!initialized) {
            return fn();
        }
    }, []);
    return initialized;
}
