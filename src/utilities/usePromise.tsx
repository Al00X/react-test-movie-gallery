import { useState } from "react";
import Error from "../components/Error.component";
import Loader from "../components/Loader.component";

const DEFAULT_ERROR = <Error text="" />;

// if you pass a function as opt (second parameter), it'll act like onSuccess() callback,
// or you can pass an object for more callbacks, just like .subscribe() in RXJS
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
  const [result, setResult] = useState<R | null>(null);
  const [rawError, setRawError] = useState<any | null>(null);
  const [error, setError] = useState<JSX.Element>(DEFAULT_ERROR);
  const [loading, setLoading] = useState<boolean>(false);
  return [
    result,
    (args?: A) => {
      setRawError(null);
      setError(DEFAULT_ERROR);
      setResult(null);
      setLoading(true);

      const isOptFn = opt && typeof opt === "function";
      promiseFn(args)
        .then((result) => {
          if (isOptFn) opt(result);
          else if (opt?.onSuccess) opt.onSuccess(result);

          setResult(result);
        })
        .catch((error) => {
          if (!isOptFn && opt?.onError) opt.onError(error);
          setRawError(error);
          setError(<Error text={error} />);
        })
        .finally(() => {
          if (!isOptFn && opt?.onFinally) opt.onFinally();
          setLoading(false);
        });
    },
    {
      errorElement: error,
      error: rawError,
      loading: loading,
      loaderElement: loading ? <Loader/> : null
    },
  ] as [
    R | null,
    (args?: A) => void,
    {
      errorElement: JSX.Element | null;
      error: any | null;
      loading: boolean;
      loaderElement: JSX.Element | null
    }
  ];
}
