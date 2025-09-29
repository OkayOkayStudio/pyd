/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'PP Neue Montreal',
  				'ui-sans-serif',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'Helvetica Neue',
  				'Arial',
  				'Noto Sans',
  				'sans-serif'
  			],
  			montreal: [
  				'PP Neue Montreal',
  				'sans-serif'
  			]
  		},
  		fontWeight: {
  			light: '300',
  			normal: '300',
  			medium: '400',
  			semibold: '450',
  			bold: '500',
  			extrabold: '700'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			blue: {
  				'50': '#f5f6fa',
  				'100': '#eaedf4',
  				'200': '#d1d8e6',
  				'300': '#a8b6d1',
  				'400': '#798eb7',
  				'500': '#58709f',
  				'600': '#445885',
  				'700': '#38476c',
  				'800': '#323e5a',
  				'900': '#2d364d',
  				'950': '#11141d'
  			},
  			orange: {
  				'50': '#f5f5f5',
  				'100': '#efefef',
  				'200': '#dcdcdc',
  				'300': '#bdbdbd',
  				'400': '#989898',
  				'500': '#7c7c7c',
  				'600': '#656565',
  				'700': '#525252',
  				'800': '#464646',
  				'900': '#3d3d3d',
  				'950': '#292929'
  			},
  			yellow: {
  				'50': '#fafcea',
  				'100': '#F4FDDC',
  				'200': '#F4FDDC',
  				'300': '#F4FDDC',
  				'400': '#F4FDDC',
  				'500': '#F4FDDC',
  				'600': '#F4FDDC',
  				'700': '#F4FDDC',
  				'800': '#F4FDDC',
  				'900': '#F4FDDC',
  				'950': '#F4FDDC'
  			},
  			gray: {
  				'50': '#f5f5f5',
  				'100': '#efefef',
  				'200': '#dcdcdc',
  				'300': '#bdbdbd',
  				'400': '#989898',
  				'500': '#7c7c7c',
  				'600': '#656565',
  				'700': '#525252',
  				'800': '#464646',
  				'900': '#3d3d3d',
  				'950': '#292929'
  			},
  			green: {
  				'50': '#f1faeb',
  				'100': '#dff4d3',
  				'200': '#b4e59a',
  				'300': '#9bda7c',
  				'400': '#78c952',
  				'500': '#59ae34',
  				'600': '#428a26',
  				'700': '#356a21',
  				'800': '#2d551f',
  				'900': '#28491e',
  				'950': '#12270c'
  			},
  			red: {
  				'50': '#fcf4f4',
  				'100': '#fae6e6',
  				'200': '#f7d1d1',
  				'300': '#f0b1b1',
  				'400': '#e68383',
  				'500': '#d85b5b',
  				'600': '#c43e3e',
  				'700': '#a53131',
  				'800': '#882c2c',
  				'900': '#722a2a',
  				'950': '#3d1212'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

