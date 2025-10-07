type RibbonColor = 'green' | 'blue';

export default function RibbonBadge({
  text,
  color,
}: {
  text: string;
  color: RibbonColor;
}) {
  const colors: Record<
    RibbonColor,
    {
      primary: string;
      secondary: string;
      dark: string;
      light: string;
    }
  > = {
    green: {
      primary: '#10b981',
      secondary: '#059669',
      dark: '#047857',
      light: '#34d399',
    },
    blue: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      dark: '#1d4ed8',
      light: '#60a5fa',
    },
  };

  const theme = colors[color];

  return (
    <div className='relative inline-block'>
      <svg
        width='120'
        height='120'
        viewBox='0 0 120 120'
        xmlns='http://www.w3.org/2000/svg'
      >
        {/* Flower petals (8 petals in a circle) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 60 + Math.cos(rad) * 20;
          const y = 50 + Math.sin(rad) * 20;

          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx='15'
              ry='25'
              fill={i % 2 === 0 ? theme.primary : theme.light}
              stroke={theme.dark}
              strokeWidth='1'
              transform={`rotate(${angle} ${x} ${y})`}
            />
          );
        })}

        {/* Center circle */}
        <circle
          cx='60'
          cy='50'
          r='28'
          fill='white'
          stroke={theme.dark}
          strokeWidth='2'
        />

        {/* Inner decorative circle */}
        <circle
          cx='60'
          cy='50'
          r='24'
          fill='none'
          stroke={theme.primary}
          strokeWidth='1.5'
          strokeDasharray='2,2'
        />

        {/* Text */}
        <text
          x='60'
          y='50'
          textAnchor='middle'
          dominantBaseline='central'
          fontSize='18'
          fontWeight='bold'
          fill={theme.dark}
          fontFamily='Arial, sans-serif'
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
