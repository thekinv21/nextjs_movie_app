/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true, // strict code , warning
	poweredByHeader: false, // herhangi bir uygulama ile yapılmış oldğunu gösterme
	optimizeFonts: false,

	//  env file : gizli bilgiler
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
	},

	// bunu neden yazdık ?

	// frontendeki herhangi bir api değil sadece backendeki api açılmasını sağlar
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:4200/api/:path*'
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:4200/uploads/:path*'
			}
		]
	}
}

module.exports = nextConfig
