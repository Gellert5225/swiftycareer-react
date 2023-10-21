import { error } from 'console';
import { DependencyList, useEffect, useReducer, useRef } from 'react'
import { useQuery } from 'react-query';

export const useFetch = <T = unknown>(
	key: string,
	url: string,
	options?: RequestInit,
	retry?: number
) =>
	useQuery<T, Error>({queryKey: key,  queryFn: async () => {
		const res = await fetch(url, options);
		if (!res.ok) {
			throw new Error(JSON.stringify({ 
				status: res.status, 
				text: res.statusText 
			}));
		}
		return (await res.json()).info;
	}, retry: retry ?? 3 })