import { Image } from '@chakra-ui/react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import GetStarted from './components/GetStarted'

const Home = () => {
	const navLinks = ['Home', 'About', 'Contact']

	return (
		<div>
			<main>
				<header>
					<div className="mt-8 px-12">
						<div className="flex justify-between">
							<Image
								className="h-16"
								src="/feedesto.svg"
								alt="Feedesto Logo"
							/>
							<nav>
								<ul>
									{navLinks.map((el, index) => (
										<Link
											to={`#${el}`}
											className={classNames(
												'inline mx-2 p-2',
											)}
											key={index}
										>
											{el}
										</Link>
									))}
								</ul>
							</nav>
						</div>
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
				<div>
					<footer className="bg-gray-800">
						<div className="container mx-auto py-4">
							<div className="text-center py-3">
								<Image
									className="h-16 mx-auto"
									src="/feedesto-logo-light.png"
									alt="Feedesto Logo"
								/>
							</div>
							<div className="grid grid-cols-12 justify-center items-center text-gray-100">
								<div className="col-span-3">
									<div className="text-center">
										<div className="text-lg font-semibold">
											Contact
										</div>
										<div className="mt-2 text-sm text-gray-200">
											<div>
												<a href="tel:+917016030641">
													+91 70160 30641
												</a>
											</div>
											<div className="mt-1">
												<a href="mailto:feedestoofficial@gmail.com">
													feedestoofficial@gmail.com
												</a>
											</div>
											<div className="mt-4">
												442, Royal Imperial, West
												Street,
												<br /> Gandhinagar, INDIA -
												392001
											</div>
										</div>
									</div>
								</div>
								<div className="col-span-1">
									<div className="bg-gray-700 h-44 w-px mx-auto"></div>
								</div>
								<div className="col-span-4"></div>
								<div className="col-span-1">
									<div className="bg-gray-700 h-44 w-px mx-auto"></div>
								</div>
								<div className="col-span-3">
									<div className="text-center">
										<div className="text-lg font-semibold">
											Information
										</div>
										<div className="mt-2 text-sm text-gray-200">
											<div>
												<a href="#.">Contact us</a>
											</div>
											<div className="mt-1">
												<a href="#.">Feedback</a>
											</div>
											<div className="mt-1">
												<a href="#.">
													Terms of Service
												</a>
											</div>
											<div className="mt-1">
												<a href="#.">Privacy Policy</a>
											</div>
											<div className="mt-1">
												<a href="#.">Atrributions</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex justify-between mt-6 mb-4">
								<div className="text-xs text-gray-400">
									&copy; Feedesto. All Rights Reserved
								</div>
								<div className="text-xs text-gray-400">
									Designed and Developed with ❤️ by Team Beta
									at{' '}
									<a
										href="https://pesto.tech"
										target="_blank"
										rel="noreferrer"
									>
										Pesto
									</a>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</main>
		</div>
	)
}

export default Home
