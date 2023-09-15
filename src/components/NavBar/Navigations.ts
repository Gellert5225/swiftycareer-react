import homeLogo from '../../images/home.png'
import homeLogoSelected from '../../images/home-selected.png'

import jobLogo from '../../images/job.png'
import jobLogoSelected from '../../images/job-selected.png'

import friendLogo from '../../images/friend.png'
import friendLogoSelected from '../../images/friend-selected.png'

import alertLogo from '../../images/alert.png'
import alertLogoSelected from '../../images/alert-selected.png'

import profile from '../../images/default_profile_image.png'

const navigation = [
	{
		name: 'Home', 
		href: '/feed', 
		current: true, 
		logo: homeLogo,
		logoSelected: homeLogoSelected
	},
	{
		name: 'Jobs', 
		href: '/job', 
		current: false, 
		logo: jobLogo,
		logoSelected: jobLogoSelected
	},
	{
		name: 'Connections', 
		href: '/connection', 
		current: false, 
		logo: friendLogo,
		logoSelected: friendLogoSelected
	},
	{
		name: 'Notifications', 
		href: '/notification', 
		current: false,
		logo: alertLogo,
		logoSelected: alertLogoSelected
	},
	{
		name: 'Profile', 
		href: '#', 
		current: false,
		logo: profile,
		logoSelected: profile
	}
]

export default navigation;