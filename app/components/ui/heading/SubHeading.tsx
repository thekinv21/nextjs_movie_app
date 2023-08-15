import { FC } from 'react'

interface ISubHeading {
	title: string
}

const SubHeading: FC<ISubHeading> = ({ title }) => {
	return <h2 className={`text-white mb-5 text-xl font-semibold`}>{title}</h2>
}

export default SubHeading
