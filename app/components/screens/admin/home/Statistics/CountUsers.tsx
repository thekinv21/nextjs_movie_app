import { FC } from 'react'

import { AdminService } from '@/services/admin.service'

import { useQuery } from 'react-query'

import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false
})

import styles from '../Admin.module.scss'

const CountUsers: FC = () => {
	// users array from backend

	const { data: users, isLoading } = useQuery('getAllUsers', () =>
		AdminService.getAllUsers()
	)

	if (isLoading) return

	const admin = users?.data.filter((item: any) => item.isAdmin === true)
	const user = users?.data.filter((item: any) => item.isAdmin === false)

	const chartData: any = {
		series: [user.length, admin.length],
		options: {
			chart: {
				type: 'donut',
				height: 460,
				fontFamily: 'Nunito, sans-serif'
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				show: true,
				width: 12,
				colors: '#191B1F'
			},
			colors: ['#e7515a', '#e2a03f', , '#e2a03f'],

			legend: {
				position: 'bottom',
				horizontalAlign: 'center',
				fontSize: '14px',
				markers: {
					width: 10,
					height: 10,
					offsetX: -2
				},
				height: 50,
				offsetY: 20
			},
			plotOptions: {
				pie: {
					donut: {
						size: '70%',
						background: 'transparent',
						labels: {
							show: true,
							name: {
								show: true,
								fontSize: '29px',
								offsetY: -10
							},
							value: {
								show: true,
								fontSize: '26px',
								color: '#bfc9d4',
								offsetY: 16,
								formatter: (val: any) => {
									return val
								}
							},
							total: {
								show: true,
								label: 'Total',
								color: '#888ea8',
								fontSize: '20px',
								formatter: (w: any) => {
									return w.globals.seriesTotals.reduce(function (
										a: any,
										b: any
									) {
										return a + b
									}, 0)
								}
							}
						}
					}
				}
			},
			labels: ['Users', 'SuperAdmin'],
			states: {
				hover: {
					filter: {
						type: 'none',
						value: 0.15
					}
				},
				active: {
					filter: {
						type: 'none',
						value: 0.15
					}
				}
			}
		}
	}

	return (
		<section className={styles.block}>
			{isLoading ? (
				<SkeletonLoader />
			) : (
				<ReactApexChart
					series={chartData.series}
					options={chartData.options}
					type='donut'
					height={460}
					width={'100%'}
				/>
			)}
		</section>
	)
}

export default CountUsers
