import { FC } from 'react';
import { Card } from '@/components/ui/card';

interface GlassCardProps {
  children: React.ReactNode;
}

const GlassCard: FC<GlassCardProps> = ({ children }) => {
  return (
    <Card className="rotate-y-45 rotate-x-10 relative mx-auto max-w-sm rounded-md 
      border border-transparent bg-white/90 shadow-2xl 
      backdrop-blur-xl transition-transform duration-500 ease-in-out 
      hover:scale-105 ">
      <div className="text-base">
        {children}
      </div>
    </Card>
  );
};

export default GlassCard;
