import env from './env.json'
export default {
	ENVIRONMENT: env.ENVIRONMENT,
	BASE_URL:
		env.ENVIRONMENT == 'production'
			? env.PRODUCTION_GATEWAY_URL
			: env.DEVELOPMENT_GATEWAY_URL,
}
