import { sendRequest } from './networkService'

export function copyObject(val: object) {
	return JSON.parse(JSON.stringify(val))
}

// Form Handeling
export class Form<T> {
	private default: T
	fields: T
	submitting: boolean
	isFormData: boolean
	constructor(data: T) {
		this.default = data
		this.fields = Object.assign({}, data)
		this.submitting = false
		this.isFormData = false
	}
	reset() {
		this.fields = copyObject(this.default as unknown as object)
	}

	private getData() {
		let formData = new FormData()
		for (let [key, value] of Object.entries(this.fields)) {
			formData.append(key, value)
		}
		return formData
	}

	async submit(
		url: string,
		options?: { method?: 'POST' | 'PUT' | 'DELETE'; showToast?: boolean },
	) {
		let method: 'POST' | 'PUT' | 'DELETE' = 'POST'
		let showToast = true

		if (options?.method) {
			method = options.method
		}

		if (options?.showToast) {
			showToast = options.showToast
		}

		if (this.submitting) return
		try {
			this.submitting = true
			const res = await sendRequest.request<any, T>({
				url,
				body:
					method != 'DELETE'
						? this.isFormData
							? this.getData()
							: this.fields
						: undefined,
				method,
				showToast,
			})
			this.reset()
			return res
		} catch (err) {
			console.log(err)
			throw err
		} finally {
			this.submitting = false
		}
	}
}
