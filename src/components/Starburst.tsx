const Starburst = ({ size = 120, color = "currentColor", className = "" }: { size?: number; color?: string; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {/* 8 elongated pointed rays at 45° increments */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <path
                key={angle}
                d="M100,100 C88,88 90,45 100,5 C110,45 112,88 100,100"
                transform={`rotate(${angle} 100 100)`}
            />
        ))}
    </svg>
);

export default Starburst;