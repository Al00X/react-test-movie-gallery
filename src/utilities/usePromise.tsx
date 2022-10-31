import { useState } from "react";
import Error from "../components/Error.component";
import Loader from "../components/Loader.component";

// R = Result, A = Args
// opt as function acts like onSuccess() callback

const DEFAULT_ERROR = <Error text="" />;

// [ result, invokePromiseFn(), additionalInfo, ]
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
