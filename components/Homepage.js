import WaveTop from "./svg/WaveTop"

import { useRouter } from "next/router"
import Header from './landingPage/Header';
import Features from "./landingPage/Features";
import GettingStarted from "./landingPage/GettingStarted";
import Pricing from "./landingPage/Pricing";
import CallToAction from "./landingPage/CallToAction";
import Footer from "./landingPage/Footer";

function Homepage() {
	const router = useRouter()

	return (
		<div>
			<Header embedId='zZF6vXMGBOw' />
			{/* <Features />
			<GettingStarted />
			<Pricing /> */}
			<CallToAction />
			<Footer />
		</div>
	)
}

export default Homepage
