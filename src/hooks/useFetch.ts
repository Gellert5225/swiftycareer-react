import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

import { ApiResponse } from "../data/ApiResponse";

export const useFetch = (url: string): ApiResponse => {
	const [status, setStatus] = useState<Number>(0);
	const [statusText, setStatusText] = useState<String>('');
	const [data, setData] = useState<any>();
	const [error, setError] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		const getAPIData = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(
					url, 
					{
						method: 'GET',
						mode: 'cors',
						credentials: 'include',
						headers:{
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						}
					}
				);
				const json = await res.json();
				if (!res.ok) {
					const error = json || res;
					throw new Error(JSON.stringify(error));
				}
				setStatus(res.status);
				setStatusText(res.statusText);
				setData(json);
			} catch (err: any) {
				const error = JSON.parse(err.message);
				setError(error);
			}
			setIsLoading(false);
		};
		if (user) {
			getAPIData();
		}
	}, [url]);

	return { status, statusText, data, error, isLoading };
};