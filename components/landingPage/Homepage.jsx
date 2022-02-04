import WaveTop from "../svg/WaveTop"

import { useRouter } from "next/router"
import Header from './Header';
import Features from "./Features";
import GettingStarted from "./GettingStarted";
import Pricing from "./Pricing";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

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
