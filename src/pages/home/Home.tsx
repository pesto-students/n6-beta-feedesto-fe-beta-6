import { Image } from '@chakra-ui/react'
import classNames from 'classnames'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import GetStarted from './components/GetStarted'

const Home = () => {
	const navLinks = ['Home', 'About', 'Contact']

	const homeRef = useRef<HTMLDivElement>(null)
	const aboutRef = useRef<HTMLDivElement>(null)
	const contactRef = useRef<HTMLDivElement>(null)

	const handleLinkClick = (link: string) => {
		switch (link) {
			case 'Home':
				homeRef.current?.scrollIntoView({ behavior: 'smooth' })
				break
			case 'About':
				aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
				break
			case 'Contact':
				contactRef.current?.scrollIntoView({ behavior: 'smooth' })
				break
			default:
				break
		}
	}

	return (
		<div>
			<main>
				<header>
					<div className="mt-8 px-12" ref={homeRef}>
						<div className="flex justify-between items-center">
							<Image
								className="h-16"
								src="/feedesto.svg"
								alt="Feedesto Logo"
							/>
							<nav className="hidden md:block">
								<ul>
									{navLinks.map((el, index) => (
										<Link
											to="/"
											className={classNames(
												'inline mx-2 p-2 hover:text-blue-800',
											)}
											onClick={() => handleLinkClick(el)}
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
				<div className="m-8 md:m-16">
					<div className="grid grid-cols-12">
						<div className="col-span-12 md:col-span-5">
							<div
								className="text-5xl md:text-7xl text-gray-800"
								data-testid="tagline"
							>
								A <b>Decisive</b> buddy for your{' '}
								<b>Business.</b>
							</div>
						</div>
						<div className="col-span-12 md:col-span-3"></div>
						<div className="col-span-12 mt-10 md:mt-0 md:col-span-4">
							<GetStarted />
						</div>
					</div>
				</div>
				<section className="my-14 container mx-auto" id="#about">
					<div className="grid grid-cols-2" ref={aboutRef}>
						<div className="col-span-2 md:col-span-1">
							<div>
								<img src="/discussion-add.gif" />
							</div>
						</div>
						<div className="col-span-2 md:col-span-1 ml-6">
							<div className="text-3xl font-bold">
								For Organizations
							</div>
							<div className="text-gray-700 w-3/4 mt-2">
								Considering the fact that there are many such
								industries (Textile, Diamond, Mining, Labour,
								etc.) in which analytical metrics may not be
								available through direct sources and that makes
								deciding of appraisals and promotions tough.
								<br />
								<br />
								The corporates who have got better thinkers in
								their management structure are performing far
								better than their competitors. <br />
								<br />
								Feedesto provides a Complete and Concrete
								solution to help executives in the decision
								making process for promotions or appraisals of
								the employees through anonymous discussions and
								feedback.
							</div>
						</div>
						<div className="col-span-2 md:col-span-1 mt-14">
							<div className="text-3xl font-bold">
								For Employees
							</div>
							<div className="text-gray-700 w-3/4 mt-2">
								Employees are the heart of any organization.
								They contribute to the basic workflow of the
								organization.
								<br />
								<br />
								In the process, they often get many
								ideas/suggestions which can eventually
								contribute to major growth for the organization.{' '}
								<br />
								<br />
								Feedesto will provide a gateway to those
								employees to{' '}
								<span className="font-semibold">
									Anonymously
								</span>{' '}
								convey their thoughts by the means of
								discussion.
							</div>
						</div>
						<div className="col-span-2 md:col-span-1 mt-14">
							<div className="px-5">
								<img src="/user-answer.gif" />
							</div>
						</div>
					</div>
				</section>
				<div ref={contactRef}>
					<footer className="bg-gray-800">
						<div className="container mx-auto py-4">
							<div className="md:text-center p-3">
								<Image
									className="h-16 md:mx-auto"
									src="/feedesto-logo-light.png"
									alt="Feedesto Logo"
								/>
							</div>
							<div className="grid grid-cols-12 justify-center items-center text-gray-100">
								<div className="col-span-12 md:col-span-3">
									<div className="md:text-center p-3">
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
								<div className="hidden md:block col-span-1">
									<div className="bg-gray-700 h-44 w-px mx-auto"></div>
								</div>
								<div className="col-span-12 md:col-span-4"></div>
								<div className="hidden md:block col-span-1">
									<div className="bg-gray-700 h-44 w-px mx-auto"></div>
								</div>
								<div className="col-span-12 md:col-span-3">
									<div className="md:text-center p-3">
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
							<div className="md:flex p-3 justify-between mt-6 mb-3">
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
