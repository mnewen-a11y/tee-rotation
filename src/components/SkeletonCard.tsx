import { motion } from 'framer-motion';

export const SkeletonCard = ({ index = 0 }: { index?: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.05 }}
    className="aspect-square rounded-ios-xl bg-white border border-midnight/8 overflow-hidden relative"
  >
    {/* Shimmer */}
    <motion.div
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-midnight/5 to-transparent"
      style={{ transform: 'skewX(-15deg)' }}
    />
    {/* Content placeholders */}
    <div className="h-full flex flex-col justify-center px-3 pt-4 pb-3 gap-2">
      <div className="w-3 h-3 rounded-full bg-midnight/10" />
      <div className="h-3 bg-midnight/8 rounded-md w-4/5" />
      <div className="h-2.5 bg-midnight/6 rounded-md w-3/5" />
      <div className="flex gap-2 mt-auto">
        <div className="h-5 w-12 bg-midnight/8 rounded-md" />
        <div className="h-5 w-8 bg-midnight/6 rounded-md" />
        <div className="flex-1 h-1.5 bg-midnight/6 rounded-full self-center" />
      </div>
    </div>
  </motion.div>
);

export const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} index={i} />
    ))}
  </div>
);
