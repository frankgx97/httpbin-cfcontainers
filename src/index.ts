import { Container, loadBalance } from '@cloudflare/containers';

export class httpbin_cfContainer extends Container {
    // Make sure the port here matches the port exposed by the container.
	defaultPort = 80;
    // Container will "sleep" after this time.
	sleepAfter = '5m';

	override onStart() {
		console.log('Container successfully started');
	}
	override onStop() {
		console.log('Container successfully shut down');
	}
	override onError(error: unknown) {
		console.log('Container error:', error);
	}
}

export default {
	async fetch(request: Request, env): Promise<Response> {
		let container = await loadBalance(env.httpbin_cf_CONTAINER, 1);
		return await container.fetch(request);
	},
} satisfies ExportedHandler<Env>;