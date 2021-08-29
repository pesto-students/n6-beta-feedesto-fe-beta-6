import { useToast } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import authSlice from 'store/modules/auth/authSlice'
import env from '../configs/env'

export interface NetworkHelperRequestArguments<R> {
	url: string
	body?: R | FormData
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	publicRequest?: boolean
	params?: object
	showToast?: boolean
}

export interface NetworkHelperGetRequestArguments {
	publicRequest?: boolean
	params?: object
}

export interface NetworkHelperPostRequestArguments {
	body?: object
	publicRequest?: boolean
	showToast?: boolean
}

export interface NetworkHelperPutRequestArguments {
	body?: object
	publicRequest?: boolean
	showToast?: boolean
}

export interface NetworkHelperDeleteRequestArguments {
	publicRequest?: boolean
	showToast?: boolean
}

class NetworkHelper {
	async request<T, R>({
		url,
		body,
		method,
		params,
		showToast,
	}: NetworkHelperRequestArguments<R>): Promise<T> {
		axios.defaults.baseURL = env.BASE_URL
		try {
			const axiosResponse = await axios.request({
				url,
				method,
				params,
				data: body,
			})

			// If server sends unauthorized user then logOut
			if (axiosResponse?.status == 401) {
				// Logout from here
			}

			if (showToast) {
				toast.success('Success')
			}

			return axiosResponse?.data?.data as T
		} catch (err) {
			const axiosError = err
			const axiosResponse: AxiosResponse = err.response
			if (axiosResponse) {
				if (axiosResponse.status > 300) {
					if (
						axiosResponse.status >= 500 ||
						axiosResponse.status == 404
					) {
						toast.error('Some Error Occured', {
							icon: 'warning',
						})
					} else {
						toast.error(
							axiosResponse.data?.error?.message ??
								'Something went wrong !',
							{},
						)
					}

					return axiosResponse.data
				}
			}
			console.log(err)
			throw err
		}
	}

	public async get<T>(
		url: string,
		args?: NetworkHelperGetRequestArguments,
	): Promise<T> {
		return this.request<T, undefined>({ ...args, url, method: 'GET' })
	}

	public async post<T>(
		url: string,
		args?: NetworkHelperPostRequestArguments,
	): Promise<T> {
		return this.request<T, any>({ ...args, url, method: 'POST' })
	}

	public async put<T>(
		url: string,
		args?: NetworkHelperPutRequestArguments,
	): Promise<T> {
		return this.request<T, any>({ ...args, url, method: 'PUT' })
	}

	public async delete<T>(
		url: string,
		args?: NetworkHelperDeleteRequestArguments,
	): Promise<T> {
		return this.request<T, undefined>({ ...args, url, method: 'DELETE' })
	}
}

export const sendRequest = new NetworkHelper()
