import { Image } from '@chakra-ui/react'
import GetStarted from './components/GetStarted'

const Home = () => {
	return (
		<div>
			<main>
				<header>
					<div className="mt-8 px-12">
						<Image
							className="h-16"
							src="/feedesto.svg"
							alt="Feedesto Logo"
						/>
					</div>
				</header>
				<div className="m-16">
					<div className="grid grid-cols-12">
						<div className="col-span-5">
							<div
								className="text-7xl text-gray-800"
								data-testid="tagline"
							>
								A <b>Decisive</b> buddy for your{' '}
								<b>Business.</b>
							</div>
						</div>
						<div className="col-span-3"></div>
						<div className="col-span-4">
							<GetStarted />
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Home
