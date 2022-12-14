import React, { useState, useEffect } from "react";
import Badge from "../components/badge";
import axios from "axios";
import { getBalance as BadgesContractservice } from "../services/BadgesContractService";
import { useProvider, useAccount } from 'wagmi'
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Grid, Navigation, Scrollbar } from "swiper";

const badgesOrder = {
	0: "The DAOist",
	1: "The Big Spender",
	2: "The Deployer",
	3: "The Jetsetter",
	4: "The Voter",
};

export const Badges = () => {

	const [badges, setBadges] = useState("");
	const provider  = useProvider();
	const account = useAccount()

	useEffect(() => {
		const getBadges = async () => {
			const badges = (
					await axios.get(process.env.REACT_APP_WALLETCONNECT_BACKEND_URL + "/ipfs/getPins")
				).data,
				userBadges = await BadgesContractservice(account.address, provider);
			setBadges({
				badges,
				userBadges,
			});
		};
		if (provider) getBadges();
	}, [provider]);

	useEffect(() => {
		console.log("Badges", badges);
	}, [badges]);


	return (
		<>
				<div className="bg-grey text-white max-w-full max-h-full rounded-2xl space-y-3 p-4">
					<div className="pb-11 pt-6">
						<h2 className="text-2xl pl-4 pb-4">Badges</h2>
                        {!badges ? (
						<div className="flex flex-col justify-center max-w-full items-center">
							<div
								disabled
								className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900  rounded-lg inline-flex items-center"
							>
								<svg
									role="status"
									className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="#1C64F2"
									/>
								</svg>
								Loading...
							</div>
							<p className="w-full text-center text-white">This may take a few seconds.</p>
						</div>
			) : (
                <>
                    <Swiper
                        slidesPerView={5}
                        grid={{
                            rows: 2,
                            fill: "row",
                        }}
                        spaceBetween={1}
                        scrollbar={{
                            hide: false,
                            draggable: true,
                        }}
                        modules={[Navigation, Grid, Scrollbar]}
                        className="mySwiper mb-4"
                    >
                    
                        {badges.badges.map((badge, index) => {
                        const { userBadges } = badges;
                        let image;
                        try {
                            if (userBadges && userBadges[index] >= 1)
                                image = "https://ipfs.io/ipfs/" + badge.image.split("ipfs://")[1];
                            else
                                image = "/BadgeBlocked.svg";
                            } catch (error) { }

                            return <>
                                <SwiperSlide>
                                    <Badge claim={userBadges} src={image}></Badge>
                                </SwiperSlide>
                            </>;
                        })}
                        </Swiper>
                    </>
			        )}
                </div>
            </div>
		</>
	);
};
