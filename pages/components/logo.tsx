import React from "react"

export default function Logo({ ...rest }) {
  return (
    <svg
      viewBox="-20 18 90 80"
      width={"60px"}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g transform="rotate(-53 60 50) translate(10) scale(.6) translate(-18 -23)">
        <path
          d="M50 50 h20 l5 -15 l10 30 l-20 0 l5 15 h-20 l-5 15 l-10 -30 l20 0 Z"
          fill="current"
        />
      </g>
      <text
        y="80"
        fill="current"
        font-size="60"
        font-weight="bold"
        font-family="Arial, sans-serif"
        letterSpacing={-5}
      >
        LI
      </text>
    </svg>
  )
}
