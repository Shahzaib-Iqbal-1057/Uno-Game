import "./styles/index.css";
import "./styles/uno-cards.css";
import "./styles/uno.css"
import { Poppins } from 'next/font/google'
import { Metadata } from "next";
import 'tailwindcss/tailwind.css'


const poppins = Poppins({
  weight : ['400','700'],
  subsets : ["latin"]
})


export const metadata : Metadata =  {
  title: 'UNO',
  description: 'Uno game to play',
  icons : {
    icon : "/uno.png"
  }
}



export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}> 
            {children}
      </body>
    </html>
  )
}
