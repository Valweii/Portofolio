import type { ReactNode, HTMLAttributes } from 'react';

interface MyComponentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function FrostedGlass({ children , className = "", hover = true, ...props}: MyComponentProps){
    return (
        <div {...props} className={`${className} ${hover && "hover:bg-[rgba(255,255,255,0.3)]"} bg-[rgba(0,0,0,0.05)] backdrop-blur-[5px] rounded-2xl relative overflow-hidden transition-colors duration-300`}>
            {children}
        </div>
    )
}