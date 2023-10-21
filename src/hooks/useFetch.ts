import { DependencyList, useEffect, useReducer, useRef } from 'react'

interface State<T> {
	data?: T
	error?: Error
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
	| { type: 'loading' }
	| { type: 'fetched'; payload: T }
	| { type: 'error'; payload: Error }

export function useFetch<T = unknown>(
	url?: string,
	options?: RequestInit,
	deps?: DependencyList
): State<T> {
	console.log("useFetch");
	const cache = useRef<Cache<T>>({})

	// Used to prevent state update if the component is unmounted
	const cancelRequest = useRef<boolean>(false)

	const initialState: State<T> = {
		error: undefined,
		data: undefined,
	}

	// Keep state logic separated
	const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case 'loading':
				return { ...initialState }
			case 'fetched':
				return { ...initialState, data: action.payload }
			case 'error':
				return { ...initialState, error: action.payload }
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(fetchReducer, initialState)

	console.log(url)
	console.log(cache.current); 
	console.log(cache.current[url!]); 

	const fetchData = async () => {
		console.log("fetch data");
		if (!url) return;
		dispatch({ type: 'loading' })

		// If a cache exists for this url, return it
		if (cache.current[url]) {
			console.log('returning cached');
			dispatch({ type: 'fetched', payload: cache.current[url] })
			return
		}

		console.log('fetching');
		try {
			const response = await fetch(url, options)
			if (!response.ok) {
				throw new Error(JSON.stringify(
					{ 
						status: response.status, 
						text: response.statusText 
					}
				));
			}

			const data = (await response.json()).info as T
			cache.current[url] = data
			console.log("fetched success");
			if (cancelRequest.current) return

			dispatch({ type: 'fetched', payload: data })
		} catch (error) {
			console.log("fetched failed");
			if (cancelRequest.current) return
			dispatch({ type: 'error', payload: error as Error })
		}
	}

	useEffect(() => {
		// Do nothing if the url is not given

		console.log('useEffect');
		cancelRequest.current = false

		fetchData();

		// Use the cleanup function for avoiding a possibly...
		// ...state update after the component was unmounted
		return () => {
			cancelRequest.current = true
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url])

	return state
}