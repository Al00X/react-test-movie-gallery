import {useEffect, useMemo, useReducer, useRef} from "react";
import Error from "../components/Error.component";
import Loader from "../components/Loader.component";

enum ActionStates {
  LOADING,
  COMPLETED,
  FAILED,
  RESET,
}

// if you pass a function as opt (second parameter), it'll act like onSuccess() callback,
// or you can pass an object for more callbacks, just like .subscribe() in RXJS.
// Supports Axios error message response
//
// generic R = Result, A = Args
//
// return => Array [ result, invokePromiseFn(), additionalInfo ]
export default function usePromise<R, A>(
  promiseFn: (args?: A) => Promise<R>,
  opt?:
    | {
        onSuccess?: (result: R) => void;
        onError?: (error: any) => void;
        onFinally?: () => void;
      }
    | ((result: R) => void)
) {
  const promiseFnRef = useRef<typeof promiseFn>(promiseFn);
  const optRef = useRef<typeof opt>(opt);


  const [state, disptachState] = useReducer(
    (
      prevState: {
        result: R | undefined;
        erro?: any | undefined;
        loading: boolean;
      },
      action: {
        payload?: R | any;
        type: ActionStates;
      }
    ) => {
      switch (action.type) {
        case ActionStates.COMPLETED:
          return {
            result: action.payload,
            error: undefined,
            loading: false,
          };
        case ActionStates.LOADING:
          return {
            result: undefined,
            error: undefined,
            loading: true,
          };
        case ActionStates.FAILED:
          return {
            result: undefined,
            error: action.payload,
            loading: false,
          };
        case ActionStates.RESET:
        default:
          return {
            result: undefined,
            error: undefined,
            loading: false,
          };
      }
    },
    {
      result: undefined,
      error: undefined,
      loading: false,
    }
  );

  useEffect(() => {
    if (promiseFn !== promiseFnRef.current) {
      promiseFnRef.current = promiseFn;
    }
    if (opt !== optRef.current) {
      optRef.current = opt;
    }
    }, [promiseFn, opt])

  console.log("Rendered Again");

  return useMemo<
    [
      R | null,
      (args?: A) => void,
      {
        errorElement: JSX.Element | null;
        error: any | null;
        loading: boolean;
        loaderElement: JSX.Element | null;
        stateElement: JSX.Element | null;
      }
    ]
      // Need to be tested, using UseMemo nested like useMemo([ useMemo(), useMemo(), useMemo() ]) or [ useMemo() ... ] ??
      // which is better?
  >(() => {
    console.log("Mama");
    const errorElement = state.error ? (
      <Error text={state.error?.message ?? state.error} />
    ) : null;
    const loaderElement = state.loading ? <Loader /> : null;
    const currentPromiseFn = promiseFnRef.current!;
    console.log(currentPromiseFn);
    const currentOpt = optRef.current;
    return [
      state.result,
      (args?: A) => {
        disptachState({ type: ActionStates.LOADING });

        const isOptFn = currentOpt && typeof currentOpt === "function";
        currentPromiseFn(args)
          .then((result) => {
            if (isOptFn) currentOpt(result);
            else if (currentOpt?.onSuccess) currentOpt.onSuccess(result);

            disptachState({ type: ActionStates.COMPLETED, payload: result });
          })
          .catch((error) => {
            if (!isOptFn && currentOpt?.onError) currentOpt.onError(error);

            disptachState({ type: ActionStates.FAILED, payload: error });
          })
          .finally(() => {
            if (!isOptFn && currentOpt?.onFinally) currentOpt.onFinally();
          });
      },
      {
        errorElement: errorElement,
        error: state.error,
        loading: state.loading,
        loaderElement: loaderElement,
        stateElement: loaderElement ?? errorElement ?? null,
      },
    ];
  }, [promiseFnRef, optRef, state]);
}
