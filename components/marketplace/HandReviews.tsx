'use client'

import { motion } from 'framer-motion'
import type { HandReview } from '@/types/hand'
import { formatAddress, formatDate } from '@/lib/utils/formatters'

function renderRating(rating: number): string {
  const filled = Math.round(rating * 2)
  const empty = 10 - filled
  return '\u2588'.repeat(filled) + '\u2591'.repeat(empty) + ' ' + rating.toFixed(1)
}

interface HandReviewsProps {
  reviews: HandReview[]
  averageRating: number
  totalReviews: number
}

export function HandReviews({ reviews, averageRating, totalReviews }: HandReviewsProps) {
  return (
    <div>
      {/* summary */}
      <div className="border border-[var(--border)] bg-[var(--surface)] p-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="text-[var(--white)] text-[32px] font-medium tabular-nums">
            {averageRating > 0 ? averageRating.toFixed(1) : '--'}
          </div>
          <div>
            <div className="text-[var(--green)] text-[12px] font-mono">
              {renderRating(averageRating)}
            </div>
            <div className="text-[var(--muted)] text-[11px] mt-1">
              {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* review list */}
      {reviews.length === 0 ? (
        <div className="text-[var(--muted)] text-[13px] text-center py-10">
          no reviews yet.
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              className="border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[var(--green)] text-[11px] font-mono">
                  {renderRating(review.rating)}
                </span>
                <span className="text-[var(--muted)] text-[10px]">
                  {formatDate(review.created_at)}
                </span>
              </div>
              <div className="text-[var(--white)] text-[12px] leading-relaxed mb-2">
                {review.comment}
              </div>
              <div className="text-[var(--muted-2)] text-[10px]">
                {formatAddress(review.user_address)}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
