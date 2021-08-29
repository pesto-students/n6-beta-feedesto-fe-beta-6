import React from 'react'
import { useDispatch } from 'react-redux'
import { logOutUser } from 'store/modules/auth/authSlice'

const AppPage = () => {
	const dispatch = useDispatch()

	return (
		<>
			<div>User App Home</div>
			<div onClick={() => dispatch(logOutUser())}>Logout</div>
		</>
	)
}

export default AppPage
