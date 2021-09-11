import env from './env.json'
export default {
	ENVIRONMENT: process.env.NODE_ENV,
	BASE_URL:
		process.env.NODE_ENV == 'production'
			? env.PRODUCTION_GATEWAY_URL
			: env.DEVELOPMENT_GATEWAY_URL,
}
