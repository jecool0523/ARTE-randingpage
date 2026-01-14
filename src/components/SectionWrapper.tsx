import { memo, ReactNode } from 'react';
import { SectionDivider } from './SectionDivider';

export interface DividerConfig {
  type?: 'line' | 'gradient' | 'fade';
  fromColor?: string;
  toColor?: string;
  showLine?: boolean;
}

interface SectionWrapperProps {
  children: ReactNode;
  /** Divider configuration to show BEFORE the section */
  dividerBefore?: DividerConfig;
  /** Divider configuration to show AFTER the section */
  dividerAfter?: DividerConfig;
}

/**
 * SectionWrapper - Encapsulates the Divider + Section pattern
 * 
 * Usage:
 * <SectionWrapper dividerBefore={{ type: 'line' }}>
 *   <MySection />
 * </SectionWrapper>
 */
export const SectionWrapper = memo(function SectionWrapper({
  children,
  dividerBefore,
  dividerAfter,
}: SectionWrapperProps) {
  return (
    <>
      {dividerBefore && <SectionDivider {...dividerBefore} />}
      {children}
      {dividerAfter && <SectionDivider {...dividerAfter} />}
    </>
  );
});

// Pre-configured divider types for convenience
export const DIVIDERS = {
  line: { type: 'line' as const },
  gradientToDark: (toColor: string) => ({
    type: 'gradient' as const,
    fromColor: 'transparent',
    toColor,
  }),
  gradientFromDark: (fromColor: string) => ({
    type: 'gradient' as const,
    fromColor,
    toColor: 'transparent',
  }),
  transparent: {
    type: 'gradient' as const,
    fromColor: 'transparent',
    toColor: 'transparent',
  },
} as const;
