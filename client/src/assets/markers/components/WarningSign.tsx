import { SvgIcon } from '@mui/material';

export default function WarningSign(): JSX.Element {
  return (
    <SvgIcon
      sx={{
        height: '1.25rem',
        width: '1.25rem',
      }}
    >
      <svg
        width="100px"
        height="100px"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        className="iconify iconify--fxemoji"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          fill="#FFB636"
          d="M12.51 470.379L234.371 16.008c6.439-13.187 25.17-13.363 31.855-.299l232.51 454.371c6.064 11.849-2.542 25.92-15.853 25.92H28.512c-13.164 0-21.778-13.791-16.002-25.621z"
        ></path>
        <path
          fill="#2B3B47"
          d="M284.332 173L272.15 336.498c-.911 12.233-11.567 21.411-23.8 20.499c-11.116-.828-19.706-9.707-20.499-20.499L215.668 173c-1.413-18.961 12.813-35.478 31.774-36.89s35.478 12.813 36.89 31.774c.124 1.662.109 3.5 0 5.116zM250 391.873c-17.432 0-31.564 14.131-31.564 31.564C218.436 440.869 232.568 455 250 455s31.564-14.131 31.564-31.564c0-17.432-14.132-31.563-31.564-31.563z"
        ></path>
      </svg>
    </SvgIcon>
  );
}
