'use client'

import React from 'react'

export default function Error ({ error, reset }: { error: Error, reset: () => void }): JSX.Element {
	console.log(error)
	return (
		<div className="min-h-full flex items-center justify-center ">
			<div className="p-6 rounded-lg shadow-md">
				<p className="text-5xl font-extrabold text-transparent bg-clip-text
				bg-gradient-to-r from-primary-500 to-red-500 pb-2">
					Oops! Something went wrong.
				</p>
				<button
					className="px-4 py-2 mt-3 text-white rounded hover:bg-blue-600 transition
					bg-gradient-to-r from-primary-500 to-red-500"
					onClick={reset}
				>
					Try again
				</button>
			</div>
		</div>
	)
}
