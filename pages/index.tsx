import { Image, Radio, RadioGroup } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import GetStarted, { LoginType } from '@/components/home/GetStarted'

const Home: NextPage = () => {
	const [loginType, setLoginType] = useState(LoginType.USER)

	return (
		<div>
			<Head>
				<title>Feedesto | Home</title>
			</Head>
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
							<div className="text-7xl text-gray-800">
								A <b>Decisive</b> buddy for your{' '}
								<b>Business.</b>
							</div>
						</div>
						<div className="col-span-3"></div>
						<div className="col-span-4">
							<GetStarted
								loginType={loginType}
								onChange={setLoginType}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Home
