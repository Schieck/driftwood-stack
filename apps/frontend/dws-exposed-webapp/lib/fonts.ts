import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Libre_Baskerville as FontTitle,
} from "next/font/google"

export const fontSans = FontSans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontTitle = FontTitle({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-title",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
