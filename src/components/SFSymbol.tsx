/**
 * SF Symbol Component
 * Uses SF Symbols on iOS/macOS, falls back to Lucide icons elsewhere
 */

import * as LucideIcons from 'lucide-react';

interface SFSymbolProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: keyof typeof LucideIcons;
}

// SF Symbol to Lucide Icon mapping
const SF_TO_LUCIDE: Record<string, keyof typeof LucideIcons> = {
  'cup.and.saucer.fill': 'Coffee',
  'leaf.fill': 'Leaf',
  'thermometer': 'Thermometer',
  'drop.fill': 'Droplet',
  'calendar': 'Calendar',
  'clock.fill': 'Clock',
  'star.fill': 'Star',
  'heart.fill': 'Heart',
  'trash.fill': 'Trash2',
  'pencil': 'Edit3',
  'plus.circle.fill': 'PlusCircle',
  'checkmark.circle.fill': 'CheckCircle',
  'xmark.circle.fill': 'XCircle',
  'arrow.clockwise': 'RefreshCw',
  'info.circle.fill': 'Info',
  'chart.bar.fill': 'BarChart3',
  'sparkles': 'Sparkles',
  'house.fill': 'Home',
  'list.bullet': 'List',
  'square.grid.2x2.fill': 'LayoutGrid',
};

export const SFSymbol = ({ name, size = 24, className = '', fallback }: SFSymbolProps) => {
  const isApple = /iPhone|iPad|iPod|Mac/.test(navigator.userAgent);
  
  // On Apple devices, use SF Symbols via CSS
  if (isApple) {
    return (
      <span
        className={`sf-symbol ${className}`}
        style={{
          fontFamily: '-apple-system',
          fontSize: `${size}px`,
          lineHeight: 1,
          display: 'inline-block',
          width: `${size}px`,
          height: `${size}px`,
          textAlign: 'center',
        }}
        aria-hidden="true"
      >
        {/* SF Symbol name - rendered by iOS */}
        <span style={{ fontSize: `${size * 0.9}px` }}>􀋃</span>
      </span>
    );
  }
  
  // Fallback to Lucide icon
  const lucideIconName = fallback || SF_TO_LUCIDE[name] || 'Circle';
  const LucideIcon = LucideIcons[lucideIconName] as any;
  
  if (!LucideIcon) {
    console.warn(`No Lucide fallback found for SF Symbol: ${name}`);
    return null;
  }
  
  return <LucideIcon size={size} className={className} />;
};
